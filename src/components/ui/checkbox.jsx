import React from 'react';
import { Check } from 'lucide-react';

const Checkbox = ({ id, checked, onCheckedChange, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="sr-only"
      />
      <label
        htmlFor={id}
        className={`
          flex items-center justify-center w-4 h-4 border-2 rounded cursor-pointer transition-colors
          ${checked 
            ? 'bg-blue-600 border-blue-600 text-white' 
            : 'bg-white border-gray-300 hover:border-gray-400'
          }
        `}
      >
        {checked && <Check className="w-3 h-3" />}
      </label>
    </div>
  );
};

export { Checkbox };

