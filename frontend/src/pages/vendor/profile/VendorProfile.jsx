import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVendor } from '../../../context/VendorContext';
import {
    ArrowLeft, Camera, Upload, Briefcase, MapPin, Users,
    IndianRupee, Award, Calendar, Instagram, Globe, Phone,
    Mail, Edit2, Save, X, Plus, Trash2, Image, Link
} from 'lucide-react';

const VendorProfile = () => {
    const navigate = useNavigate();
    const {
        vendor,
        portfolio,
        updateVendorProfile,
        addPortfolioImage,
        removePortfolioImage
    } = useVendor();

    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');

    // Local state for editing form
    const [editForm, setEditForm] = useState(vendor);

    // Sync editForm when vendor changes (or on init)
    useEffect(() => {
        setEditForm(vendor);
    }, [vendor]);

    const handleInputChange = (field, value) => {
        setEditForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        updateVendorProfile(editForm);
        setIsEditing(false);
    };

    // Service Area Logic
    const [newArea, setNewArea] = useState('');
    const [showAreaInput, setShowAreaInput] = useState(false);

    const addServiceArea = () => {
        if (newArea.trim()) {
            const updatedAreas = [...editForm.serviceAreas, newArea.trim()];
            handleInputChange('serviceAreas', updatedAreas);
            setNewArea('');
            setShowAreaInput(false);
        }
    };

    const removeServiceArea = (areaToRemove) => {
        const updatedAreas = editForm.serviceAreas.filter(area => area !== areaToRemove);
        handleInputChange('serviceAreas', updatedAreas);
    };

    // Portfolio Logic
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [newImage, setNewImage] = useState({ url: '', category: 'Wedding' });

    const handleAddImage = () => {
        if (newImage.url) {
            addPortfolioImage(newImage.url, newImage.category);
            setNewImage({ url: '', category: 'Wedding' });
            setShowUploadModal(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-24">
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
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditForm(vendor); // Reset changes
                                }}
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
                                {editForm.businessName.charAt(0)}
                            </div>
                            {isEditing && (
                                <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white text-brand-pink flex items-center justify-center shadow-lg">
                                    <Camera className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <div className="flex-1 w-full overflow-hidden">
                            {isEditing ? (
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        value={editForm.businessName}
                                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                                        className="w-full text-xl font-bold bg-white/10 rounded-lg px-3 py-1 outline-none placeholder:text-white/50 border border-transparent focus:border-white/30"
                                        placeholder="Business Name"
                                    />
                                    <input
                                        type="text"
                                        value={editForm.category}
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        className="w-full text-sm bg-white/10 rounded-lg px-3 py-1 outline-none placeholder:text-white/50 border border-transparent focus:border-white/30"
                                        placeholder="Category"
                                    />
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-xl font-bold mb-1 truncate">{vendor.businessName}</h2>
                                    <p className="text-white/80 text-sm mb-2">{vendor.category}</p>
                                    <div className="flex items-center gap-4 text-xs">
                                        <span className="flex items-center gap-1">
                                            <Award className="w-3 h-3" />
                                            {vendor.experience} Years
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {vendor.eventsCompleted}+ Events
                                        </span>
                                    </div>
                                </>
                            )}
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
                                    value={editForm.about}
                                    onChange={(e) => handleInputChange('about', e.target.value)}
                                    rows="4"
                                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-pink outline-none resize-none text-sm"
                                    placeholder="Tell clients about your services..."
                                />
                            ) : (
                                <p className="text-sm text-slate-600 leading-relaxed">{vendor.about}</p>
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
                                        value={editForm.teamSize}
                                        onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value))}
                                        className="w-full p-2 rounded-lg bg-slate-50 border border-slate-200 text-xl font-bold text-slate-800 focus:border-brand-pink outline-none"
                                    />
                                ) : (
                                    <p className="text-2xl font-bold text-slate-800">{vendor.teamSize} Members</p>
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
                                        value={editForm.priceStarting}
                                        onChange={(e) => handleInputChange('priceStarting', parseInt(e.target.value))}
                                        className="w-full p-2 rounded-lg bg-slate-50 border border-slate-200 text-xl font-bold text-brand-pink focus:border-brand-pink outline-none"
                                    />
                                ) : (
                                    <p className="text-2xl font-bold text-brand-pink">₹{(vendor.priceStarting / 1000).toFixed(0)}K+</p>
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
                                {(isEditing ? editForm.serviceAreas : vendor.serviceAreas).map((area, idx) => (
                                    <span key={idx} className="px-3 py-1.5 bg-slate-100 rounded-full text-sm font-medium text-slate-600 flex items-center gap-2">
                                        {area}
                                        {isEditing && (
                                            <button
                                                onClick={() => removeServiceArea(area)}
                                                className="text-slate-400 hover:text-red-500"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        )}
                                    </span>
                                ))}
                                {isEditing && !showAreaInput && (
                                    <button
                                        onClick={() => setShowAreaInput(true)}
                                        className="px-3 py-1.5 border-2 border-dashed border-slate-300 rounded-full text-sm font-medium text-slate-400 hover:border-brand-pink hover:text-brand-pink transition-colors flex items-center gap-1"
                                    >
                                        <Plus className="w-3 h-3" />
                                        Add Area
                                    </button>
                                )}
                            </div>
                            {showAreaInput && (
                                <div className="mt-3 flex gap-2">
                                    <input
                                        type="text"
                                        value={newArea}
                                        onChange={(e) => setNewArea(e.target.value)}
                                        placeholder="Enter city or area..."
                                        className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-pink outline-none text-sm"
                                        onKeyPress={(e) => e.key === 'Enter' && addServiceArea()}
                                    />
                                    <button
                                        onClick={addServiceArea}
                                        className="px-4 py-2 bg-brand-pink text-white rounded-xl text-sm font-medium"
                                    >
                                        Add
                                    </button>
                                    <button
                                        onClick={() => setShowAreaInput(false)}
                                        className="px-3 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-medium"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
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
                                        <input
                                            type="tel"
                                            value={editForm.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className="flex-1 p-2 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:border-brand-pink outline-none"
                                            placeholder="Phone Number"
                                        />
                                    ) : (
                                        <span className="text-sm text-slate-600">{vendor.phone}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-brand-pink" />
                                    </div>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={editForm.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="flex-1 p-2 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:border-brand-pink outline-none"
                                            placeholder="Email Address"
                                        />
                                    ) : (
                                        <span className="text-sm text-slate-600">{vendor.email}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                                        <Instagram className="w-5 h-5 text-brand-pink" />
                                    </div>
                                    {isEditing ? (
                                        <input
                                            type="url"
                                            value={editForm.instagram}
                                            onChange={(e) => handleInputChange('instagram', e.target.value)}
                                            className="flex-1 p-2 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:border-brand-pink outline-none"
                                            placeholder="Instagram Profile URL"
                                        />
                                    ) : (
                                        <a href={vendor.instagram} target="_blank" rel="noreferrer" className="text-sm text-brand-pink hover:underline truncate">{vendor.instagram}</a>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                                        <Globe className="w-5 h-5 text-brand-pink" />
                                    </div>
                                    {isEditing ? (
                                        <input
                                            type="url"
                                            value={editForm.website}
                                            onChange={(e) => handleInputChange('website', e.target.value)}
                                            className="flex-1 p-2 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:border-brand-pink outline-none"
                                            placeholder="Website URL"
                                        />
                                    ) : (
                                        <a href={vendor.website} target="_blank" rel="noreferrer" className="text-sm text-brand-pink hover:underline truncate">{vendor.website}</a>
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
                            <button
                                onClick={() => setShowUploadModal(true)}
                                className="px-4 py-2 rounded-xl bg-brand-pink text-white font-medium text-sm flex items-center gap-2"
                            >
                                <Upload className="w-4 h-4" />
                                Add Photo
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
                                            <span className="text-xs text-white font-medium bg-black/30 px-2 py-1 rounded-full">{item.category}</span>
                                            <button
                                                onClick={() => removePortfolioImage(item.id)}
                                                className="w-8 h-8 rounded-full bg-red-500/80 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={() => setShowUploadModal(true)}
                                className="aspect-square rounded-2xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-brand-pink hover:text-brand-pink transition-colors"
                            >
                                <Image className="w-8 h-8" />
                                <span className="text-xs font-medium">Add Image</span>
                            </button>
                        </div>
                    </div>
                )}
            </main>

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
                    <div className="bg-white w-full max-w-sm rounded-2xl p-6 animate-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-serif font-bold text-slate-800">Add Portfolio Image</h3>
                            <button onClick={() => setShowUploadModal(false)}>
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Image URL</label>
                                <div className="relative">
                                    <Link className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <input
                                        type="url"
                                        value={newImage.url}
                                        onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:border-brand-pink outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Category</label>
                                <select
                                    value={newImage.category}
                                    onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:border-brand-pink outline-none"
                                >
                                    <option value="Wedding">Wedding</option>
                                    <option value="Reception">Reception</option>
                                    <option value="Haldi">Haldi</option>
                                    <option value="Mehndi">Mehndi</option>
                                    <option value="Decoration">Decoration</option>
                                    <option value="Catering">Catering</option>
                                </select>
                            </div>

                            <button
                                onClick={handleAddImage}
                                className="w-full py-3 rounded-xl bg-brand-pink text-white font-bold text-sm mt-2"
                            >
                                Add Image
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VendorProfile;
