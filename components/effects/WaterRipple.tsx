"use client";

export function WaterRipple({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-x-0 overflow-hidden pointer-events-none ${className}`} aria-hidden>
      <svg
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(186,230,253,0.4)" />
            <stop offset="50%" stopColor="rgba(125,211,252,0.25)" />
            <stop offset="100%" stopColor="rgba(186,230,253,0.4)" />
          </linearGradient>
        </defs>
        <path
          d="M0,60 C180,100 360,20 540,60 C720,100 900,20 1080,60 C1260,100 1350,40 1440,60 L1440,120 L0,120 Z"
          fill="url(#waveGrad)"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            from="-1440,0"
            to="0,0"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M0,75 C240,40 480,110 720,75 C960,40 1200,110 1440,75 L1440,120 L0,120 Z"
          fill="rgba(224,242,254,0.35)"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0,0"
            to="-1440,0"
            dur="12s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
}
