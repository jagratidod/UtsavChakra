import React from 'react';

const Input = ({ label, id, type = 'text', className = '', ...props }) => {
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
                <input
                    id={id}
                    type={type}
                    className={`
                        w-full px-6 py-4 
                        rounded-2xl 
                        border border-gray-100 
                        text-gray-700 font-medium
                        placeholder-gray-300 
                        focus:outline-none focus:border-[#FF4D6D] focus:ring-4 focus:ring-[#FF4D6D]/10 
                        transition-all duration-200
                        bg-white/80
                        ${className}
                    `}
                    {...props}
                />
            </div>
        </div>
    );
};

export default Input;
