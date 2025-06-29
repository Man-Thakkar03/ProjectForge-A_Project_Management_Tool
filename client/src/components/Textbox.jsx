import React from 'react';
import clsx from 'clsx';

const Textbox = React.forwardRef(({ type, placeholder, label, className, register, name, error }, ref) => {
  return (
    <div className='w-full flex flex-col gap-1'>
      {label && (
        <label htmlFor={name} className='text-fuchsia-300 font-semibold'>
          {label}
        </label>
      )}
      <div>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          ref={ref}
          {...register}
          aria-invalid={error ? "true" : "false"}
          className={clsx("bg-transparent px-3 py-2.5 border border-gray-600 rounded-xl placeholder-gray-500 text-white outline-none focus:ring-2 ring-fuchsia-400 transition-all", className)}
        />
      </div>
      {error && (
        <span className='text-xs text-red-400 mt-0'>
          {error}
        </span>
      )}
    </div>
  );
});

export default Textbox;
