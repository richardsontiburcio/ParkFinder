import React from 'react';

const Badge = ({ children, variant = "default", className = "" }) => {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  const variants = {
    default: "bg-blue-100 text-blue-800",
    destructive: "bg-red-100 text-red-800",
    success: "bg-green-100 text-green-800"
  };

  const variantClasses = variants[variant] || variants.default;

  return (
    <span className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;

