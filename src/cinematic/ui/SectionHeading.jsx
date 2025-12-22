import React from "react";

export default function SectionHeading({ children, right }) {
  return (
    <div className="cineHeading">
      <div className="cineHeadingLeft">{children}</div>
      {right ? <div className="cineHeadingRight">{right}</div> : null}
    </div>
  );
}

