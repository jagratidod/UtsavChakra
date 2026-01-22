import React from 'react';
import { Search, Heart, MapPin, Calendar, Bell, Plus, Edit2, IndianRupee } from 'lucide-react';
import { useUser } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { user, event } = useUser();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-brand-light-pink pb-24">
            {/* Header */}
            <header className="bg-white px-6 pt-12 pb-6 rounded-b-[40px] shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-slate-400 text-sm">Hello,</p>
                        <h1 className="text-2xl font-serif font-bold text-slate-800">{user.name}</h1>
                    </div>
                    <div className="relative">
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-brand-pink rounded-full border border-white" />
                        <Bell className="w-6 h-6 text-slate-400" />
                    </div>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search for Venues, Decorators..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-brand-light-pink/50 border-none focus:ring-2 focus:ring-brand-pink/20 focus:outline-none placeholder:text-slate-400 text-sm"
                    />
                </div>
            </header>

            {/* Content Area */}
            <div className="px-6 py-8">
                
                {/* Event Status Card (Hero Card) */}
                <div className="bg-white rounded-[32px] p-2 shadow-lg shadow-brand-pink/5 mb-8">
                    {event ? (
                        // Case B: Event Created
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-serif font-bold text-slate-800">Your Big Day</h3>
                                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Wedding Planning</p>
                                </div>
                                <button onClick={() => navigate('/user/create-event')} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-brand-pink hover:text-white transition-colors">
                                    <Edit2 className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2">
                                 <div className="bg-brand-light-pink/30 rounded-2xl p-3 flex flex-col items-center justify-center gap-1 text-center">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-pink shadow-sm mb-1">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Date</span>
                                    <span className="text-xs font-bold text-slate-800">{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                                 </div>

                                 <div className="bg-brand-light-pink/30 rounded-2xl p-3 flex flex-col items-center justify-center gap-1 text-center">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-pink shadow-sm mb-1">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Venue</span>
                                    <span className="text-xs font-bold text-slate-800 truncate w-full">{event.location}</span>
                                 </div>

                                 <div className="bg-brand-light-pink/30 rounded-2xl p-3 flex flex-col items-center justify-center gap-1 text-center">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-pink shadow-sm mb-1">
                                        <IndianRupee className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Budget</span>
                                    <span className="text-xs font-bold text-slate-800">{(event.budget / 100000).toFixed(1)}L</span>
                                 </div>
                            </div>
                        </div>
                    ) : (
                        // Case A: No Event Created
                        <div className="relative overflow-hidden rounded-[28px] bg-slate-900 aspect-[2/1] group">
                             <img 
                                src="/illustrations/event select.jpg" 
                                alt="Couple" 
                                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                             
                             <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col items-start">
                                <h3 className="text-white font-serif text-xl font-bold mb-1 leading-tight">Plan Your<br/>Dream Wedding</h3>
                                <button 
                                    onClick={() => navigate('/user/create-event')}
                                    className="mt-3 bg-brand-pink text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-brand-pink/40 hover:bg-brand-dark-pink transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Create Event
                                </button>
                             </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-xl font-serif font-bold text-slate-800">Categories</h2>
                    <button className="text-brand-pink text-xs font-bold font-sans uppercase tracking-wider">View All</button>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-4 gap-4 mb-10">
                    {[
                        { icon: "🏛️", name: "Venues" },
                        { icon: "📸", name: "Photo" },
                        { icon: "💄", name: "Makeup" },
                        { icon: "🍽️", name: "Catering" }
                    ].map((cat, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-pink-50">
                                {cat.icon}
                            </div>
                            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight">{cat.name}</span>
                        </div>
                    ))}
                </div>

                {/* Featured Section */}
                <h2 className="text-xl font-serif font-bold text-slate-800 mb-6">Popular Venues</h2>
                <div className="space-y-6">
                    <div className="glass-card overflow-hidden">
                        <div className="h-48 relative">
                            <img
                                src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Venue"
                                className="w-full h-full object-cover"
                            />
                            <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                                <Heart className="w-5 h-5" />
                            </button>
                            <div className="absolute bottom-4 left-4 inline-flex px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-brand-pink uppercase">
                                Trending
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-serif font-bold text-lg">Grand Palace Resort</h3>
                                <div className="text-brand-pink font-bold">₹1.5L - 2.5L</div>
                            </div>
                            <div className="flex items-center text-slate-400 text-sm gap-1 mb-4">
                                <MapPin className="w-4 h-4" />
                                <span>Mumbai, Maharashtra</span>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-medium border-t border-pink-50 pt-4">
                                <span className="flex items-center gap-1 text-slate-500">
                                    <Calendar className="w-4 h-4 text-brand-pink" />
                                    Next Available: Oct 20
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-6 left-6 right-6 h-20 bg-slate-900/90 backdrop-blur-xl rounded-[32px] flex items-center justify-around px-4 shadow-2xl z-50">
                <button className="text-white bg-brand-pink p-3 rounded-2xl">
                    <Search className="w-6 h-6" />
                </button>
                <button className="text-slate-400 p-3">
                    <Calendar className="w-6 h-6" />
                </button>
                <button className="text-slate-400 p-3">
                    <Heart className="w-6 h-6" />
                </button>
            </nav>
        </div>
    );
};

export default Home;
