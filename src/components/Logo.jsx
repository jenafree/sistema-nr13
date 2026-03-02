import React from "react";

/**
 * Logo Souza & Aquino em SVG inline — não depende de arquivo externo, nunca quebra.
 */
export default function Logo({ className = "logo-image" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 250 140"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Souza e Aquino Logo"
    >
      <rect x="25" y="10" width="200" height="120" rx="25" fill="#1e3a8a" />
      <text
        x="125"
        y="60"
        fontFamily="Arial, sans-serif"
        fontSize="22"
        fontWeight="bold"
        fill="#ffffff"
        textAnchor="middle"
      >
        SOUZA
        <tspan fill="#93c5fd" fontSize="24">&amp;</tspan>
        AQUINO
      </text>
      <text
        x="125"
        y="90"
        fontFamily="Arial, sans-serif"
        fontSize="11"
        fill="#ffffff"
        textAnchor="middle"
        fontWeight="500"
      >
        MAESTRIA EM ENGENHARIA MECÂNICA
      </text>
    </svg>
  );
}
