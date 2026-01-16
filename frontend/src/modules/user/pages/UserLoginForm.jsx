import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import { ArrowLeft } from 'lucide-react';
import logo from '../../../assets/logo/utsavchakralogo.png';
import frontImage from '../../../assets/front image/frontimage.png';

const UserLoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Logging in with:", email, password);
        navigate('/user/dashboard');
    };

    return (
        <div className="min-h-screen w-full relative flex flex-col items-center justify-center overflow-hidden font-sans">
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

            <div className="relative z-10 w-full max-w-md px-8 py-10 flex flex-col items-center bg-white/40 rounded-[2.5rem] border border-white/50 shadow-2xl">
                <div className="w-20 h-20 mb-4 p-1 rounded-full border-2 border-[#FF4D6D] shadow-lg bg-white">
                    <img src={logo} alt="Utsav Chakra" className="w-full h-full object-contain rounded-full" />
                </div>

                <h2 className="text-3xl font-script text-[#FF4D6D] mb-8" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    Welcome User
                </h2>

                <form onSubmit={handleSubmit} className="w-full space-y-5">
                    <Input
                        id="email"
                        type="email"
                        label="Email-ID"
                        placeholder="user@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/80 border-gray-200 focus:border-[#FF4D6D] focus:ring-[#FF4D6D]/20 rounded-2xl py-3.5"
                    />

                    <div className="space-y-1">
                        <Input
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-white/80 border-gray-200 focus:border-[#FF4D6D] focus:ring-[#FF4D6D]/20 rounded-2xl py-3.5"
                        />
                        <div className="flex justify-end pr-2">
                            <Link to="/user/forgot-password" size="sm" className="text-sm text-[#FF8540] hover:underline font-bold">
                                Forgot Password?
                            </Link>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 text-lg font-bold text-white rounded-full shadow-lg transform transition-all active:scale-95 hover:shadow-xl hover:-translate-y-0.5 mt-4"
                        style={{
                            background: 'linear-gradient(90deg, #FF5E7E 0%, #FF2E56 100%)',
                        }}
                    >
                        LOGIN
                    </button>
                </form>

                <p className="text-sm text-gray-600 text-center font-medium mt-8">
                    New to Utsav Chakra? {' '}
                    <Link to="/user/register" className="text-[#FF4D6D] font-bold hover:underline">
                        Register Now
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default UserLoginForm;
