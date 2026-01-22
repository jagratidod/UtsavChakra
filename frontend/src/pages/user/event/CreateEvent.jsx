import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { Calendar, MapPin, IndianRupee, Heart, ArrowRight } from 'lucide-react';

const CreateEvent = () => {
    const navigate = useNavigate();
    const { createEvent } = useUser();
    
    const [formData, setFormData] = useState({
        date: '',
        location: '',
        budget: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createEvent(formData);
        navigate('/user/vendors');
    };

    return (
        <div className="min-h-screen w-full bg-white flex flex-col font-sans overflow-x-hidden relative">
            
            {/* Top Image Section */}
            <div className="w-full h-[40vh] md:h-[45vh] flex-shrink-0">
                <img
                    src="/illustrations/event select.jpg"
                    alt="Dream Event"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Section */}
            <div className="flex-1 px-6 py-8 relative z-10">
                 {/* Decorative Elements */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/10 rounded-bl-[100px] -mr-8 -mt-8 pointer-events-none" />
                 <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-pink/5 rounded-tr-[80px] -ml-8 -mb-8 pointer-events-none" />
                
                <div className="w-full max-w-lg mx-auto">
                    <div className="mb-8 text-center md:text-left">
                        <h1 className="text-4xl font-serif font-bold text-slate-800 mb-2">Start Your Journey</h1>
                        <p className="text-sm font-medium opacity-80 uppercase tracking-widest text-brand-pink">Tell us about your dream event</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 bg-white relative">
                    {/* Date Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Event Date</label>
                        <div className="relative group">
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-brand-pink/30 focus:outline-none focus:ring-4 focus:ring-brand-pink/5 transition-all text-slate-700 font-medium"
                                required
                            />
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300 w-5 h-5 group-focus-within:text-brand-pink transition-colors" />
                        </div>
                    </div>

                    {/* Location Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Location</label>
                        <div className="relative group">
                            <input
                                type="text"
                                name="location"
                                placeholder="City or Venue"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-brand-pink/30 focus:outline-none focus:ring-4 focus:ring-brand-pink/5 transition-all text-slate-700 font-medium"
                                required
                            />
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300 w-5 h-5 group-focus-within:text-brand-pink transition-colors" />
                        </div>
                    </div>

                    {/* Budget Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Estimated Budget</label>
                        <div className="relative group">
                            <input
                                type="number"
                                name="budget"
                                placeholder="5,00,000"
                                value={formData.budget}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-brand-pink/30 focus:outline-none focus:ring-4 focus:ring-brand-pink/5 transition-all text-slate-700 font-medium"
                                required
                            />
                            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300 w-5 h-5 group-focus-within:text-brand-pink transition-colors" />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-brand-pink text-white py-4 rounded-2xl font-bold uppercase tracking-wider shadow-lg shadow-brand-pink/30 hover:shadow-xl hover:shadow-brand-pink/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-8">
                        Create Event
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
