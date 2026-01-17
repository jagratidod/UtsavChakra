import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../../../components/ui/Input';
import { KeyRound, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import frontImage from '../../../../assets/front image/frontimage.png';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [step, setStep] = useState('request'); // 'request', 'success'

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setStep('success');
    };

    return (
        <div className="min-h-screen w-full bg-[#FFF5F7] flex flex-col items-center overflow-x-hidden font-sans max-w-[440px] mx-auto shadow-2xl shadow-pink-100/50 border-x border-white relative">
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
            <div className="w-full max-w-md px-6 -mt-32 relative z-20">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/10">

                    {step === 'request' ? (
                        <>
                            <div className="text-center mb-10">
                                <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center text-[#FF4D6D] mx-auto mb-6 shadow-sm border border-pink-100">
                                    <KeyRound size={32} />
                                </div>
                                <h2 className="text-3xl font-script text-[#FF4D6D]">Reset Password</h2>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 leading-relaxed px-4">
                                    Enter your registered email and we'll send you instructions to reset your password.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <Input
                                    id="email"
                                    type="email"
                                    label="Email Address"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-gray-50/50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-pink-50 rounded-2xl py-4"
                                />

                                <button
                                    type="submit"
                                    className="w-full py-5 text-sm font-black text-white rounded-2xl shadow-xl shadow-pink-200/50 transform transition-all active:scale-[0.98] uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                                    style={{
                                        background: 'linear-gradient(90deg, #FF5C8B 0%, #FF3D67 100%)',
                                    }}
                                >
                                    Send Link <ArrowRight size={18} />
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-4 animate-in zoom-in-95 duration-500">
                            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-8 relative">
                                <CheckCircle2 size={48} strokeWidth={2.5} />
                                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-10"></div>
                            </div>
                            <h2 className="text-3xl font-script text-gray-900">Check Email</h2>
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-4 leading-relaxed">
                                We've sent a recovery link to<br />
                                <span className="text-gray-900 flex items-center justify-center gap-2 mt-2 lowercase">
                                    <Mail size={12} className="text-[#FF4D6D]" /> {email}
                                </span>
                            </p>

                            <div className="mt-12 pt-8 border-t border-gray-50">
                                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6 px-8">
                                    Didn't receive the email? Check your spam folder or try again.
                                </p>
                                <button
                                    onClick={() => setStep('request')}
                                    className="text-xs font-black text-[#FF4D6D] uppercase tracking-widest hover:underline"
                                >
                                    Resend Instructions
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="mt-10 text-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-xs text-gray-400 font-bold uppercase tracking-wide hover:text-[#FF4D6D] transition-colors"
                        >
                            Back to Login
                        </button>
                    </div>
                </div>
            </div>

            {/* Subtle Decorations */}
            <div className="fixed -bottom-20 -left-20 w-80 h-80 bg-pink-50/50 rounded-full blur-[100px] pointer-events-none -z-10"></div>
            <div className="fixed -bottom-20 -right-20 w-80 h-80 bg-orange-50/50 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        </div>
    );
};

export default ForgotPassword;
