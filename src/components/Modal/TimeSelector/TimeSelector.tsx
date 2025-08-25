'use client';

import React, { useRef } from 'react';

interface TimeSelectorProps {
  value: string;
  onChange: (time: string) => void;
  placeholder?: string;
  className?: string;
}

// type guard for showPicker support (no `any`)
function hasShowPicker(
  el: HTMLInputElement | null
): el is HTMLInputElement & { showPicker: () => void } {
  return !!el && 'showPicker' in el;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  value,
  onChange,
  placeholder = 'Select time',
  className = '',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleIconClick = () => {
    // Open native picker if available; otherwise just focus
    if (hasShowPicker(inputRef.current)) {
      inputRef.current.showPicker();
    }
    // Always try to focus as fallback
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="time"
        value={value}
        onChange={handleTimeChange}
        placeholder={placeholder}
        className={[
          'w-full h-11 rounded-[12px] border border-[#E9EAEA] bg-white px-4 pr-12',
          'text-[15px] text-gray-900 placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-[#6E0AB8]/30 focus:border-[#6E0AB8]',
          'appearance-none',
          '[&::-webkit-calendar-picker-indicator]:hidden',
          '[&::-webkit-clear-button]:hidden',
          '[&::-webkit-inner-spin-button]:hidden',
          '[&::-ms-clear]:hidden',
          '[&::-ms-reveal]:hidden',
        ].join(' ')}
        style={{
          WebkitAppearance: 'none',
          MozAppearance: 'textfield',
          appearance: 'none',
        }}
      />

      {/* Custom clock button (right side) */}
      <button
        type="button"
        onClick={handleIconClick}
        className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center"
        aria-label="Open time picker"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* JSX uses camelCase: clipPath (not clip-path) */}
          <g clipPath="url(#clip0_3807_27225)">
            <path
              d="M10 2C8.41775 2 6.87104 2.46919 5.55544 3.34824C4.23985 4.22729 3.21447 5.47672 2.60897 6.93853C2.00347 8.40034 1.84504 10.0089 2.15372 11.5607C2.4624 13.1126 3.22433 14.538 4.34315 15.6569C5.46197 16.7757 6.88743 17.5376 8.43928 17.8463C9.99113 18.155 11.5997 17.9965 13.0615 17.391C14.5233 16.7855 15.7727 15.7602 16.6518 14.4446C17.5308 13.129 18 11.5823 18 10C17.9977 7.87897 17.1541 5.84547 15.6543 4.34568C14.1545 2.84589 12.121 2.00229 10 2V2ZM10.6667 9.91933C10.6667 10.0323 10.6381 10.1435 10.5834 10.2424C10.5287 10.3413 10.4498 10.4247 10.354 10.4847L7.794 12.0847C7.71959 12.1312 7.63674 12.1625 7.5502 12.177C7.46366 12.1915 7.37512 12.1888 7.28963 12.169C7.20413 12.1493 7.12337 12.1129 7.05194 12.0619C6.98052 12.0109 6.91983 11.9464 6.87334 11.872C6.82685 11.7976 6.79547 11.7147 6.781 11.6282C6.76653 11.5417 6.76925 11.4531 6.78899 11.3676C6.80874 11.2821 6.84514 11.2014 6.8961 11.1299C6.94706 11.0585 7.01159 10.9978 7.086 10.9513L9.33334 9.55V6.66667C9.33334 6.48986 9.40358 6.32029 9.5286 6.19526C9.65362 6.07024 9.82319 6 10 6C10.1768 6 10.3464 6.07024 10.4714 6.19526C10.5964 6.32029 10.6667 6.48986 10.6667 6.66667V9.91933Z"
              fill="#727A90"
            />
          </g>
          <defs>
            <clipPath id="clip0_3807_27225">
              <rect width="16" height="16" fill="white" transform="translate(2 2)" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
};

export default TimeSelector;
