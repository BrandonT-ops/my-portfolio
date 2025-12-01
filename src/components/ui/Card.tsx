import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'ruby' | 'seagreen' | 'skyblue' | 'fawn';
  className?: string;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  hoverable = false,
}) => {
  const baseStyles = 'p-6 border-3 border-onyx bg-white transition-all duration-200';

  const variants = {
    default: 'shadow-brutal hover:shadow-brutal-lg',
    ruby: 'shadow-brutal-ruby hover:shadow-brutal-lg bg-ruby/5',
    seagreen: 'shadow-brutal-seagreen hover:shadow-brutal-lg bg-seagreen/5',
    skyblue: 'shadow-brutal-skyblue hover:shadow-brutal-lg bg-skyblue/5',
    fawn: 'shadow-brutal hover:shadow-brutal-lg bg-fawn/20',
  };

  const hoverStyles = hoverable ? 'hover:-translate-y-1 cursor-pointer' : '';

  return (
    <div className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
