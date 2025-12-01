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
  const baseStyles = 'p-6 border border-gray-200 bg-white transition-all duration-200 rounded-lg';

  const variants = {
    default: 'hover:shadow-lg',
    ruby: 'border-ruby/20 hover:shadow-lg hover:border-ruby/30',
    seagreen: 'border-seagreen/20 hover:shadow-lg hover:border-seagreen/30',
    skyblue: 'border-skyblue/20 hover:shadow-lg hover:border-skyblue/30',
    fawn: 'border-fawn/20 hover:shadow-lg hover:border-fawn/30',
  };

  const hoverStyles = hoverable ? 'hover:-translate-y-1 cursor-pointer' : '';

  return (
    <div className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
