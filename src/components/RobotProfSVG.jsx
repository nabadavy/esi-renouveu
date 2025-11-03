// src/components/RobotProfSVG.jsx
export function RobotProfSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 700"
      role="img"
      aria-labelledby="title desc"
      className="w-full h-full"
    >
      <title id="title">Robot enseignant devant un tableau</title>
      <desc id="desc">
        Un robot professeur pointe un tableau. Des lignes et équations
        apparaissent avec un effet d'écriture à la craie.
      </desc>

      <defs>
        <radialGradient id="spot" cx="30%" cy="35%" r="65%">
          <stop offset="0" stopColor="#1f2f5a" stopOpacity="0.8" />
          <stop offset="1" stopColor="#0f1b38" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="botMetal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7991afff" />
          <stop offset="0.5" stopColor="#9fc0ff" />
          <stop offset="1" stopColor="#7ba0ff" />
        </linearGradient>

        <linearGradient id="visor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0af" />
          <stop offset="1" stopColor="#69f" />
        </linearGradient>

        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="chalk">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="1"
            seed="7"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" />
          <feBlend in="SourceGraphic" in2="noise" mode="screen" />
        </filter>

        <radialGradient id="pointerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffd37f" />
          <stop offset="1" stopColor="#ffd37f" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ======== TABLEAU ======== */}
      <g transform="translate(420,90)">
        <rect
          x="0"
          y="0"
          width="740"
          height="480"
          rx="14"
          fill="#2a3b2a"
          stroke="#1b261b"
          strokeWidth="12"
        />
        <rect
          x="12"
          y="12"
          width="716"
          height="456"
          rx="8"
          fill="#17331a"
          stroke="#0e1f11"
          strokeWidth="2"
        />

        <g opacity="0.12">
          <g id="vgrid">
            <path d="M 0 0 V 456" stroke="#c8f3d1" strokeWidth="1" />
          </g>
          <g transform="translate(12,12)" clipPath="url(#clip)">
            <use href="#vgrid" transform="translate(0,12)" />
            {Array.from({ length: 11 }).map((_, i) => (
              <use
                key={i}
                href="#vgrid"
                transform={`translate(${60 * (i + 1)},12)`}
              />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <path
                key={i}
                d={`M0 ${40 * i} H 716`}
                stroke="#c8f3d1"
                strokeWidth="1"
              />
            ))}
          </g>
        </g>

        {/* === Formules et traits === */}
        <g
          transform="translate(24,36)"
          stroke="#e6ffe8"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#chalk)"
        >
          <path
            d="M 20 40 C 80 38, 140 38, 200 40"
            fill="none"
            strokeWidth="6"
            opacity="0.7"
            stroke="#d4ffd6"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0,220; 220,0"
              dur="1.2s"
              fill="freeze"
              begin="0.2s"
            />
          </path>
          <text
            x="220"
            y="46"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="36"
            fill="#eaffef"
            opacity="0"
          >
            y = ax + b
            <animate
              attributeName="opacity"
              values="0;1"
              dur="0.4s"
              begin="0.9s"
              fill="freeze"
            />
          </text>

          <path
            d="M 20 120 C 60 118, 140 118, 240 120"
            fill="none"
            opacity="0.7"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0,260; 260,0"
              dur="1.2s"
              begin="1.2s"
              fill="freeze"
            />
          </path>
          <text
            x="260"
            y="128"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="44"
            fill="#eaffef"
            opacity="0"
          >
            S = ∑ᵢ xᵢ
            <animate
              attributeName="opacity"
              values="0;1"
              dur="0.4s"
              begin="2.1s"
              fill="freeze"
            />
          </text>

          <path
            d="M 20 200 C 120 198, 220 198, 320 200"
            fill="none"
            opacity="0.7"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0,320; 320,0"
              dur="1.2s"
              begin="2.2s"
              fill="freeze"
            />
          </path>
          <text
            x="340"
            y="208"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="40"
            fill="#eaffef"
            opacity="0"
          >
            ∫ f(x) dx = F(x) + C
            <animate
              attributeName="opacity"
              values="0;1"
              dur="0.4s"
              begin="3.1s"
              fill="freeze"
            />
          </text>
        </g>

        <g opacity="0.35" filter="url(#chalk)">
          <circle cx="120" cy="86" r="2" fill="#e6ffe8" />
          <circle cx="360" cy="206" r="1.6" fill="#e6ffe8" />
          <circle cx="460" cy="308" r="1.8" fill="#e6ffe8" />
        </g>

        <text
          x="716"
          y="468"
          textAnchor="end"
          fontFamily="Inter, Roboto, sans-serif"
          fontSize="20"
          fill="#9fe3ff"
          opacity="0.8"
        >
          ESI Renouveau{" "}
          <rect
            x="0"
            y="0"
            width="740"
            height="480"
            rx="14"
            fill="#2a3b2a"
            stroke="#1b261b"
            strokeWidth="12"
          />
        </text>
      </g>

      {/* ======== ROBOT ======== */}
      <g transform="translate(250,430)">
        <ellipse
          cx="0"
          cy="-220"
          rx="240"
          ry="120"
          fill="#15325e"
          opacity="0.25"
          filter="url(#softGlow)"
        />

        <path
          d="M -120 40 Q 0 -10 120 40 L 100 210 Q 0 250 -100 210 Z"
          fill="url(#botMetal)"
          stroke="#5c6cff"
          strokeWidth="3"
        />

        <rect
          x="-18"
          y="-32"
          width="36"
          height="30"
          rx="8"
          fill="#90a8ff"
          stroke="#5c6cff"
          strokeWidth="3"
        />

        <g>
          <rect
            x="-86"
            y="-180"
            width="172"
            height="146"
            rx="26"
            fill="url(#botMetal)"
            stroke="#5c6cff"
            strokeWidth="3"
          />
          <rect
            x="-64"
            y="-136"
            width="128"
            height="62"
            rx="16"
            fill="url(#visor)"
          />
          <g>
            <circle cx="-28" cy="-106" r="9" fill="#d6f3ff" />
            <circle cx="28" cy="-106" r="9" fill="#d6f3ff" />
          </g>
          <path
            d="M -30 -78 Q 0 -64 30 -78"
            stroke="#d6f3ff"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        <g>
          <ellipse
            cx="120"
            cy="60"
            rx="22"
            ry="16"
            fill="url(#botMetal)"
            stroke="#5c6cff"
            strokeWidth="3"
          />
          <path
            d="M 110 70 Q 160 90 210 70"
            fill="none"
            stroke="url(#botMetal)"
            strokeWidth="16"
            opacity="0.9"
          />
          <path
            d="M 210 70 Q 280 40 350 10"
            fill="none"
            stroke="url(#botMetal)"
            strokeWidth="14"
            opacity="0.95"
          />
          <path
            d="M 350 10 L 580 -60"
            stroke="#caa886"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <g transform="translate(580,-60)">
            <circle
              r="10"
              fill="url(#pointerGlow)"
              opacity="0.9"
              filter="url(#softGlow)"
            />
            <circle r="3" fill="#fff9d6" />
          </g>
        </g>

        <g transform="translate(0,120)" filter="url(#softGlow)">
          <circle r="38" fill="#0af" opacity="0.85" />
          <circle r="20" fill="#9ff" />
          <circle r="7" fill="#fff" />
        </g>
      </g>

      <ellipse
        cx="600"
        cy="610"
        rx="520"
        ry="40"
        fill="#0a1328"
        opacity="0.6"
      />
    </svg>
  );
}
