import React from "react";
import "./Spinner.css";

interface SpinnerProps {
  size?: number;
  gradientColor?: string[];
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 24,
  gradientColor = ["#000", "#fff"],
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      className="spinner"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          {gradientColor.map((color, index) => (
            <stop key={index} offset={`${index * 50}%`} stopColor={color} />
          ))}
        </linearGradient>
      </defs>
      <path
        d="M30,5.5C16.435,5.5,5.5,16.435,5.5,30S16.435,54.5,30,54.5S54.5,43.565,54.5,30S43.565,5.5,30,5.5z M30,50.5c-11.579,0-20.999-9.42-20.999-20.999S18.421,8.502,30,8.502S50.999,17.922,50.999,29.501S41.579,50.5,30,50.5z"
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="10"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from="0 30 30"
          to="360 30 30"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

export default Spinner;
