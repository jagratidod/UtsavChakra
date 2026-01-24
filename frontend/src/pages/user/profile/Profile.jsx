import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { ChevronLeft, Save, Upload, User, Mail, Phone, MapPin, FileText, Check } from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();
    const { user, updateUser } = useUser();

    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
    });

    const [profileImage, setProfileImage] = useState(user.profileImage || null);
    const [aadharMethod, setAadharMethod] = useState(''); // 'file' or 'camera'
    const [aadharFile, setAadharFile] = useState(user.aadharCard || null);
    const [isSaved, setIsSaved] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAadharFile(url);
        }
    };

    const handleProfileImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProfileImage(url);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser({ ...formData, aadharCard: aadharFile, profileImage: profileImage });
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Cover Image & Header */}
            {/* Cover Image & Header */}
            <div className="relative h-64 w-full">
                <img
                    src="/illustrations/profile .jpg"
                    alt="Cover"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>

                <div className="absolute top-0 left-0 right-0 p-6 pt-8 flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors border border-white/20"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <h1 className="text-xl font-bold text-white shadow-sm">My Profile</h1>
                </div>
            </div>

            <div className="px-6 max-w-md mx-auto relative -mt-16 sm:-mt-20 z-10">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-32 h-32 bg-brand-light-pink rounded-full flex items-center justify-center mb-3 relative overflow-hidden group border-4 border-white shadow-2xl">
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-10 h-10 text-brand-pink" />
                        )}
                        <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Upload className="w-6 h-6 text-white" />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfileImageUpload}
                                className="hidden"
                            />
                        </label>
                        {!profileImage && (
                            <label className="absolute bottom-0 right-0 p-2 bg-brand-pink rounded-full text-white shadow-md cursor-pointer z-10">
                                <Upload className="w-4 h-4" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfileImageUpload}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">{formData.name || 'User Name'}</h2>
                    <p className="text-sm text-slate-400">Complete your profile to get better quotes</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Info */}
                    <div className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all"
                            />
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all"
                            />
                        </div>

                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone Number"
                                className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all"
                            />
                        </div>

                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Address"
                                className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-all"
                            />
                        </div>
                    </div>

                    {/* Aadhar Upload Section */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-brand-pink" />
                            Identity Verification
                        </h3>

                        {aadharFile ? (
                            <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video mb-4 group">
                                <img src={aadharFile} alt="Aadhar Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        type="button"
                                        onClick={() => setAadharFile(null)}
                                        className="bg-white text-red-500 px-4 py-2 rounded-lg text-sm font-bold"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-brand-pink/50 transition-colors cursor-pointer relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                                    <Upload className="w-6 h-6 text-slate-400" />
                                </div>
                                <h4 className="font-bold text-slate-700 text-sm">Upload Aadhar Card</h4>
                                <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                            </div>
                        )}
                        <p className="text-[10px] text-slate-400 mt-3 text-center">
                            Your ID will be shared with vendors only when you confirm a booking or request a quote.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isSaved}
                        className={`w-full py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${isSaved ? 'bg-green-500 shadow-green-500/30' : 'bg-brand-pink shadow-brand-pink/30 hover:bg-brand-dark-pink'
                            }`}
                    >
                        {isSaved ? (
                            <>
                                <Check className="w-5 h-5" />
                                Profile Saved!
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Save Profile
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
