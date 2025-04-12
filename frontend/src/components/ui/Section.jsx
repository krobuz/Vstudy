import React from 'react';
import './Section.css';

const Section = ({
  title,
  children,
  actions,
  className = ''
}) => {
  return (
    <section className={`section ${className}`}>
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        {actions && <div className="section-actions">{actions}</div>}
      </div>
      <div className="section-content">
        {children}
      </div>
    </section>
  );
};

export default Section; 