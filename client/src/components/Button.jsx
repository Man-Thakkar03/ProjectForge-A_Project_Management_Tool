import clsx from 'clsx';
import React from 'react';

const Button = ({ icon, className, label, type, onClick = () => {} }) => {
  return (
    <button 
      type={type || "button"}
      onClick={onClick}
      className={clsx("px-3 py-2 font-medium outline-none rounded transition-all", className)}
    >
      <span>{label}</span>
      {icon && icon}
    </button>
  );
};

export default Button;
