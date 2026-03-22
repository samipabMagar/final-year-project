import React from 'react';

const Button = React.forwardRef(
  ({ children, loading, className = '', type = 'button', disabled, ...props }, ref) => {
    return (
      <button
        type={type}
        ref={ref}
        disabled={disabled || loading}
        className={`px-6 py-2 bg-[#2FA4A9] cursor-pointer text-white rounded-lg font-medium hover:bg-[#25888d] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}
        {...props}
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
