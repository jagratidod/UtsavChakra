import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
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
    Upload,
    Eye,
    EyeOff,
    Star,
    Mail,
    MapPin,
    Heart,
    ClipboardList,
    Bell
} from 'lucide-react';
import MobileNav from '../components/MobileNav';

const UserProfile = () => {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isAadharModalOpen, setIsAadharModalOpen] = useState(false);

    const [user, setUser] = useState({
        name: 'Julliet Yirrah',
        email: 'julliet@example.com',
        phone: '+91 98765 43210',
        location: 'Mumbai, India',
        aadharStatus: 'Not Uploaded'
    });

    const [tempUser, setTempUser] = useState({ ...user });
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [aadharImage, setAadharImage] = useState(null);

    const handleImageChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'profile') setProfileImage(reader.result);
                else setAadharImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        setUser({ ...tempUser });
        setIsEditModalOpen(false);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) return alert("Passwords don't match!");
        alert("Password updated!");
        setIsPasswordModalOpen(false);
    };

    const stats = [
        { label: 'Bookings', val: '12', icon: ClipboardList, color: 'text-blue-500' },
        { label: 'Saved', val: '45', icon: Heart, color: 'text-[#FF4D6D]' },
        { label: 'Reviews', val: '08', icon: Star, color: 'text-orange-400' }
    ];

    const menuGroups = [
        {
            title: 'Account',
            items: [
                { icon: UserCircle, label: 'Information', onClick: () => { setTempUser({ ...user }); setIsEditModalOpen(true); } },
                { icon: ShieldCheck, label: 'KYC Status', status: user.aadharStatus, onClick: () => setIsAadharModalOpen(true) },
                { icon: SettingsIcon, label: 'Preferences', onClick: () => navigate('/user/preferences') },
            ]
        },
        {
            title: 'Settings',
            items: [
                { icon: Lock, label: 'Security', onClick: () => setIsPasswordModalOpen(true) },
                { icon: Bell, label: 'Notifications', onClick: () => alert('Notification settings coming soon!') },
                { icon: HelpCircle, label: 'Help & Support', onClick: () => alert('For help, contact support@utsavchakra.com') },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans flex flex-col pb-24 max-w-[440px] mx-auto shadow-[0_0_50px_rgba(0,0,0,0.05)] border-x border-gray-50 relative">
            {/* Minimal Header Banner */}
            <div className="bg-[#2D328C] px-5 pt-10 pb-20 rounded-b-[2.5rem] relative overflow-hidden shrink-0">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>

                <div className="relative z-10 flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <div className="bg-white/10 px-4 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic">PRO Account</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-[1.2rem] border-2 border-white/20 overflow-hidden bg-white/5 p-0.5">
                                {profileImage ? (
                                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-[1rem]" />
                                ) : (
                                    <div className="w-full h-full bg-[#1E226A] flex items-center justify-center text-white rounded-[1rem]">
                                        <User size={24} />
                                    </div>
                                )}
                            </div>
                            <label className="absolute -bottom-1 -right-1 bg-orange-500 text-white p-1.5 rounded-lg cursor-pointer border-2 border-[#2D328C]">
                                <Camera size={10} />
                                <input type="file" className="hidden" onChange={(e) => handleImageChange(e, 'profile')} accept="image/*" />
                            </label>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-white font-black text-[15px] tracking-tight uppercase leading-none">{user.name}</h2>
                            <div className="flex items-center gap-2 mt-2 opacity-50">
                                <Mail size={10} className="text-white" />
                                <span className="text-[8px] font-bold text-white uppercase tracking-widest">{user.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Compact Quick Stats */}
            <div className="px-5 -mt-8 relative z-20">
                <div className="bg-white rounded-[1.5rem] p-4 shadow-xl shadow-blue-900/5 grid grid-cols-3 border border-gray-100 divide-x divide-gray-50">
                    {stats.map((s, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-center group active:scale-95 transition-all">
                            <span className="text-xs font-black text-[#2D328C]">{s.val}</span>
                            <span className="text-[7px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lean Menu List */}
            <div className="px-5 py-8 space-y-8">
                {menuGroups.map((group, gIdx) => (
                    <div key={gIdx} className="space-y-3">
                        <h3 className="text-[8px] font-black text-[#1E226A] uppercase tracking-[0.2em] pl-1 opacity-20">{group.title}</h3>
                        <div className="bg-gray-50/50 rounded-[1.5rem] p-1.5 border border-gray-50/50">
                            {group.items.map((item, iIdx) => (
                                <button
                                    key={iIdx}
                                    onClick={item.onClick}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all group active:scale-[0.99]"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-gray-400 group-hover:text-[#2D328C] transition-colors border border-gray-100">
                                        <item.icon size={14} />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <span className="text-[11px] font-bold text-[#1E226A] uppercase tracking-tight">{item.label}</span>
                                        {item.status && (
                                            <span className={`text-[7px] font-black uppercase tracking-tighter mt-1 block ${item.status === 'Verified' ? 'text-emerald-500' : 'text-orange-400'}`}>
                                                {item.status}
                                            </span>
                                        )}
                                    </div>
                                    <ChevronRight size={14} className="text-gray-300 group-hover:translate-x-0.5 transition-all" />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Secure Logout Compact */}
                <button
                    onClick={() => navigate('/login')}
                    className="w-full border border-red-100 p-4 rounded-[1.5rem] flex items-center justify-between group active:scale-[0.98] transition-all bg-red-50/20"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-red-500 border border-red-50 shadow-sm">
                            <LogOut size={14} className="rotate-180" />
                        </div>
                        <span className="text-[11px] font-black text-red-600 uppercase tracking-widest">Logout Session</span>
                    </div>
                    <ChevronRight size={14} className="text-red-200" />
                </button>
            </div>

            {/* Compact Modals */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[200] flex items-end justify-center px-4 pb-4">
                    <div className="bg-white w-full max-w-[400px] rounded-[2rem] p-6 animate-in slide-in-from-bottom-5 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xs font-black text-[#1E226A] uppercase tracking-widest italic">Update Info</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400"><X size={16} /></button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            {['name', 'email', 'phone'].map((k) => (
                                <div key={k} className="space-y-1.5">
                                    <label className="text-[8px] font-black uppercase text-gray-300 tracking-[0.2em] pl-1">{k}</label>
                                    <input
                                        required
                                        className="w-full h-10 bg-gray-50 rounded-xl px-4 text-[11px] font-bold text-[#1E226A] border border-gray-100 focus:bg-white outline-none"
                                        value={tempUser[k]}
                                        onChange={(e) => setTempUser({ ...tempUser, [k]: e.target.value })}
                                    />
                                </div>
                            ))}
                            <button className="w-full bg-[#2D328C] text-white py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] mt-2 active:scale-95 transition-all">Confirm</button>
                        </form>
                    </div>
                </div>
            )}

            <MobileNav />
        </div>
    );
};

export default UserProfile;
