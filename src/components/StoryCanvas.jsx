import React, { useEffect, useRef, useState } from "react";

const createShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
};

const createProgram = (gl, vsSource, fsSource) => {
  const program = gl.createProgram();
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vertexShader || !fragmentShader) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
};

const buildSphereGeometry = (radius = 0.9, widthSegments = 48, heightSegments = 32) => {
  const positions = [];
  const normals = [];
  const indices = [];

  for (let y = 0; y <= heightSegments; y += 1) {
    const v = y / heightSegments;
    const theta = v * Math.PI;

    for (let x = 0; x <= widthSegments; x += 1) {
      const u = x / widthSegments;
      const phi = u * Math.PI * 2;
      const sinTheta = Math.sin(theta);

      const px = -radius * Math.cos(phi) * sinTheta;
      const py = radius * Math.cos(theta);
      const pz = radius * Math.sin(phi) * sinTheta;

      positions.push(px, py, pz);
      const normalLength = Math.hypot(px, py, pz) || 1;
      normals.push(px / normalLength, py / normalLength, pz / normalLength);
    }
  }

  for (let y = 0; y < heightSegments; y += 1) {
    for (let x = 0; x < widthSegments; x += 1) {
      const a = x + (widthSegments + 1) * y;
      const b = x + (widthSegments + 1) * (y + 1);
      const c = x + 1 + (widthSegments + 1) * (y + 1);
      const d = x + 1 + (widthSegments + 1) * y;
      indices.push(a, b, d, b, c, d);
    }
  }

  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    indices: new Uint16Array(indices),
  };
};

const perspective = (fov, aspect, near, far) => {
  const f = 1.0 / Math.tan((fov * Math.PI) / 360);
  const nf = 1 / (near - far);
  const out = new Float32Array(16);
  out[0] = f / aspect;
  out[5] = f;
  out[10] = (far + near) * nf;
  out[11] = -1;
  out[14] = 2 * far * near * nf;
  return out;
};

const lookAt = (eye, target, up) => {
  const z0 = eye[0] - target[0];
  const z1 = eye[1] - target[1];
  const z2 = eye[2] - target[2];
  let len = Math.hypot(z0, z1, z2) || 1;
  const zx = z0 / len;
  const zy = z1 / len;
  const zz = z2 / len;

  const x0 = up[1] * zz - up[2] * zy;
  const x1 = up[2] * zx - up[0] * zz;
  const x2 = up[0] * zy - up[1] * zx;
  len = Math.hypot(x0, x1, x2) || 1;
  const xx = x0 / len;
  const xy = x1 / len;
  const xz = x2 / len;

  const y0 = zy * xz - zz * xy;
  const y1 = zz * xx - zx * xz;
  const y2 = zx * xy - zy * xx;

  const out = new Float32Array(16);
  out[0] = xx;
  out[1] = y0;
  out[2] = zx;
  out[3] = 0;
  out[4] = xy;
  out[5] = y1;
  out[6] = zy;
  out[7] = 0;
  out[8] = xz;
  out[9] = y2;
  out[10] = zz;
  out[11] = 0;
  out[12] = -(xx * eye[0] + xy * eye[1] + xz * eye[2]);
  out[13] = -(y0 * eye[0] + y1 * eye[1] + y2 * eye[2]);
  out[14] = -(zx * eye[0] + zy * eye[1] + zz * eye[2]);
  out[15] = 1;
  return out;
};

const inverseTranspose3x3 = (m) => {
  const a00 = m[0],
    a01 = m[1],
    a02 = m[2];
  const a10 = m[4],
    a11 = m[5],
    a12 = m[6];
  const a20 = m[8],
    a21 = m[9],
    a22 = m[10];

  const b01 = a22 * a11 - a12 * a21;
  const b11 = -a22 * a10 + a12 * a20;
  const b21 = a21 * a10 - a11 * a20;

  let det = a00 * b01 + a01 * b11 + a02 * b21;
  det = det ? 1.0 / det : 1.0;

  return new Float32Array([
    b01 * det,
    (-a22 * a01 + a02 * a21) * det,
    (a12 * a01 - a02 * a11) * det,
    b11 * det,
    (a22 * a00 - a02 * a20) * det,
    (-a12 * a00 + a02 * a10) * det,
    b21 * det,
    (-a21 * a00 + a01 * a20) * det,
    (a11 * a00 - a01 * a10) * det,
  ]);
};

const hueToRgb = (h) => {
  const f = (n) => {
    const k = (n + h * 6) % 6;
    return 0.5 + 0.35 * Math.max(Math.min(Math.min(k, 4 - k), 1), -1);
  };
  return [f(0), f(2), f(4)];
};

