import React from "react";
import clsx from "clsx";

const Title = ({ title, className }) => {
  return (
    <h2
      className={clsx(
        "text-2xl md:text-3xl font-extrabold  tracking-wide uppercase",
        "text-gray-100 nosifer cursor-pointer" ,                        
        "hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-transparent hover:bg-clip-text hover:transition-colors duration-300", 
        className
      )}
    >
      {title}
    </h2>
  );
};

export default Title;
