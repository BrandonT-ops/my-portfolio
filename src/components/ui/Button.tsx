import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  href,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-bold uppercase tracking-wide transition-all duration-200 border-3 border-onyx inline-block text-center cursor-pointer hover:-translate-y-1 active:translate-y-0';

  const variants = {
    primary: 'bg-ruby text-white shadow-brutal hover:shadow-brutal-lg',
    secondary: 'bg-seagreen text-white shadow-brutal hover:shadow-brutal-lg',
    accent: 'bg-fawn text-onyx shadow-brutal hover:shadow-brutal-lg',
    outline: 'bg-transparent text-onyx border-onyx shadow-brutal hover:bg-onyx hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClassName}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};

export default Button;
