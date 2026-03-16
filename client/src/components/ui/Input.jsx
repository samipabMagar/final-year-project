import React from 'react';

const Input = React.forwardRef(
  ({ 
    label, 
    icon: Icon, 
    error, 
    className = '',
    labelClassName = '',
    containerClassName = '',
    required,
    ...props 
  }, ref) => {
    const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2FA4A9] focus:border-[#2FA4A9] outline-none transition bg-white";
    
    return (
      <div className={containerClassName}>
        {label && (
          <label 
            htmlFor={props.id} 
            className={`text-sm font-medium text-gray-700 mb-2 flex items-center gap-2 ${labelClassName}`}
          >
            {Icon && <Icon className="w-4 h-4 text-[#2FA4A9]" />}
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`${inputClass} ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
