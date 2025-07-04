import React from "react";
import clsx from "clsx";

const Title = ({ title, className }) => {
  return (
    <h2
      className={clsx(
        "text-2xl md:text-3xl font-semibold tracking-wide uppercase",
        "text-gray-100",                          // Default readable text
        "border-b border-blue-500 pb-1",          // Adds a subtle neon accent
        "hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-transparent hover:bg-clip-text hover:transition-colors", // On hover: neon cyan
        className
      )}
    >
      {title}
    </h2>
  );
};

export default Title;
