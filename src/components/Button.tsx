import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    primary: 'bg-primary text-white shadow hover:bg-primary/90',
    secondary: 'bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-100/80',
    outline: 'border border-border-subtle bg-white shadow-sm hover:bg-slate-50 text-slate-700',
    ghost: 'hover:bg-slate-100 text-slate-700',
    danger: 'bg-red-500 text-white shadow-sm hover:bg-red-600',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-8',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};
