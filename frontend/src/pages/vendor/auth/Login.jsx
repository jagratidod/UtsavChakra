import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

const VendorLogin = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Phone, 2: OTP
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        if (phoneNumber.length >= 10) {
            setStep(2);
        }
    };

    const handleOtpChange = (index, value) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Navigate to vendor dashboard
        navigate('/vendor/dashboard');
    };

    return (
        <div className="min-h-screen w-full bg-slate-50 flex flex-col font-sans overflow-x-hidden">
            {/* Top Image Section - Increased height to fill space */}
            <div className="relative w-full h-[50vh] md:h-[55vh] overflow-hidden">
                <img
                    src="/illustrations/loginsignup.jpg"
                    alt="Marriage"
                    className="w-full h-full object-cover"
                />
                {/* Sophisticated Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-20 left-8 md:left-20 text-white animate-fade-in-up">
                    <h2 className="text-4xl md:text-6xl font-script text-white mb-2 drop-shadow-2xl">
                        Partner With Us
                    </h2>
                    <p className="opacity-90 text-[10px] md:text-xs font-bold tracking-[4px] uppercase border-l-2 border-brand-pink pl-3">
                        Grow Your Business
                    </p>
                </div>
            </div>

            {/* Login Card Section - Tighter overlap */}
            <div className="relative z-10 px-6 -mt-16 pb-12 flex justify-center">
                <div className="bg-white rounded-[45px] shadow-premium w-full max-w-sm px-8 py-10 flex flex-col items-center border border-pink-50/50">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-serif font-bold text-slate-800 mb-1 leading-tight">
                            {step === 1 ? 'Vendor Login' : 'Verify OTP'}
                        </h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">
                            {step === 1 ? 'Access your business dashboard' : 'Enter the code sent to your phone'}
                        </p>
                    </div>

                    <div className="w-full">
                        {step === 1 ? (
                            <form onSubmit={handlePhoneSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-brand-dark-pink uppercase tracking-widest ml-1">
                                        Mobile Number
                                    </label>
                                    <div className="relative group">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                                            +91
                                        </span>
                                        <input
                                            type="tel"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder="Mobile Number"
                                            className="w-full pl-14 pr-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-brand-pink/30 focus:outline-none focus:ring-4 focus:ring-brand-pink/5 transition-all text-slate-700 font-medium"
                                            maxLength={10}
                                            required
                                        />
                                        <Phone className="absolute right-5 top-1/2 -translate-y-1/2 text-pink-300 w-5 h-5 group-focus-within:text-brand-pink transition-colors" />
                                    </div>
                                </div>

                                <button type="submit" className="btn-premium w-full py-4 text-xs uppercase tracking-[3px] font-black shadow-xl mt-4 active:scale-95">
                                    Get OTP
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleLogin} className="space-y-8 text-center">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold text-brand-dark-pink uppercase tracking-wider block">
                                        Verification Code
                                    </label>
                                    <div className="flex justify-between gap-3 px-2">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                id={`otp-${index}`}
                                                type="text"
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                className="w-14 h-14 text-center text-2xl font-bold rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-brand-pink focus:outline-none focus:ring-4 focus:ring-brand-pink/10 transition-all text-slate-700 shadow-sm"
                                                required
                                            />
                                        ))}
                                    </div>
                                </div>

                                <button type="submit" className="btn-premium w-full py-4 text-xs uppercase tracking-[3px] font-black shadow-xl active:scale-95">
                                    Verify & Login
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-brand-pink transition-colors underline underline-offset-4 decoration-pink-100"
                                >
                                    Change Number
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="mt-12 text-center pb-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            New Vendor?
                            <Link to="/vendor/signup" className="text-brand-dark-pink ml-2 hover:text-brand-pink transition-colors font-black">
                                Join Us
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Elegant Background Decoration to fill bottom on large screens */}
            <div className="fixed bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-brand-light-pink/20 to-transparent -z-10" />
        </div>
    );
};

export default VendorLogin;
