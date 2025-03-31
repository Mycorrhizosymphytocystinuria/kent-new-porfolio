import React from "react";

const ScrollIndicator = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative flex cursor-pointer flex-col items-center"
    >
      {/* Subtle background glow */}
      <div className="absolute size-38 rounded-full bg-blue-100/5 transition-all duration-700 group-hover:bg-blue-100/5" />

      {/* Main content container */}
      <div className="relative flex flex-col items-center transition-all duration-500">
        {/* Text */}
        <span className="text-blue-100/80 text-sm font-light tracking-wider mb-3 transition-all duration-500 group-hover:text-blue-100">
          Scroll Down
        </span>

        {/* Mouse indicator */}
        <div className="relative h-12 w-7 rounded-full border-2 border-blue-100/50 transition-all duration-500 group-hover:border-blue-100">
          <div
            className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-blue-100/50 transition-all duration-500 group-hover:bg-blue-100"
            style={{
              animation: "gentleScroll 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Single smooth arrow */}
        <div
          className="mt-4 h-4 w-4 rotate-45 border-b-2 border-r-2 border-blue-100/50 transition-all duration-500 group-hover:border-blue-100"
          style={{
            animation: "gentleFloat 2s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
};

export default ScrollIndicator;
