import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Phone, Mail, ArrowRight, UserCircle2, Briefcase } from 'lucide-react';

const Signup = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('user'); // user, vendor

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/user/create-event');
    };

    return (
        <div className="min-h-screen w-full bg-slate-50 flex flex-col font-sans overflow-x-hidden">
            {/* Top Image Section */}
            <div className="relative w-full h-[45vh] md:h-[50vh] overflow-hidden">
                <img
                    src="/illustrations/loginsignup.jpg"
                    alt="Marriage"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-16 left-8 md:left-20 text-white animate-fade-in-up">
                    <h2 className="text-4xl md:text-6xl font-script text-white mb-2 drop-shadow-2xl text-slate-800">
                        Create Memories
                    </h2>
                    <p className="md:text-white opacity-90 text-[10px] md:text-xs font-bold tracking-[4px] uppercase border-l-2 border-brand-pink pl-3 text-slate-800">
                        Your Dream, Our Expertise
                    </p>
                </div>
            </div>

            {/* Signup Card Section - Tighter overlap */}
            <div className="relative z-10 px-6 -mt-10 pb-12 flex justify-center">
                <div className="bg-white rounded-[45px] shadow-premium w-full max-w-sm px-8 py-10 flex flex-col items-center border border-pink-50/50">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-serif font-bold text-slate-800 mb-1 leading-tight">
                            Create Account
                        </h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">
                            Join Utsav Chakra today
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brand-dark-pink uppercase tracking-widest ml-1">Full Name</label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-brand-pink/30 focus:outline-none focus:ring-4 focus:ring-brand-pink/5 transition-all text-slate-700 font-medium"
                                    required
                                />
                                <User className="absolute right-5 top-1/2 -translate-y-1/2 text-pink-300 w-5 h-5 group-focus-within:text-brand-pink transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brand-dark-pink uppercase tracking-widest ml-1">Email (Optional)</label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="email@example.com"
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-brand-pink/30 focus:outline-none focus:ring-4 focus:ring-brand-pink/5 transition-all text-slate-700 font-medium"
                                />
                                <Mail className="absolute right-5 top-1/2 -translate-y-1/2 text-pink-300 w-5 h-5 group-focus-within:text-brand-pink transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brand-dark-pink uppercase tracking-widest ml-1">Mobile Number</label>
                            <div className="relative group">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">+91</span>
                                <input
                                    type="tel"
                                    placeholder="Number"
                                    className="w-full pl-14 pr-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-brand-pink/30 focus:outline-none focus:ring-4 focus:ring-brand-pink/5 transition-all text-slate-700 font-medium"
                                    maxLength={10}
                                    required
                                />
                                <Phone className="absolute right-5 top-1/2 -translate-y-1/2 text-pink-300 w-5 h-5 group-focus-within:text-brand-pink transition-colors" />
                            </div>
                        </div>

                        <button type="submit" className="btn-premium w-full py-4 text-xs uppercase tracking-[3px] font-black shadow-xl mt-4 active:scale-95 group">
                            Create Account
                            <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-10 text-center pb-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Partner with us?
                            <Link to="/login" className="text-brand-dark-pink ml-2 hover:text-brand-pink transition-colors font-black">
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Elegant Background Decoration */}
            <div className="fixed bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-brand-light-pink/20 to-transparent -z-10" />
        </div>
    );
};

export default Signup;
