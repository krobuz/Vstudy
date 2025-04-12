import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', // primary, secondary, danger
  icon,
  onClick,
  type = 'button',
  disabled = false,
  className = ''
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button; 