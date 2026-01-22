import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-brand-pink overflow-hidden">
            {/* Background Image - Splash Screen */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/illustrations/Splash Screen.jpg"
                    alt="Welcome"
                    className="w-full h-full object-cover"
                />
                {/* Soft overlay to ensure readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-pink/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-md px-8 mt-auto mb-20 text-center animate-float">
                <h1 className="text-white text-5xl font-script mb-2 drop-shadow-md">
                    Wedding Planner
                </h1>
                <p className="text-white/90 text-sm mb-8 font-light tracking-wide px-4">
                    Plan Your Own Wedding - Elegant, seamless, and uniquely yours.
                </p>

                <button
                    onClick={() => navigate('/login')}
                    className="w-full bg-white text-brand-pink py-4 rounded-full font-semibold shadow-xl hover:bg-brand-light-pink transition-all active:scale-95"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Welcome;
