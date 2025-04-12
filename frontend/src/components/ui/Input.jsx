import React from 'react';
import './Input.css';

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  name,
  error,
  required = false,
  className = '',
  icon
}) => {
  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label className="input-label" htmlFor={name}>
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <div className="input-field-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          type={type}
          id={name}
          name={name}
          className={`input-field ${icon ? 'with-icon' : ''} ${error ? 'has-error' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default Input; 