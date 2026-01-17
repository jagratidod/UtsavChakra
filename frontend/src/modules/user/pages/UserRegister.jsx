import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import { ArrowLeft } from 'lucide-react';
import logo from '../../../assets/logo/utsavchakralogo.png';
import frontImage from '../../../assets/front image/frontimage.png';

const UserRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Registering:", formData);
        navigate('/user/preferences');
    };

    return (
        <div className="min-h-screen bg-[#FFF5F7] flex flex-col items-center overflow-x-hidden font-sans max-w-[440px] mx-auto shadow-2xl shadow-pink-100/50 border-x border-white relative">
            {/* Top Image Section with Premium 'Melt' Fade */}
            <div className="w-full h-[45vh] relative shrink-0 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center scale-105"
                    style={{ backgroundImage: `url(${frontImage})` }}
                >
                    {/* Deep Melting Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFF5F7]/30 to-[#FFF5F7]"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FFF5F7] opacity-90"></div>
                </div>
            </div>

            {/* Form Container */}
            <div className="w-full max-w-md px-6 -mt-32 relative z-20 pb-20">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/10">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-script text-[#FF4D6D]">Join Utsav Chakra</h2>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Create your account to start planning</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            id="name"
                            type="text"
                            label="Full Name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-pink-50 rounded-2xl py-4"
                        />

                        <Input
                            id="phone"
                            type="tel"
                            label="Phone Number"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={handleChange}
                            className="bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-pink-50 rounded-2xl py-4"
                        />

                        <Input
                            id="email"
                            type="email"
                            label="Email Address"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-pink-50 rounded-2xl py-4"
                        />

                        <Input
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-pink-50 rounded-2xl py-4"
                        />

                        <button
                            type="submit"
                            className="w-full py-5 text-sm font-black text-white rounded-2xl shadow-xl shadow-pink-200/50 transform transition-all active:scale-[0.98] uppercase tracking-[0.2em] mt-4"
                            style={{
                                background: 'linear-gradient(90deg, #FF5C8B 0%, #FF3D67 100%)',
                            }}
                        >
                            Sign Up
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">
                            Already have an account? {' '}
                            <Link to="/user/login-form" className="text-[#FF4D6D] border-b-2 border-pink-100">
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Subtle Decorations */}
            <div className="fixed -bottom-20 -left-20 w-80 h-80 bg-pink-50/50 rounded-full blur-[100px] pointer-events-none -z-10"></div>
            <div className="fixed -bottom-20 -right-20 w-80 h-80 bg-orange-50/50 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        </div>
    );
};

export default UserRegister;
