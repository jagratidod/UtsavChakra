import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { ArrowLeft } from 'lucide-react';
import logo from '../../../assets/logo/utsavchakralogo.png';
import frontImage from '../../../assets/front image/frontimage.png';
import { VENDOR_CATEGORIES } from '../../../utils/constants';

const VendorRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firmName: '',
        businessCategory: '',
        email: '',
        phone: '',
        alternatePhone: '',
        address: '',
        experience: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Vendor Registering:", formData);
        navigate('/vendor/dashboard');
    };

    return (
        <div className="min-h-screen w-full bg-[#FFF5F7] flex flex-col items-center overflow-x-hidden font-sans max-w-[440px] mx-auto shadow-2xl shadow-pink-100/50 border-x border-white relative">
            {/* Top Image Section with Premium 'Melt' Fade */}
            <div className="w-full h-[35vh] md:h-[45vh] relative shrink-0 overflow-hidden">
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
            <div className="w-full px-6 -mt-32 relative z-20 pb-20">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/10">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-script text-[#FF4D6D]">Join as Vendor</h2>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Partner with us for premium event services</p>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full space-y-5">
                        <div className="space-y-5">
                            <Input
                                id="firmName"
                                type="text"
                                label="Firm / Business Name"
                                placeholder="Sri Balaji Events"
                                value={formData.firmName}
                                onChange={handleChange}
                                className="bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-pink-50 rounded-2xl py-4"
                            />

                            <Select
                                id="businessCategory"
                                label="Business Category"
                                options={VENDOR_CATEGORIES}
                                value={formData.businessCategory}
                                onChange={handleChange}
                                className="bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-pink-50 rounded-2xl h-[58px]"
                            />
                        </div>

                        <div className="space-y-5">
                            <Input
                                id="email"
                                type="email"
                                label="Email-ID"
                                placeholder="vendor@example.com"
                                value={formData.email}
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
                        </div>

                        <div className="space-y-5">
                            <Input
                                id="alternatePhone"
                                type="tel"
                                label="Alternate Number"
                                placeholder="+91 91234 56789"
                                value={formData.alternatePhone}
                                onChange={handleChange}
                                className="bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-pink-50 rounded-2xl py-4"
                            />

                            <Input
                                id="experience"
                                type="text"
                                label="Experience (in Years)"
                                placeholder="e.g. 5 Years"
                                value={formData.experience}
                                onChange={handleChange}
                                className="bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-pink-50 rounded-2xl py-4"
                            />
                        </div>

                        <div className="space-y-5">
                            <Input
                                id="password"
                                type="password"
                                label="Password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-pink-50 rounded-2xl py-4"
                            />
                            <div className="w-full text-left bottom-4 mb-4">
                                <label className="block text-[#FF4D6D] text-[10px] font-black uppercase tracking-widest mb-2 ml-4">
                                    Address
                                </label>
                                <textarea
                                    id="address"
                                    rows="2"
                                    placeholder="Enter business address"
                                    className="w-full px-6 py-4 rounded-2xl border border-gray-100 text-gray-700 font-bold placeholder-gray-300 focus:outline-none focus:bg-white focus:ring-4 focus:ring-pink-50 transition-all duration-200 bg-gray-50/50"
                                    value={formData.address}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-5 text-sm font-black text-white rounded-2xl shadow-xl shadow-pink-200/50 transform transition-all active:scale-[0.98] uppercase tracking-[0.2em] mt-4"
                            style={{
                                background: 'linear-gradient(90deg, #FF5C8B 0%, #FF3D67 100%)',
                            }}
                        >
                            Complete Registration
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">
                            Already have an account? {' '}
                            <Link to="/vendor/login-form" className="text-[#FF4D6D] border-b-2 border-pink-100">
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

export default VendorRegister;
