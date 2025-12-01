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
  const baseStyles = 'font-semibold transition-all duration-200 border-2 inline-block text-center cursor-pointer hover:opacity-90 rounded-md';

  const variants = {
    primary: 'bg-ruby text-white border-ruby hover:bg-ruby/90',
    secondary: 'bg-seagreen text-white border-seagreen hover:bg-seagreen/90',
    accent: 'bg-fawn text-white border-fawn hover:bg-fawn/90',
    outline: 'bg-transparent text-onyx border-onyx hover:bg-onyx hover:text-white',
  };

  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-base',
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
