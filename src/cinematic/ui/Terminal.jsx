import React from "react";

export function TerminalLine({ children, dim = false }) {
  return (
    <div className={`termLine ${dim ? "termLine--dim" : ""}`} data-term-line>
      {children}
    </div>
  );
}

export function TerminalRule() {
  return <div className="termRule" data-term-line />;
}

export default function Terminal({
  cmd,
  cwd = "~/portfolio",
  user = "dave",
  host = "localhost",
  children,
}) {
  return (
    <div className="term">
      <div className="termPrompt" data-term-line>
        <span className="termUser">
          {user}@{host}
        </span>
        <span className="termPath">:{cwd}</span>$ <span className="termCmd">{cmd}</span>
      </div>
      <div className="termOut">{children}</div>
    </div>
  );
}

