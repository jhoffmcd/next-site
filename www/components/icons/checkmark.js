export default ({ inverse }) => (
  <svg width="36" height="36" viewBox="0 -3 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#checkmark-filter)">
      <path
        d="M18 30C25.732 30 32 23.732 32 16C32 8.26801 25.732 2 18 2C10.268 2 4 8.26801 4 16C4 23.732 10.268 30 18 30Z"
        fill={inverse ? '#007AFF' : '#fff'}
      />
      <path
        d="M13 16.3333L15.9167 19.25L22.1667 13"
        stroke={inverse ? '#fff' : '#000'}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
    <defs>
      <filter
        id="checkmark-filter"
        x="0"
        y="0"
        width="36"
        height="36"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
)
