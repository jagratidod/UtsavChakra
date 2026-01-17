import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo/utsavchakralogo.png';
import frontImage from '../../../assets/front image/frontimage.png';
import { Facebook } from 'lucide-react';

const UserLoginSplash = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FFF5F7] flex flex-col items-center overflow-x-hidden font-sans max-w-[440px] mx-auto shadow-2xl shadow-pink-100/50 border-x border-white relative">
            {/* Top Image Section with Premium 'Melt' Fade */}
            <div className="w-full h-[60vh] relative shrink-0 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center scale-110"
                    style={{ backgroundImage: `url(${frontImage})` }}
                >
                    {/* Artistic Melting Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFF5F7]/40 to-[#FFF5F7]"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FFF5F7] opacity-90"></div>
                </div>

                {/* Logo & Brand Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
                    <div className="w-24 h-24 mb-3 relative animate-float">
                        <div className="absolute inset-0 bg-white/20 blur-xl rounded-full"></div>
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                        />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center">
                            <span className="text-3xl font-black text-white drop-shadow-md">"Utsav</span>
                            <span className="text-3xl font-black text-[#FF4D6D] drop-shadow-md">Chakra</span>
                        </div>
                        <h2 className="text-4xl font-script text-[#FF4D6D] mt-4 drop-shadow-sm">
                            Welcome Users
                        </h2>
                    </div>
                </div>
            </div>

            {/* Actions Section */}
            <div className="w-full max-w-sm px-6 -mt-8 relative z-20 flex flex-col items-center">
                <div className="w-full space-y-5 mb-10">
                    <button
                        onClick={() => navigate('/user/login-form')}
                        className="w-full py-5 text-lg font-black text-white rounded-[2rem] shadow-[0_15px_30px_rgba(255,77,109,0.3)] transform transition-all active:scale-95 hover:shadow-[0_20px_40px_rgba(255,77,109,0.4)]"
                        style={{
                            background: 'linear-gradient(90deg, #FF5C8B 0%, #FF3D67 100%)',
                        }}
                    >
                        LOGIN
                    </button>

                    <button
                        onClick={() => navigate('/user/register')}
                        className="w-full py-5 text-lg font-black text-white rounded-[2rem] shadow-[0_15px_30px_rgba(255,142,83,0.2)] transform transition-all active:scale-95 hover:shadow-[0_20px_40px_rgba(255,142,83,0.3)]"
                        style={{
                            background: 'linear-gradient(90deg, #FFAB7D 0%, #FF8540 100%)',
                        }}
                    >
                        REGISTER
                    </button>
                </div>

                {/* Modern Divider */}
                <div className="w-full flex items-center gap-6 mb-8">
                    <div className="h-[1px] bg-gray-200 flex-1"></div>
                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap">OR WITH</span>
                    <div className="h-[1px] bg-gray-200 flex-1"></div>
                </div>

                {/* Social Login Options */}
                <div className="flex gap-4 w-full pb-10">
                    <button className="flex-1 flex items-center justify-center gap-3 py-4 rounded-[1.5rem] border border-pink-100 text-[#FF4D6D] font-black text-xs bg-white hover:bg-pink-50 transition-all shadow-sm active:scale-95 uppercase tracking-widest">
                        <Facebook size={16} fill="currentColor" /> Facebook
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-3 py-4 rounded-[1.5rem] border border-orange-100 text-[#FF8540] font-black text-xs bg-white hover:bg-orange-50 transition-all shadow-sm active:scale-95 uppercase tracking-widest">
                        <span className="text-sm font-black border-r border-orange-100 pr-2">G+</span> Google
                    </button>
                </div>
            </div>

            {/* Artistic Bokeh Decoration */}
            <div className="fixed -bottom-20 -left-20 w-80 h-80 bg-pink-100/40 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="fixed -bottom-20 -right-20 w-80 h-80 bg-orange-100/40 rounded-full blur-[100px] pointer-events-none"></div>
        </div>
    );
};

export default UserLoginSplash;
