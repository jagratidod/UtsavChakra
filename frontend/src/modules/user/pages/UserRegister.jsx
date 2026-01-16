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
        <div className="min-h-screen w-full relative flex flex-col items-center justify-center overflow-hidden font-sans py-10">
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
                    onClick={() => navigate('/user/entry')}
                    className="text-[#FF4D6D] hover:text-[#FF2E56] transition-all p-2 rounded-full hover:bg-[#FF4D6D]/10 active:scale-90"
                >
                    <ArrowLeft size={28} strokeWidth={2.5} />
                </button>
            </div>

            <div className="relative z-10 w-full max-w-md px-8 py-10 flex flex-col items-center bg-white/40 rounded-[2.5rem] border border-white/50 shadow-2xl mx-4">
                <div className="w-16 h-16 mb-4 p-1 rounded-full border-2 border-[#FF4D6D] shadow-lg bg-white">
                    <img src={logo} alt="Utsav Chakra" className="w-full h-full object-contain rounded-full" />
                </div>

                <h2 className="text-3xl font-script text-[#FF4D6D] mb-6">User Registration</h2>

                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <Input
                        id="name"
                        type="text"
                        label="Full Name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-white/80 border-gray-200 focus:border-[#FF4D6D] rounded-2xl"
                    />

                    <Input
                        id="phone"
                        type="tel"
                        label="Phone Number"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-white/80 border-gray-200 focus:border-[#FF4D6D] rounded-2xl"
                    />

                    <Input
                        id="email"
                        type="email"
                        label="Email-ID"
                        placeholder="user@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-white/80 border-gray-200 focus:border-[#FF4D6D] rounded-2xl"
                    />

                    <Input
                        id="password"
                        type="password"
                        label="Password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-white/80 border-gray-200 focus:border-[#FF4D6D] rounded-2xl"
                    />

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
                    <Link to="/user/login-form" className="text-[#FF8540] font-bold hover:underline">
                        Login Here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default UserRegister;
