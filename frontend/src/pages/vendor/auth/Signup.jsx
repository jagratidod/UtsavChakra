import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Phone, Mail, ArrowRight, ArrowLeft, Briefcase, MapPin, Instagram, Globe, Calendar, Award } from 'lucide-react';

const VendorSignup = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        businessCategory: '',
        businessName: '',
        address: '',
        yearsInBusiness: '',
        eventsManaged: '',
        instagramLink: '',
        websiteLink: ''
    });

    const businessCategories = [
        "Wedding Venue", "Decoration", "Photography", "Makeup Artist",
        "Catering", "Mehendi Artist", "DJ & Music", "Wedding Planner", "Jewelry"
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNext = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Vendor Registration Data:", formData);
        // Navigate to vendor dashboard
        navigate('/vendor/dashboard');
    };

    return (
        <div className="min-h-screen w-full bg-slate-50 flex flex-col font-sans overflow-x-hidden">
            {/* Top Image Section */}
            <div className="relative w-full h-[35vh] md:h-[40vh] overflow-hidden transition-all duration-500">
                <img
                    src="/illustrations/loginsignup.jpg"
                    alt="Marriage"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-10 left-8 md:left-20 text-white animate-fade-in-up">
                    <h2 className="text-3xl md:text-5xl font-script text-white mb-1 drop-shadow-2xl">
                        Join Utsav Chakra
                    </h2>
                    <p className="opacity-90 text-[10px] md:text-xs font-bold tracking-[4px] uppercase border-l-2 border-brand-pink pl-3">
                        Step {step} of 2: {step === 1 ? 'Business Details' : 'Experience & Socials'}
                    </p>
                </div>
            </div>

            {/* Signup Card Section */}
            <div className="relative z-10 px-6 -mt-8 pb-12 flex justify-center">
                <div className="bg-white rounded-[45px] shadow-premium w-full max-w-md px-8 py-10 flex flex-col items-center border border-pink-50/50">

                    {/* Progress Indicator */}
                    <div className="w-full flex gap-2 mb-8">
                        <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-brand-pink' : 'bg-slate-100'}`} />
                        <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-brand-pink' : 'bg-slate-100'}`} />
                    </div>

                    <form onSubmit={step === 1 ? handleNext : handleSubmit} className="w-full space-y-5">

                        {step === 1 ? (
                            <div className="space-y-5 animate-in slide-in-from-right fade-in duration-300">
                                {/* Step 1 Content */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-brand-dark-pink uppercase tracking-widest ml-1">Business Category</label>
                                    <div className="relative group">
                                        <select
                                            name="businessCategory"
                                            value={formData.businessCategory}
                                            onChange={handleInputChange}
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-brand-pink/30 focus:outline-none focus:ring-4 focus:ring-brand-pink/5 transition-all text-slate-700 font-medium appearance-none"
                                            required
                                        >
                                            <option value="" disabled>Select Category</option>
                                            {businessCategories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-pink-300 w-4 h-4">
                                            ▼
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-brand-dark-pink uppercase tracking-widest ml-1">Business Name</label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            name="businessName"
                                            value={formData.businessName}
                                            onChange={handleInputChange}
                                            placeholder="Enter Business Name"
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-brand-pink/30 focus:outline-none focus:ring-4 focus:ring-brand-pink/5 transition-all text-slate-700 font-medium"
                                            required
                                        />
                                        <Briefcase className="absolute right-5 top-1/2 -translate-y-1/2 text-pink-300 w-5 h-5 group-focus-within:text-brand-pink transition-colors" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-brand-dark-pink uppercase tracking-widest ml-1">Business Address</label>
                                    <div className="relative group">
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="Full Address"
                                            rows="3"
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-brand-pink/30 focus:outline-none focus:ring-4 focus:ring-brand-pink/5 transition-all text-slate-700 font-medium resize-none"
                                            required
                                        />
                                        <MapPin className="absolute right-5 top-6 text-pink-300 w-5 h-5 group-focus-within:text-brand-pink transition-colors" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-5 animate-in slide-in-from-right fade-in duration-300">
                                {/* Step 2 Content */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-brand-dark-pink uppercase tracking-widest ml-1">Years in Biz</label>
                                        <div className="relative group">
                                            <input
                                                type="number"
                                                name="yearsInBusiness"
                                                value={formData.yearsInBusiness}
                                                onChange={handleInputChange}
                                                placeholder="ex. 5"
                                                className="w-full px-4 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-brand-pink/30 focus:outline-none focus:ring-4 focus:ring-brand-pink/5 transition-all text-slate-700 font-medium"
                                                required
                                            />
                                            <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-300 w-4 h-4 group-focus-within:text-brand-pink transition-colors" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-brand-dark-pink uppercase tracking-widest ml-1">Events Managed</label>
                                        <div className="relative group">
                                            <input
                                                type="number"
                                                name="eventsManaged"
                                                value={formData.eventsManaged}
                                                onChange={handleInputChange}
                                                placeholder="ex. 100+"
                                                className="w-full px-4 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-brand-pink/30 focus:outline-none focus:ring-4 focus:ring-brand-pink/5 transition-all text-slate-700 font-medium"
                                                required
                                            />
                                            <Award className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-300 w-4 h-4 group-focus-within:text-brand-pink transition-colors" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-brand-dark-pink uppercase tracking-widest ml-1">Instagram Link <span className="text-slate-400 font-normal normal-case tracking-normal">(Optional)</span></label>
                                    <div className="relative group">
                                        <input
                                            type="url"
                                            name="instagramLink"
                                            value={formData.instagramLink}
                                            onChange={handleInputChange}
                                            placeholder="https://instagram.com/..."
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-brand-pink/30 focus:outline-none focus:ring-4 focus:ring-brand-pink/5 transition-all text-slate-700 font-medium"
                                        />
                                        <Instagram className="absolute right-5 top-1/2 -translate-y-1/2 text-pink-300 w-5 h-5 group-focus-within:text-brand-pink transition-colors" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-brand-dark-pink uppercase tracking-widest ml-1">Website Link <span className="text-slate-400 font-normal normal-case tracking-normal">(Optional)</span></label>
                                    <div className="relative group">
                                        <input
                                            type="url"
                                            name="websiteLink"
                                            value={formData.websiteLink}
                                            onChange={handleInputChange}
                                            placeholder="https://yourwebsite.com"
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-brand-pink/30 focus:outline-none focus:ring-4 focus:ring-brand-pink/5 transition-all text-slate-700 font-medium"
                                        />
                                        <Globe className="absolute right-5 top-1/2 -translate-y-1/2 text-pink-300 w-5 h-5 group-focus-within:text-brand-pink transition-colors" />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3 pt-2">
                            {step === 2 && (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="px-6 py-4 rounded-full bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-colors"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                            )}
                            <button
                                type="submit"
                                className="btn-premium flex-1 py-4 text-xs uppercase tracking-[3px] font-black shadow-xl active:scale-95 group flex items-center justify-center gap-2"
                            >
                                {step === 1 ? 'Next Step' : 'Complete Registration'}
                                {step === 1 && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Already a Partner?
                            <Link to="/vendor/login" className="text-brand-dark-pink ml-2 hover:text-brand-pink transition-colors font-black">
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

export default VendorSignup;
