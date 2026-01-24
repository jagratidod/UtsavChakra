import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Camera, Upload, Briefcase, MapPin, Users,
    IndianRupee, Award, Calendar, Instagram, Globe, Phone,
    Mail, Edit2, Save, X, Plus, Trash2, Image
} from 'lucide-react';

const VendorProfile = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');

    const [profile, setProfile] = useState({
        businessName: "Royal Events & Decorations",
        category: "Wedding Decoration",
        tagline: "Creating Magical Moments Since 2015",
        about: "We specialize in luxury wedding decorations and event styling. Our team of creative designers transforms venues into dreamlike settings that reflect your unique love story. With over 8 years of experience, we've decorated 500+ events across India.",
        experience: 8,
        teamSize: 15,
        eventsCompleted: 520,
        priceStarting: 50000,
        serviceAreas: ["Mumbai", "Pune", "Nashik", "Goa"],
        phone: "+91 9876543210",
        email: "royal@events.com",
        instagram: "https://instagram.com/royalevents",
        website: "https://royalevents.com",
        address: "Shop 12, Event Plaza, Andheri West, Mumbai - 400053"
    });

    const [portfolio, setPortfolio] = useState([
        { id: 1, url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400", category: "Wedding" },
        { id: 2, url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400", category: "Reception" },
        { id: 3, url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400", category: "Outdoor" },
        { id: 4, url: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400", category: "Mandap" },
        { id: 5, url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400", category: "Stage" },
        { id: 6, url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=400", category: "Floral" },
    ]);

    const handleInputChange = (field, value) => {
        setProfile({ ...profile, [field]: value });
    };

    const handleSave = () => {
        console.log("Saving profile:", profile);
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-8">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white shadow-sm px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/vendor/dashboard')}
                            className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-xl font-serif font-bold text-slate-800">Business Profile</h1>
                            <p className="text-xs text-slate-400">Manage your public profile</p>
                        </div>
                    </div>
                    {isEditing ? (
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-medium text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 rounded-xl bg-brand-pink text-white font-medium text-sm flex items-center gap-2"
                            >
                                <Save className="w-4 h-4" />
                                Save
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 rounded-xl bg-brand-pink text-white font-medium text-sm flex items-center gap-2"
                        >
                            <Edit2 className="w-4 h-4" />
                            Edit Profile
                        </button>
                    )}
                </div>
            </header>

            <main className="p-6">
                {/* Profile Header Card */}
                <div className="bg-gradient-to-br from-brand-pink to-brand-dark-pink rounded-2xl p-6 text-white shadow-xl shadow-brand-pink/20 mb-6">
                    <div className="flex items-start gap-4">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-4xl font-bold">
                                R
                            </div>
                            {isEditing && (
                                <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white text-brand-pink flex items-center justify-center shadow-lg">
                                    <Camera className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <div className="flex-1">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={profile.businessName}
                                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                                    className="w-full text-xl font-bold bg-white/10 rounded-lg px-3 py-1 mb-1 outline-none placeholder:text-white/50"
                                />
                            ) : (
                                <h2 className="text-xl font-bold mb-1">{profile.businessName}</h2>
                            )}
                            <p className="text-white/80 text-sm mb-2">{profile.category}</p>
                            <div className="flex items-center gap-4 text-xs">
                                <span className="flex items-center gap-1">
                                    <Award className="w-3 h-3" />
                                    {profile.experience} Years
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {profile.eventsCompleted}+ Events
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === 'profile' ? 'bg-brand-pink text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200'}`}
                    >
                        Profile Details
                    </button>
                    <button
                        onClick={() => setActiveTab('portfolio')}
                        className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === 'portfolio' ? 'bg-brand-pink text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200'}`}
                    >
                        Portfolio / Gallery
                    </button>
                </div>

                {activeTab === 'profile' ? (
                    <div className="space-y-4">
                        {/* About Section */}
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                            <h3 className="font-serif font-bold text-slate-800 mb-3 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-brand-pink" />
                                About Business
                            </h3>
                            {isEditing ? (
                                <textarea
                                    value={profile.about}
                                    onChange={(e) => handleInputChange('about', e.target.value)}
                                    rows="4"
                                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-pink outline-none resize-none text-sm"
                                />
                            ) : (
                                <p className="text-sm text-slate-600 leading-relaxed">{profile.about}</p>
                            )}
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                                <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-wider mb-2">
                                    <Users className="w-4 h-4" />
                                    Team Size
                                </div>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={profile.teamSize}
                                        onChange={(e) => handleInputChange('teamSize', e.target.value)}
                                        className="w-full p-2 rounded-lg bg-slate-50 border border-slate-200 text-xl font-bold text-slate-800"
                                    />
                                ) : (
                                    <p className="text-2xl font-bold text-slate-800">{profile.teamSize} Members</p>
                                )}
                            </div>
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                                <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-wider mb-2">
                                    <IndianRupee className="w-4 h-4" />
                                    Starting Price
                                </div>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={profile.priceStarting}
                                        onChange={(e) => handleInputChange('priceStarting', e.target.value)}
                                        className="w-full p-2 rounded-lg bg-slate-50 border border-slate-200 text-xl font-bold text-brand-pink"
                                    />
                                ) : (
                                    <p className="text-2xl font-bold text-brand-pink">₹{(profile.priceStarting / 1000).toFixed(0)}K+</p>
                                )}
                            </div>
                        </div>

                        {/* Service Areas */}
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                            <h3 className="font-serif font-bold text-slate-800 mb-3 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-brand-pink" />
                                Service Areas
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.serviceAreas.map((area, idx) => (
                                    <span key={idx} className="px-3 py-1.5 bg-slate-100 rounded-full text-sm font-medium text-slate-600">
                                        {area}
                                        {isEditing && (
                                            <button className="ml-2 text-red-400 hover:text-red-600">
                                                <X className="w-3 h-3 inline" />
                                            </button>
                                        )}
                                    </span>
                                ))}
                                {isEditing && (
                                    <button className="px-3 py-1.5 border-2 border-dashed border-slate-300 rounded-full text-sm font-medium text-slate-400 hover:border-brand-pink hover:text-brand-pink">
                                        <Plus className="w-3 h-3 inline mr-1" />
                                        Add Area
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                            <h3 className="font-serif font-bold text-slate-800 mb-4">Contact Information</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-brand-pink" />
                                    </div>
                                    {isEditing ? (
                                        <input type="tel" value={profile.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="flex-1 p-2 rounded-lg bg-slate-50 border border-slate-200 text-sm" />
                                    ) : (
                                        <span className="text-sm text-slate-600">{profile.phone}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-brand-pink" />
                                    </div>
                                    {isEditing ? (
                                        <input type="email" value={profile.email} onChange={(e) => handleInputChange('email', e.target.value)} className="flex-1 p-2 rounded-lg bg-slate-50 border border-slate-200 text-sm" />
                                    ) : (
                                        <span className="text-sm text-slate-600">{profile.email}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                                        <Instagram className="w-5 h-5 text-brand-pink" />
                                    </div>
                                    {isEditing ? (
                                        <input type="url" value={profile.instagram} onChange={(e) => handleInputChange('instagram', e.target.value)} className="flex-1 p-2 rounded-lg bg-slate-50 border border-slate-200 text-sm" />
                                    ) : (
                                        <a href={profile.instagram} target="_blank" rel="noreferrer" className="text-sm text-brand-pink hover:underline">{profile.instagram}</a>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                                        <Globe className="w-5 h-5 text-brand-pink" />
                                    </div>
                                    {isEditing ? (
                                        <input type="url" value={profile.website} onChange={(e) => handleInputChange('website', e.target.value)} className="flex-1 p-2 rounded-lg bg-slate-50 border border-slate-200 text-sm" />
                                    ) : (
                                        <a href={profile.website} target="_blank" rel="noreferrer" className="text-sm text-brand-pink hover:underline">{profile.website}</a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Portfolio Tab */
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-sm text-slate-500">{portfolio.length} images in your portfolio</p>
                            <button className="px-4 py-2 rounded-xl bg-brand-pink text-white font-medium text-sm flex items-center gap-2">
                                <Upload className="w-4 h-4" />
                                Upload
                            </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {portfolio.map((item) => (
                                <div key={item.id} className="relative group aspect-square rounded-2xl overflow-hidden bg-slate-200">
                                    <img
                                        src={item.url}
                                        alt={item.category}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                                            <span className="text-xs text-white font-medium">{item.category}</span>
                                            <button className="w-8 h-8 rounded-full bg-red-500/80 text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-brand-pink hover:text-brand-pink transition-colors">
                                <Image className="w-8 h-8" />
                                <span className="text-xs font-medium">Add Image</span>
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default VendorProfile;
