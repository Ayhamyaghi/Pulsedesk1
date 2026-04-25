import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, title, subtitle, className = '', footer }) => {
  return (
    <div className={`bg-white border border-border-subtle rounded-xl overflow-hidden shadow-sm ${className}`}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-bottom border-border-subtle">
          {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
          {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="px-6 py-4">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 bg-slate-50 border-top border-border-subtle">
          {footer}
        </div>
      )}
    </div>
  );
};
