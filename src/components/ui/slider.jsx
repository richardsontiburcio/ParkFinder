import React from 'react';

const Slider = ({ value, onValueChange, min = 0, max = 100, step = 1, className = '' }) => {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (Array.isArray(value)) {
      // Para range slider (dois valores)
      if (e.target.dataset.index === '0') {
        onValueChange([newValue, value[1]]);
      } else {
        onValueChange([value[0], newValue]);
      }
    } else {
      // Para slider simples (um valor)
      onValueChange([newValue]);
    }
  };

  if (Array.isArray(value) && value.length === 2) {
    // Range slider
    return (
      <div className={`relative ${className}`}>
        <div className="relative h-2 bg-gray-200 rounded-full">
          <div
            className="absolute h-2 bg-blue-600 rounded-full"
            style={{
              left: `${((value[0] - min) / (max - min)) * 100}%`,
              width: `${((value[1] - value[0]) / (max - min)) * 100}%`
            }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={handleChange}
          data-index="0"
          className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={handleChange}
          data-index="1"
          className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
        />
      </div>
    );
  }

  // Slider simples
  const singleValue = Array.isArray(value) ? value[0] : value;
  return (
    <div className={`relative ${className}`}>
      <div className="relative h-2 bg-gray-200 rounded-full">
        <div
          className="absolute h-2 bg-blue-600 rounded-full"
          style={{
            width: `${((singleValue - min) / (max - min)) * 100}%`
          }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={singleValue}
        onChange={handleChange}
        className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
      />
    </div>
  );
};

export { Slider };

