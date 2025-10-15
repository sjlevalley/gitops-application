import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus-ring disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'text-primary-foreground',
    secondary: 'text-secondary-foreground',
    outline: 'border text-foreground',
    ghost: 'text-foreground hover:bg-accent',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--primary)',
          color: 'var(--primary-foreground)',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--secondary)',
          color: 'var(--secondary-foreground)',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: 'var(--foreground)',
          borderColor: 'var(--border)',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--foreground)',
        };
      default:
        return {};
    }
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={getVariantStyles()}
      {...props}
    >
      {children}
    </button>
  );
}