export default function StoryCanvas({ narrativeState, activeChapter }) {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const activeRef = useRef(activeChapter);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    activeRef.current = activeChapter;
  }, [activeChapter]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return () => {};

    const gl = canvas.getContext("webgl", { antialias: true, alpha: true });
    if (!gl) {
      setIsSupported(false);
      return () => {};
    }

    setIsSupported(true);

    const geometry = buildSphereGeometry();

    const vertexSource = `
      precision highp float;
      attribute vec3 position;
      attribute vec3 normal;

      uniform mat4 uProjection;
      uniform mat4 uView;
      uniform mat3 uNormalMatrix;
      uniform float uTime;
      uniform float uPulse;
      uniform float uTwist;
      uniform float uLift;

      varying vec3 vNormal;
      varying float vFresnel;

      void main() {
        float radial = length(position);
        float wave = sin(radial * 8.0 + uTime * 1.8) * uPulse * 0.45;
        float twist = uTwist * position.y;
        vec3 twisted = vec3(
          position.x * cos(twist) - position.z * sin(twist),
          position.y,
          position.x * sin(twist) + position.z * cos(twist)
        );
        vec3 displaced = twisted * (1.0 + wave);
        vec4 worldPosition = vec4(displaced + vec3(0.0, uLift, 0.0), 1.0);
        vNormal = normalize(uNormalMatrix * displaced);
        vec3 viewDir = normalize(worldPosition.xyz);
        vFresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 2.5);
        gl_Position = uProjection * uView * worldPosition;
      }
    `;

    const fragmentSource = `
      precision highp float;
      varying vec3 vNormal;
      varying float vFresnel;

      uniform float uTime;
      uniform vec3 uBaseColor;

      void main() {
        vec3 lightDir = normalize(vec3(-0.4, 0.7, 0.6));
        float diff = clamp(dot(normalize(vNormal), lightDir) * 0.55 + 0.45, 0.15, 1.0);
        float glow = vFresnel * 0.8;
        vec3 color = mix(uBaseColor * 0.6, uBaseColor * 1.4, diff) + glow * vec3(0.4, 0.8, 1.0);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const program = createProgram(gl, vertexSource, fragmentSource);
    if (!program) return () => {};

    const positionLoc = gl.getAttribLocation(program, "position");
    const normalLoc = gl.getAttribLocation(program, "normal");

    const projectionLoc = gl.getUniformLocation(program, "uProjection");
    const viewLoc = gl.getUniformLocation(program, "uView");
    const normalMatrixLoc = gl.getUniformLocation(program, "uNormalMatrix");
    const timeLoc = gl.getUniformLocation(program, "uTime");
    const pulseLoc = gl.getUniformLocation(program, "uPulse");
    const twistLoc = gl.getUniformLocation(program, "uTwist");
    const liftLoc = gl.getUniformLocation(program, "uLift");
    const baseColorLoc = gl.getUniformLocation(program, "uBaseColor");

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, geometry.positions, gl.STATIC_DRAW);

    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, geometry.normals, gl.STATIC_DRAW);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometry.indices, gl.STATIC_DRAW);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.clearColor(0, 0, 0, 0);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduceMotion = mediaQuery?.matches;

    let frameId;
    let last = performance.now();
    let elapsed = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      if (clientWidth !== width || clientHeight !== height) {
        width = clientWidth;
        height = clientHeight;
        canvas.width = Math.max(1, clientWidth * window.devicePixelRatio);
        canvas.height = Math.max(1, clientHeight * window.devicePixelRatio);
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    const render = () => {
      resize();
      if (!reduceMotion) {
        frameId = requestAnimationFrame(render);
      }

      const now = performance.now();
      const delta = (now - last) / 1000;
      last = now;
      elapsed += delta;

      const state = narrativeState.current;
      const orbit = state.orbit;
      const lift = state.lift;
      const twist = state.twist;
      const pulse = state.pulse;
      const hue = (state.hue + activeRef.current * 0.05) % 1;

      const radius = 2.75;
      const camX = Math.cos(orbit) * radius + state.parallaxX * 0.6;
      const camZ = Math.sin(orbit) * radius + state.parallaxY * 0.4;
      const camY = 1.1 + lift * 0.9;

      const view = lookAt([camX, camY, camZ], [0, 0.2, 0], [0, 1, 0]);
      const projection = perspective(46, width / Math.max(height, 1), 0.1, 18);
      const normalMatrix = inverseTranspose3x3(view);
      const baseColor = hueToRgb(0.56 + hue * 0.4);

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.useProgram(program);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
      gl.enableVertexAttribArray(normalLoc);
      gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

      gl.uniformMatrix4fv(projectionLoc, false, projection);
      gl.uniformMatrix4fv(viewLoc, false, view);
      gl.uniformMatrix3fv(normalMatrixLoc, false, normalMatrix);
      gl.uniform1f(timeLoc, elapsed);
      gl.uniform1f(pulseLoc, pulse);
      gl.uniform1f(twistLoc, twist);
      gl.uniform1f(liftLoc, lift);
      gl.uniform3fv(baseColorLoc, baseColor);

      gl.drawElements(gl.TRIANGLES, geometry.indices.length, gl.UNSIGNED_SHORT, 0);
    };

    render();

    const handleReduceMotionChange = (event) => {
      if (event.matches && frameId) {
        cancelAnimationFrame(frameId);
        frameId = null;
      } else if (!event.matches && !frameId) {
        last = performance.now();
        render();
      }
    };

    mediaQuery?.addEventListener("change", handleReduceMotionChange);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      mediaQuery?.removeEventListener("change", handleReduceMotionChange);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [narrativeState]);

  return (
    <div className="relative h-full">
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.07),transparent_35%),linear-gradient(180deg,rgba(12,18,28,0.7)_0%,rgba(12,18,28,0.95)_100%)] mix-blend-screen" />
      {!isSupported && (
        <div
          ref={overlayRef}
          className="absolute inset-0 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm text-center px-6 text-sm text-cyan-100/80"
        >
          WebGL isn’t available here. You’re viewing a static fallback; try a modern browser or enable hardware acceleration to see the animated sculpture.
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-6 bottom-6 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-cyan-100/70">
        <span>Scroll to choreograph</span>
        <span>Mouse moves the light</span>
      </div>
    </div>
  );
}
