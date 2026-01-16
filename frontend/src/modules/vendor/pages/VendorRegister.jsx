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
        <div className="min-h-screen w-full relative flex flex-col items-center justify-center overflow-hidden font-sans py-14">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `url(${frontImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-white/70 backdrop-blur-[3px]"></div>
            </div>

            <div className="absolute top-6 left-6 z-20">
                <button
                    onClick={() => navigate('/vendor/login')}
                    className="text-[#FF4D6D] hover:text-[#FF2E56] transition-all p-2 rounded-full hover:bg-[#FF4D6D]/10 active:scale-90"
                >
                    <ArrowLeft size={28} strokeWidth={2.5} />
                </button>
            </div>

            <div className="relative z-10 w-full max-w-2xl px-8 py-10 flex flex-col items-center bg-white/40 rounded-[2.5rem] border border-white/50 shadow-2xl mx-4">
                <div className="w-16 h-16 mb-4 p-1 rounded-full border-2 border-[#FF4D6D] shadow-lg bg-white">
                    <img src={logo} alt="Utsav Chakra" className="w-full h-full object-contain rounded-full" />
                </div>

                <h2 className="text-3xl font-script text-[#FF4D6D] mb-6">Join as Vendor</h2>

                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <Input
                            id="firmName"
                            type="text"
                            label="Firm / Business Name"
                            placeholder="Sri Balaji Events"
                            value={formData.firmName}
                            onChange={handleChange}
                            className="bg-white/80 border-gray-100 focus:border-[#FF4D6D] rounded-2xl"
                        />

                        <Select
                            id="businessCategory"
                            label="Business Category"
                            options={VENDOR_CATEGORIES}
                            value={formData.businessCategory}
                            onChange={handleChange}
                            className="bg-white/80 border-gray-100 focus:border-[#FF4D6D] focus:ring-[#FF4D6D]/10 rounded-2xl"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <Input
                            id="email"
                            type="email"
                            label="Email-ID"
                            placeholder="vendor@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-white/80 border-gray-100 focus:border-[#FF4D6D] rounded-2xl"
                        />

                        <Input
                            id="phone"
                            type="tel"
                            label="Phone Number"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={handleChange}
                            className="bg-white/80 border-gray-100 focus:border-[#FF4D6D] rounded-2xl"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <Input
                            id="alternatePhone"
                            type="tel"
                            label="Alternate Number"
                            placeholder="+91 91234 56789"
                            value={formData.alternatePhone}
                            onChange={handleChange}
                            className="bg-white/80 border-gray-100 focus:border-[#FF4D6D] rounded-2xl"
                        />

                        <Input
                            id="experience"
                            type="text"
                            label="Experience (in Years)"
                            placeholder="e.g. 5 Years"
                            value={formData.experience}
                            onChange={handleChange}
                            className="bg-white/80 border-gray-100 focus:border-[#FF4D6D] rounded-2xl"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <Input
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="bg-white/80 border-gray-100 focus:border-[#FF4D6D] rounded-2xl"
                        />
                        <div className="w-full text-left">
                            <label className="block text-[#FF4D6D] text-xs font-bold uppercase tracking-wider mb-2 ml-4">
                                Address
                            </label>
                            <textarea
                                id="address"
                                rows="1"
                                placeholder="Enter full business address"
                                className="w-full px-6 py-4 rounded-2xl border border-gray-100 text-gray-700 font-medium placeholder-gray-300 focus:outline-none focus:border-[#FF4D6D] focus:ring-4 focus:ring-[#FF4D6D]/10 transition-all duration-200 bg-white/80"
                                value={formData.address}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 text-lg font-bold text-white rounded-full shadow-lg transform transition-all active:scale-95 hover:shadow-xl mt-4"
                        style={{
                            background: 'linear-gradient(90deg, #FF5E7E 0%, #FF2E56 100%)',
                        }}
                    >
                        REGISTER
                    </button>
                </form>

                <p className="text-sm text-gray-600 text-center font-medium mt-6">
                    Already have an account? {' '}
                    <Link to="/vendor/login-form" className="text-[#FF8540] font-bold hover:underline">
                        Login Here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default VendorRegister;
