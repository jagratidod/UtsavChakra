import React from 'react';

const Select = ({ label, id, options = [], className = '', ...props }) => {
    return (
        <div className="w-full mb-4 text-left">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-[#FF4D6D] text-xs font-bold uppercase tracking-wider mb-2 ml-4"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    id={id}
                    className={`
                        w-full px-6 py-4 
                        rounded-2xl 
                        border border-gray-100 
                        text-gray-700 font-medium
                        bg-white/80
                        appearance-none
                        focus:outline-none focus:border-[#FF4D6D] focus:ring-4 focus:ring-[#FF4D6D]/10 
                        transition-all duration-200
                        ${className}
                    `}
                    {...props}
                >
                    <option value="" disabled>Select Category</option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <svg className="w-4 h-4 text-[#FF4D6D]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Select;
