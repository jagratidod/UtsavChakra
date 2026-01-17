import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronRight,
    Camera,
    User,
    Lock,
    Settings as SettingsIcon,
    HelpCircle,
    LogOut,
    UserCircle,
    X,
    ShieldCheck,
    Eye,
    EyeOff,
    Star,
    MapPin,
    Heart,
    Bell,
    Calendar,
    Users,
    Wallet,
    Globe,
    Building2,
    Clock,
    ChevronDown,
    Save,
    Check
} from 'lucide-react';
import MobileNav from '../components/MobileNav';

const LANGUAGES = ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Malayalam', 'Marathi', 'Bengali', 'Gujarati'];
const FUNCTIONS = ['Engagement', 'Haldi', 'Mehendi', 'Sangeet', 'Wedding Ceremony', 'Reception', 'Bachelor Party', 'Bridal Shower'];

const UserProfile = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [profileImage, setProfileImage] = useState(null);
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [showFunctionsDropdown, setShowFunctionsDropdown] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Event Details Form State
    const [eventDetails, setEventDetails] = useState({
        name: '',
        weddingDate: '',
        city: '',
        pincode: '',
        selectedFunctions: [],
        eventName: '',
        venueType: 'single',
        eventTime: '',
        budgetMin: '',
        budgetMax: '',
        languagePreference: '',
        guestCount: ''
    });

    // Load saved data from localStorage
    useEffect(() => {
        const savedProfile = localStorage.getItem('user_profile_image');
        const savedEventDetails = localStorage.getItem('user_event_details');
        if (savedProfile) setProfileImage(savedProfile);
        if (savedEventDetails) setEventDetails(JSON.parse(savedEventDetails));
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                localStorage.setItem('user_profile_image', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (field, value) => {
        setEventDetails(prev => ({ ...prev, [field]: value }));
    };

    const toggleFunction = (func) => {
        setEventDetails(prev => ({
            ...prev,
            selectedFunctions: prev.selectedFunctions.includes(func)
                ? prev.selectedFunctions.filter(f => f !== func)
                : [...prev.selectedFunctions, func]
        }));
    };

    const handleSave = () => {
        localStorage.setItem('user_event_details', JSON.stringify(eventDetails));
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
    };

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.clear();
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFCFD] flex flex-col pb-32 max-w-[440px] mx-auto shadow-2xl shadow-blue-900/10 border-x border-white relative font-sans">
            {/* Header */}
            <div className="bg-[#2D328C] px-5 pt-10 pb-24 rounded-b-[2.5rem] relative overflow-hidden shrink-0 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-400/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

                <div className="relative z-10 flex flex-col items-center">
                    {/* Profile Image */}
                    <div className="relative mb-4">
                        <div className="w-24 h-24 rounded-full border-4 border-white/20 overflow-hidden bg-white/10 shadow-2xl">
                            {profileImage ? (
                                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-[#1E226A] flex items-center justify-center text-white">
                                    <User size={40} />
                                </div>
                            )}
                        </div>
                        <label className="absolute bottom-0 right-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg border-2 border-white">
                            <Camera size={14} className="text-white" />
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        </label>
                    </div>
                    <h2 className="text-white font-black text-lg tracking-tight">{eventDetails.name || 'Your Name'}</h2>
                    <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-1">Event Planner</p>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="px-5 -mt-8 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 p-1.5 flex gap-1 border border-gray-100">
                    {[
                        { id: 'profile', label: 'Profile' },
                        { id: 'event', label: 'Event Details' },
                        { id: 'settings', label: 'Settings' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                                    ? 'bg-[#2D328C] text-white shadow-lg'
                                    : 'text-gray-400 hover:text-[#2D328C]'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 px-5 py-6 overflow-y-auto">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                        <div className="bg-white rounded-2xl p-5 shadow-lg shadow-blue-900/5 border border-gray-50">
                            <h3 className="text-[11px] font-black text-[#2D328C] uppercase tracking-widest mb-4 flex items-center gap-2">
                                <UserCircle size={14} /> Personal Info
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Full Name</label>
                                    <input
                                        type="text"
                                        value={eventDetails.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        placeholder="Enter your name"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-[13px] font-bold text-[#2D328C] focus:border-[#2D328C]/30 focus:ring-2 focus:ring-[#2D328C]/5 outline-none placeholder:text-gray-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { label: 'Bookings', val: '04', icon: Calendar, color: 'text-blue-500' },
                                { label: 'Wishlist', val: '12', icon: Heart, color: 'text-pink-500' },
                                { label: 'Reviews', val: '08', icon: Star, color: 'text-orange-400' }
                            ].map(stat => (
                                <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-lg shadow-blue-900/5 border border-gray-50 text-center">
                                    <stat.icon size={18} className={`${stat.color} mx-auto mb-2`} />
                                    <p className="text-lg font-black text-[#2D328C]">{stat.val}</p>
                                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Event Details Tab */}
                {activeTab === 'event' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                        {/* Wedding Date */}
                        <div className="bg-white rounded-2xl p-5 shadow-lg shadow-blue-900/5 border border-gray-50">
                            <h3 className="text-[11px] font-black text-[#2D328C] uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Calendar size={14} /> Wedding Date
                            </h3>
                            <input
                                type="date"
                                value={eventDetails.weddingDate}
                                onChange={(e) => handleInputChange('weddingDate', e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-[13px] font-bold text-[#2D328C] focus:border-[#2D328C]/30 focus:ring-2 focus:ring-[#2D328C]/5 outline-none"
                            />
                        </div>

                        {/* Location */}
                        <div className="bg-white rounded-2xl p-5 shadow-lg shadow-blue-900/5 border border-gray-50">
                            <h3 className="text-[11px] font-black text-[#2D328C] uppercase tracking-widest mb-4 flex items-center gap-2">
                                <MapPin size={14} /> Location
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">City</label>
                                    <input
                                        type="text"
                                        value={eventDetails.city}
                                        onChange={(e) => handleInputChange('city', e.target.value)}
                                        placeholder="City"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-[12px] font-bold text-[#2D328C] focus:border-[#2D328C]/30 outline-none placeholder:text-gray-300"
                                    />
                                </div>
                                <div>
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Pincode</label>
                                    <input
                                        type="text"
                                        value={eventDetails.pincode}
                                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                                        placeholder="500001"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-[12px] font-bold text-[#2D328C] focus:border-[#2D328C]/30 outline-none placeholder:text-gray-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Functions */}
                        <div className="bg-white rounded-2xl p-5 shadow-lg shadow-blue-900/5 border border-gray-50">
                            <h3 className="text-[11px] font-black text-[#2D328C] uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Heart size={14} /> Functions
                            </h3>
                            <div className="relative">
                                <button
                                    onClick={() => setShowFunctionsDropdown(!showFunctionsDropdown)}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 flex items-center justify-between text-[12px] font-bold"
                                >
                                    <span className={eventDetails.selectedFunctions.length > 0 ? 'text-[#2D328C]' : 'text-gray-300'}>
                                        {eventDetails.selectedFunctions.length > 0
                                            ? `${eventDetails.selectedFunctions.length} selected`
                                            : 'Select functions'}
                                    </span>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${showFunctionsDropdown ? 'rotate-180' : ''}`} />
                                </button>
                                {showFunctionsDropdown && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 py-2 max-h-[200px] overflow-y-auto">
                                        {FUNCTIONS.map(func => (
                                            <div
                                                key={func}
                                                onClick={() => toggleFunction(func)}
                                                className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-blue-50 transition-colors"
                                            >
                                                <span className="text-[12px] font-bold text-gray-600">{func}</span>
                                                {eventDetails.selectedFunctions.includes(func) && (
                                                    <Check size={14} className="text-[#2D328C]" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {eventDetails.selectedFunctions.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {eventDetails.selectedFunctions.map(func => (
                                        <span key={func} className="bg-[#2D328C]/10 text-[#2D328C] px-3 py-1 rounded-full text-[10px] font-bold">
                                            {func}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Event Name */}
                        <div className="bg-white rounded-2xl p-5 shadow-lg shadow-blue-900/5 border border-gray-50">
                            <h3 className="text-[11px] font-black text-[#2D328C] uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Star size={14} /> Event Name
                            </h3>
                            <input
                                type="text"
                                value={eventDetails.eventName}
                                onChange={(e) => handleInputChange('eventName', e.target.value)}
                                placeholder="e.g., Sharma-Gupta Wedding"
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-[13px] font-bold text-[#2D328C] focus:border-[#2D328C]/30 outline-none placeholder:text-gray-300"
                            />
                        </div>

                        {/* Venue Type */}
                        <div className="bg-white rounded-2xl p-5 shadow-lg shadow-blue-900/5 border border-gray-50">
                            <h3 className="text-[11px] font-black text-[#2D328C] uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Building2 size={14} /> Venue Type
                            </h3>
                            <div className="flex gap-3">
                                {['single', 'multiple'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => handleInputChange('venueType', type)}
                                        className={`flex-1 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${eventDetails.venueType === type
                                                ? 'bg-[#2D328C] text-white shadow-lg'
                                                : 'bg-gray-50 text-gray-400 border border-gray-100'
                                            }`}
                                    >
                                        {type === 'single' ? 'Single Location' : 'Multiple Locations'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Time */}
                        <div className="bg-white rounded-2xl p-5 shadow-lg shadow-blue-900/5 border border-gray-50">
                            <h3 className="text-[11px] font-black text-[#2D328C] uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Clock size={14} /> Event Time
                            </h3>
                            <input
                                type="time"
                                value={eventDetails.eventTime}
                                onChange={(e) => handleInputChange('eventTime', e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-[13px] font-bold text-[#2D328C] focus:border-[#2D328C]/30 outline-none"
                            />
                        </div>

                        {/* Budget Range */}
                        <div className="bg-white rounded-2xl p-5 shadow-lg shadow-blue-900/5 border border-gray-50">
                            <h3 className="text-[11px] font-black text-[#2D328C] uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Wallet size={14} /> Budget Range
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Min (₹)</label>
                                    <input
                                        type="number"
                                        value={eventDetails.budgetMin}
                                        onChange={(e) => handleInputChange('budgetMin', e.target.value)}
                                        placeholder="50,000"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-[12px] font-bold text-[#2D328C] focus:border-[#2D328C]/30 outline-none placeholder:text-gray-300"
                                    />
                                </div>
                                <div>
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 block">Max (₹)</label>
                                    <input
                                        type="number"
                                        value={eventDetails.budgetMax}
                                        onChange={(e) => handleInputChange('budgetMax', e.target.value)}
                                        placeholder="5,00,000"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-[12px] font-bold text-[#2D328C] focus:border-[#2D328C]/30 outline-none placeholder:text-gray-300"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Language Preference */}
                        <div className="bg-white rounded-2xl p-5 shadow-lg shadow-blue-900/5 border border-gray-50">
                            <h3 className="text-[11px] font-black text-[#2D328C] uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Globe size={14} /> Language Preference
                            </h3>
                            <div className="relative">
                                <button
                                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 flex items-center justify-between text-[12px] font-bold"
                                >
                                    <span className={eventDetails.languagePreference ? 'text-[#2D328C]' : 'text-gray-300'}>
                                        {eventDetails.languagePreference || 'Select language'}
                                    </span>
                                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
                                </button>
                                {showLanguageDropdown && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 py-2 max-h-[200px] overflow-y-auto">
                                        {LANGUAGES.map(lang => (
                                            <div
                                                key={lang}
                                                onClick={() => {
                                                    handleInputChange('languagePreference', lang);
                                                    setShowLanguageDropdown(false);
                                                }}
                                                className={`px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors flex items-center justify-between ${eventDetails.languagePreference === lang ? 'bg-[#2D328C]/5' : ''
                                                    }`}
                                            >
                                                <span className="text-[12px] font-bold text-gray-600">{lang}</span>
                                                {eventDetails.languagePreference === lang && (
                                                    <Check size={14} className="text-[#2D328C]" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Guest Count */}
                        <div className="bg-white rounded-2xl p-5 shadow-lg shadow-blue-900/5 border border-gray-50">
                            <h3 className="text-[11px] font-black text-[#2D328C] uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Users size={14} /> Guest List
                            </h3>
                            <input
                                type="number"
                                value={eventDetails.guestCount}
                                onChange={(e) => handleInputChange('guestCount', e.target.value)}
                                placeholder="Number of guests"
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-[13px] font-bold text-[#2D328C] focus:border-[#2D328C]/30 outline-none placeholder:text-gray-300"
                            />
                        </div>

                        {/* Save Button */}
                        <button
                            onClick={handleSave}
                            className={`w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${saveSuccess
                                    ? 'bg-green-500 text-white'
                                    : 'bg-[#2D328C] text-white shadow-xl shadow-blue-900/20'
                                }`}
                        >
                            {saveSuccess ? (
                                <>
                                    <Check size={16} /> Saved Successfully!
                                </>
                            ) : (
                                <>
                                    <Save size={16} /> Save Event Details
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div className="space-y-4 animate-in fade-in duration-300">
                        {[
                            { icon: Lock, label: 'Security & Password', onClick: () => alert('Security settings coming soon!') },
                            { icon: Bell, label: 'Notifications', onClick: () => alert('Notification settings coming soon!') },
                            { icon: SettingsIcon, label: 'Preferences', onClick: () => navigate('/user/preferences') },
                            { icon: HelpCircle, label: 'Help & Support', onClick: () => alert('Contact: support@utsavchakra.com') },
                        ].map(item => (
                            <button
                                key={item.label}
                                onClick={item.onClick}
                                className="w-full bg-white rounded-2xl p-4 shadow-lg shadow-blue-900/5 border border-gray-50 flex items-center justify-between group hover:border-[#2D328C]/20 transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#2D328C] group-hover:bg-[#2D328C]/10 transition-colors">
                                        <item.icon size={18} />
                                    </div>
                                    <span className="text-[12px] font-bold text-gray-700">{item.label}</span>
                                </div>
                                <ChevronRight size={18} className="text-gray-300 group-hover:text-[#2D328C] transition-colors" />
                            </button>
                        ))}

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-50 rounded-2xl p-4 border border-red-100 flex items-center justify-center gap-2 text-red-500 hover:bg-red-100 transition-all"
                        >
                            <LogOut size={18} />
                            <span className="text-[12px] font-black uppercase tracking-widest">Logout</span>
                        </button>
                    </div>
                )}
            </div>

            <MobileNav />
        </div>
    );
};

export default UserProfile;
