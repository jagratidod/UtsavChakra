import React, { useState, useEffect } from 'react';
import adData from '../../../data/data.json';
import { Search, Heart, MapPin, Calendar, Bell, Plus, Edit2, IndianRupee, MessageCircle, Store, Newspaper, Home as HomeIcon, Globe, User } from 'lucide-react';
import { useUser } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { newsData } from '../../../data/newsData';

const Home = () => {
    const { user, event } = useUser();
    const navigate = useNavigate();
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const [showLang, setShowLang] = useState(false);
    const [lang, setLang] = useState('EN');

    const languages = [
        { code: 'EN', name: 'English' },
        { code: 'HI', name: 'Hindi' },
        { code: 'MR', name: 'Marathi' },
        { code: 'GU', name: 'Gujarati' },
        { code: 'BN', name: 'Bengali' },
        { code: 'TA', name: 'Tamil' },
        { code: 'TE', name: 'Telugu' },
        { code: 'KN', name: 'Kannada' },
        { code: 'ML', name: 'Malayalam' },
        { code: 'PA', name: 'Punjabi' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAdIndex((prevIndex) => (prevIndex + 1) % adData.advertisements.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-brand-light-pink pb-24">
            {/* Header */}
            <header className="bg-white px-6 pt-12 pb-6 rounded-b-[40px] shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-slate-400 text-sm">Hello,</p>
                        <h1 className="text-2xl font-serif font-bold text-slate-800">{user.name}</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Language Dropdown */}
                        <div className="relative z-50">
                            <button
                                onClick={() => setShowLang(!showLang)}
                                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors relative"
                            >
                                <Globe className="w-5 h-5" />
                                <span className="absolute -bottom-1 -right-1 text-[8px] font-bold bg-slate-200 px-1 rounded">{lang}</span>
                            </button>
                            {showLang && (
                                <div className="absolute top-12 right-0 bg-white rounded-xl shadow-xl border border-slate-100 p-2 min-w-[140px] animate-in fade-in slide-in-from-top-2 max-h-64 overflow-y-auto">
                                    {languages.map((l) => (
                                        <button
                                            key={l.code}
                                            onClick={() => { setLang(l.code); setShowLang(false) }}
                                            className={`w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-sm font-medium ${lang === l.code ? 'text-brand-pink bg-brand-pink/5' : 'text-slate-700'}`}
                                        >
                                            {l.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Notification */}
                        <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>

                        <button onClick={() => navigate('/user/profile')} className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
                            {user.profileImage ? (
                                <img
                                    src={user.profileImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User className="w-5 h-5 text-slate-600" />
                            )}
                        </button>
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

                {/* Advertisement Section */}
                <div className="mb-8 relative overflow-hidden rounded-2xl shadow-lg h-40">
                    {adData.advertisements.map((ad, index) => (
                        <div
                            key={ad.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentAdIndex ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <img
                                src={ad.image}
                                alt={ad.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-6">
                                <h3 className="text-white font-serif text-xl font-bold mb-1">{ad.title}</h3>
                                <p className="text-white/80 text-xs mb-3">{ad.description}</p>

                            </div>
                        </div>
                    ))}

                    {/* Dots Indicators */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                        {adData.advertisements.map((_, index) => (
                            <div
                                key={index}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === currentAdIndex ? 'bg-white w-3' : 'bg-white/50'}`}
                            />
                        ))}
                    </div>
                </div>

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
                                <h3 className="text-white font-serif text-xl font-bold mb-1 leading-tight">Plan Your<br />Dream Wedding</h3>
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
                    <button onClick={() => navigate('/user/categories')} className="text-brand-pink text-xs font-bold font-sans uppercase tracking-wider">View All</button>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-4 gap-4 mb-10">
                    {[
                        { icon: "🏛️", name: "Venues", target: "Decoration" }, // Mapping Venues to Decoration for now as per data, or keep as Venues if data exists
                        { icon: "📸", name: "Photo", target: "Photography & Videography" },
                        { icon: "💄", name: "Makeup", target: "Makeup Artist" },
                        { icon: "🍽️", name: "Catering", target: "Catering" }
                    ].map((cat, i) => (
                        <div
                            key={i}
                            onClick={() => navigate('/user/vendors', { state: { category: cat.target || cat.name } })}
                            className="flex flex-col items-center gap-2 cursor-pointer group"
                        >
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-pink-50 group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                                {cat.icon}
                            </div>
                            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-tight group-hover:text-brand-pink transition-colors">{cat.name}</span>
                        </div>
                    ))}
                </div>

                {/* Featured Section */}
                <h2 className="text-xl font-serif font-bold text-slate-800 mb-6">Popular Venues</h2>
                <div className="space-y-6 mb-10">
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

                {/* Latest News Section */}
                <div className="mb-6">
                    <div className="flex justify-between items-end mb-6">
                        <h2 className="text-xl font-serif font-bold text-slate-800">Latest News</h2>
                        <button
                            onClick={() => navigate('/user/news')}
                            className="text-brand-pink text-xs font-bold font-sans uppercase tracking-wider"
                        >
                            View More
                        </button>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">
                        {newsData.map((news) => (
                            <div
                                key={news.id}
                                onClick={() => navigate(`/user/news/${news.id}`)}
                                className="min-w-[280px] bg-white rounded-2xl p-3 shadow-sm snap-center border border-slate-100 flex flex-col cursor-pointer transition-transform active:scale-95"
                            >
                                <div className="h-40 rounded-xl overflow-hidden mb-3 relative group">
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>
                                <h3 className="font-serif font-bold text-slate-800 text-sm leading-snug mb-2 line-clamp-2">
                                    {news.title}
                                </h3>
                                <div className="mt-auto flex flex-col gap-0.5">
                                    <span className="text-[10px] font-semibold text-brand-pink uppercase tracking-tight">{news.source}</span>
                                    <span className="text-[10px] text-slate-400 font-medium">Wedding News • {news.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-6 left-6 right-6 h-20 bg-slate-900/90 backdrop-blur-xl rounded-[32px] flex items-center justify-between px-6 shadow-2xl z-50">
                <button
                    onClick={() => navigate('/user/vendors')}
                    className="text-slate-400 p-2 hover:text-white transition-colors"
                >
                    <Store className="w-6 h-6" />
                </button>
                <button
                    onClick={() => navigate('/user/planner')}
                    className="text-slate-400 p-2 hover:text-white transition-colors"
                >
                    <Calendar className="w-6 h-6" />
                </button>
                <button
                    onClick={() => navigate('/user/home')}
                    className="text-white bg-brand-pink p-2 rounded-2xl shadow-lg shadow-brand-pink/20"
                >
                    <HomeIcon className="w-6 h-6" />
                </button>
                <button
                    onClick={() => navigate('/user/news')}
                    className="text-slate-400 p-2 hover:text-white transition-colors"
                >
                    <Newspaper className="w-6 h-6" />
                </button>
                <button
                    onClick={() => navigate('/user/chat')}
                    className="text-slate-400 p-2 hover:text-white transition-colors"
                >
                    <MessageCircle className="w-6 h-6" />
                </button>
            </nav>
        </div>
    );
};

export default Home;
