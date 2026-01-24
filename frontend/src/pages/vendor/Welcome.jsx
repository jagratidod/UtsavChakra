import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VendorWelcome = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full flex flex-col bg-brand-pink">
            {/* Image Section - Top Half */}
            <div className="w-full h-[55vh] relative z-0 rounded-b-[40px] overflow-hidden shadow-2xl bg-white/10">
                <img
                    src="/illustrations/Splash Screen.jpg"
                    alt="Welcome Vendor"
                    className="w-full h-full object-cover"
                />
                {/* Gradient overlay for blending */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-pink/40 to-transparent" />
            </div>

            {/* Content Section - Bottom Half */}
            <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8 z-10 w-full max-w-md mx-auto">
                <div className="w-full text-center animate-float">
                    <h1 className="text-white text-5xl font-script mb-3 drop-shadow-md">
                        Vendor Portal
                    </h1>
                    <p className="text-white/90 text-sm mb-8 font-light tracking-wide px-4 leading-relaxed">
                        Grow Your Business - Connect with couples and manage events seamlessly.
                    </p>

                    <button
                        onClick={() => navigate('/vendor/login')}
                        className="w-full bg-white text-brand-pink py-4 rounded-full font-semibold shadow-xl hover:bg-brand-light-pink transition-all transform active:scale-95 duration-300 ease-out"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VendorWelcome;
