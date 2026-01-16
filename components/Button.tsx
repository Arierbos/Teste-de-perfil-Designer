import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "py-3 px-6 rounded-full font-semibold transition-all duration-200 ease-in-out flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";
  
  const variants = {
    primary: "bg-brand-primary text-white hover:bg-indigo-700 shadow-md hover:shadow-lg",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    tertiary: "bg-transparent text-gray-500 hover:text-gray-800 underline-offset-4 hover:underline",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};