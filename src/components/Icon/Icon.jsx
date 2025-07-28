import { useEffect } from "react";


// components/Icon.jsx
export default function Icon({
  name, // The ID from the sprite
  size = 24,
  width,
  height, // Default size
  color = "currentColor", // Default color
  className = "",
  ...props
}) {
  
  return (
    <svg
      width={width || size}
      height={height || size}
      fill={color}
      className={`icon icon-${name} ${className}`}
      {...props}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <use xlinkHref={`${import.meta.env.BASE_URL}/src/assets/images/sprite.svg#${name}`} />
    </svg>
  );
}
