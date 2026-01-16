import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo/utsavchakralogo.png';
import frontImage from '../../../assets/front image/frontimage.png';
import { Facebook } from 'lucide-react';

const VendorLogin = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full relative flex flex-col items-center justify-center overflow-hidden font-sans">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${frontImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-md px-8 flex flex-col items-center">

                {/* Logo & Brand */}
                <div className="flex flex-col items-center mb-12 animate-fade-in-down">
                    <div className="w-28 h-28 mb-4 bg-white rounded-full p-2 shadow-xl flex items-center justify-center border-4 border-white/50">
                        <img
                            src={logo}
                            alt="Utsav Chakra Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-3xl font-bold text-gray-800 tracking-tight">"Utsav</span>
                        <span className="text-3xl font-script text-[#FF4D6D]">Chakra</span>
                    </div>
                </div>

                {/* Welcome Text */}
                <div className="text-center mb-14">
                    <h2 className="text-5xl font-script text-[#FF4D6D] leading-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        Welcome <br /> Vendors
                    </h2>
                </div>

                {/* Main Action Buttons */}
                <div className="w-full space-y-6 mb-10">
                    <button
                        onClick={() => navigate('/vendor/login-form')}
                        className="w-full py-4 text-lg font-bold text-white rounded-full shadow-lg transform transition-all active:scale-95 hover:shadow-xl hover:-translate-y-0.5"
                        style={{
                            background: 'linear-gradient(90deg, #FF5E7E 0%, #FF2E56 100%)',
                        }}
                    >
                        LOGIN
                    </button>

                    <button
                        onClick={() => navigate('/vendor/register')}
                        className="w-full py-4 text-lg font-bold text-white rounded-full shadow-lg transform transition-all active:scale-95 hover:shadow-xl hover:-translate-y-0.5"
                        style={{
                            background: 'linear-gradient(90deg, #FFB382 0%, #FF8540 100%)',
                        }}
                    >
                        REGISTER
                    </button>
                </div>

                {/* Divider */}
                <div className="w-full flex items-center gap-4 mb-8">
                    <div className="h-[1px] bg-gray-300 flex-1"></div>
                    <span className="text-gray-500 text-xs font-bold uppercase tracking-widest whitespace-nowrap">OR WITH</span>
                    <div className="h-[1px] bg-gray-300 flex-1"></div>
                </div>

                {/* Social Buttons */}
                <div className="flex gap-4 w-full">
                    <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full border-2 border-[#FF4D6D] text-[#FF4D6D] font-bold text-sm bg-white hover:bg-[#FF4D6D]/5 transition-all">
                        <Facebook size={18} fill="currentColor" /> FACEBOOK
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full border-2 border-[#FF8540] text-[#FF8540] font-bold text-sm bg-white hover:bg-[#FF8540]/5 transition-all">
                        <span className="font-serif text-lg leading-none font-bold">G+</span> GOOGLE
                    </button>
                </div>
            </div>

            {/* Bottom Decoration (Simulated Bokeh) */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#FF4D6D]/20 rounded-full blur-[80px]"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#FF8540]/20 rounded-full blur-[80px]"></div>
        </div>
    );
};

export default VendorLogin;
