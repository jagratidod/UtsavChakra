import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "w-full py-3.5 px-6 rounded-full font-bold text-sm tracking-wide transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        // UPDATED: Now uses the brand 'primary' colors (Purple/Violet)
        primary: "bg-gradient-to-r from-primary-dark to-primary text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:to-primary-light border-none",
        secondary: "bg-white text-primary-dark border-2 border-primary hover:bg-purple-50",
        outline: "bg-transparent border border-gray-300 text-gray-600 hover:bg-gray-50",
        social: "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2 text-xs font-bold uppercase transition-colors"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
