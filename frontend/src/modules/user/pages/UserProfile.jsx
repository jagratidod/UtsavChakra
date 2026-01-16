import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    Camera,
    User,
    Lock,
    Settings,
    HelpCircle,
    LogOut,
    UserCircle,
    Home,
    Heart,
    Search,
    X,
    CheckCircle2,
    ShieldCheck,
    Upload,
    Eye,
    EyeOff,
    Star
} from 'lucide-react';

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
        alert("Password updated successfully!");
        setIsPasswordModalOpen(false);
        setPasswords({ current: '', new: '', confirm: '' });
    };

    const handleAadharUpload = (e) => {
        e.preventDefault();
        if (!aadharImage) return alert("Please select a file!");
        setUser(prev => ({ ...prev, aadharStatus: 'Verification Pending' }));
        setIsAadharModalOpen(false);
        alert("Aadhar uploaded for verification!");
    };

    const menuItems = [
        {
            icon: <UserCircle size={22} />,
            label: 'Account Information',
            onClick: () => {
                setTempUser({ ...user });
                setIsEditModalOpen(true);
            }
        },
        {
            icon: <Lock size={22} />,
            label: 'Password',
            onClick: () => setIsPasswordModalOpen(true)
        },
        {
            icon: <ShieldCheck size={22} />,
            label: 'Aadhar Verification',
            status: user.aadharStatus,
            onClick: () => setIsAadharModalOpen(true)
        },
        {
            icon: <Star size={22} />,
            label: 'Write a Review',
            onClick: () => navigate('/user/write-review')
        },
        { icon: <Settings size={22} />, label: 'Settings', onClick: () => alert('Settings menu coming soon!') },
        { icon: <HelpCircle size={22} />, label: 'Help & Support', onClick: () => alert('Support ticket system coming soon!') },
    ];

    return (
        <div className="min-h-screen bg-[#FDFCFD] font-sans flex flex-col relative overflow-hidden">
            {/* Liquid Wave Header */}
            <div className="relative h-[250px] w-full overflow-hidden">
                <div
                    className="absolute inset-x-0 top-0 h-[380px] transition-all duration-700"
                    style={{
                        background: '#FF4D6D',
                        borderRadius: '0 0 50% 50% / 0 0 40% 40%',
                        transform: 'scaleX(1.5) translateY(-100px)',
                    }}
                ></div>

                {/* Back Button */}
                <div className="absolute top-12 left-6 z-20">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                    >
                        <ChevronLeft size={24} />
                        <span className="text-lg font-bold lowercase tracking-tight">profile</span>
                    </button>
                </div>
            </div>

            {/* Profile Center Section */}
            <div className="relative -mt-32 flex flex-col items-center z-10 px-8">
                <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-100 shadow-2xl overflow-hidden flex items-center justify-center">
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-pink-50 flex items-center justify-center text-pink-200">
                                <User size={60} />
                            </div>
                        )}
                    </div>
                    <label className="absolute bottom-1 right-1 bg-white p-2 rounded-full cursor-pointer shadow-lg hover:scale-110 active:scale-95 transition-all text-[#FF4D6D] border border-gray-50">
                        <Camera size={18} fill="currentColor" className="text-[#FF4D6D] fill-white" />
                        <input type="file" className="hidden" onChange={(e) => handleImageChange(e, 'profile')} accept="image/*" />
                    </label>
                </div>

                <div className="text-center mt-4 mb-8">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">{user.name}</h2>
                    <div className="flex items-center justify-center gap-2 mt-1">
                        <ShieldCheck size={14} className={user.aadharStatus === 'Verification Pending' ? 'text-orange-400' : 'text-gray-300'} />
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
                            {user.aadharStatus}
                        </p>
                    </div>
                </div>

                {/* Menu List */}
                <div className="w-full space-y-4 max-w-sm mb-32">
                    {menuItems.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={item.onClick}
                            className="w-full bg-white border border-gray-100 py-5 px-6 rounded-2xl flex items-center gap-5 group hover:border-[#FF4D6D]/30 hover:shadow-xl hover:shadow-gray-100 transition-all active:scale-[0.98]"
                        >
                            <div className="text-gray-300 group-hover:text-[#FF4D6D] transition-colors">
                                {item.icon}
                            </div>
                            <div className="flex-1 text-left">
                                <span className="text-[15px] font-bold text-gray-600 group-hover:text-gray-900 tracking-tight block">
                                    {item.label}
                                </span>
                                {item.status && (
                                    <span className={`text-[9px] font-black uppercase tracking-widest ${item.status === 'Verification Pending' ? 'text-orange-500' : 'text-gray-400'}`}>
                                        {item.status}
                                    </span>
                                )}
                            </div>
                        </button>
                    ))}

                    <button
                        onClick={() => navigate('/login')}
                        className="w-full bg-white border border-gray-100 py-5 px-6 rounded-2xl flex items-center gap-5 group hover:bg-red-50 hover:border-red-100 transition-all active:scale-[0.98]"
                    >
                        <div className="text-gray-300 group-hover:text-red-500 transition-colors">
                            <LogOut size={22} className="rotate-180" />
                        </div>
                        <span className="text-[15px] font-bold text-gray-400 group-hover:text-red-500 tracking-tight">
                            Log out
                        </span>
                    </button>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-6 left-6 right-6 z-[60]">
                <div className="bg-[#FF4D6D] rounded-[2rem] px-8 py-5 flex items-center justify-between shadow-2xl shadow-pink-200">
                    <button onClick={() => navigate('/user/dashboard')} className="text-white/60 hover:text-white transition-all transform hover:scale-110">
                        <Home size={24} />
                    </button>
                    <button className="text-white/60 hover:text-white transition-all transform hover:scale-110">
                        <Heart size={24} />
                    </button>
                    <button className="text-white/60 hover:text-white transition-all transform hover:scale-110">
                        <Search size={24} />
                    </button>
                    <button className="text-white transition-all transform scale-110">
                        <User size={24} fill="white" />
                    </button>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100] flex items-end justify-center">
                    <div className="bg-white w-full rounded-t-[3rem] p-10 animate-slide-up shadow-2xl overflow-hidden max-h-[90vh]">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 leading-none">Edit Profile</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Personal information</p>
                            </div>
                            <button onClick={() => setIsEditModalOpen(false)} className="w-11 h-11 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6 pb-10">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#FF4D6D]/10 outline-none"
                                    value={tempUser.name}
                                    onChange={(e) => setTempUser({ ...tempUser, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#FF4D6D]/10 outline-none"
                                    value={tempUser.email}
                                    onChange={(e) => setTempUser({ ...tempUser, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Phone Number</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#FF4D6D]/10 outline-none"
                                    value={tempUser.phone}
                                    onChange={(e) => setTempUser({ ...tempUser, phone: e.target.value })}
                                />
                            </div>
                            <button className="w-full bg-[#FF4D6D] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-pink-100 flex items-center justify-center gap-3 active:scale-95 transition-all mt-4">
                                Save Changes <CheckCircle2 size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Change Password Modal */}
            {isPasswordModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100] flex items-end justify-center">
                    <div className="bg-white w-full rounded-t-[3rem] p-10 animate-slide-up shadow-2xl max-h-[90vh]">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 leading-none">Security</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Change your password</p>
                            </div>
                            <button onClick={() => setIsPasswordModalOpen(false)} className="w-11 h-11 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handlePasswordChange} className="space-y-6 pb-10">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Current Password</label>
                                <div className="relative">
                                    <input
                                        required
                                        type={showPassword ? 'text' : 'password'}
                                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#FF4D6D]/10 outline-none"
                                        value={passwords.current}
                                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">New Password</label>
                                <input
                                    required
                                    type="password"
                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#FF4D6D]/10 outline-none"
                                    value={passwords.new}
                                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Confirm New Password</label>
                                <input
                                    required
                                    type="password"
                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#FF4D6D]/10 outline-none"
                                    value={passwords.confirm}
                                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                />
                            </div>
                            <button className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-gray-200 flex items-center justify-center gap-3 active:scale-95 transition-all mt-4">
                                Update Password <Lock size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Aadhar Upload Modal */}
            {isAadharModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100] flex items-end justify-center">
                    <div className="bg-white w-full rounded-t-[3rem] p-10 animate-slide-up shadow-2xl max-h-[90vh]">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 leading-none">KYC Upload</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Verify your identity</p>
                            </div>
                            <button onClick={() => setIsAadharModalOpen(false)} className="w-11 h-11 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-8 pb-10">
                            <label className="relative block w-full aspect-video rounded-[2.5rem] border-2 border-dashed border-gray-100 bg-gray-50 hover:bg-white hover:border-[#FF4D6D] transition-all overflow-hidden shadow-inner cursor-pointer group">
                                {aadharImage ? (
                                    <img src={aadharImage} alt="Aadhar Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 group-hover:text-[#FF4D6D]">
                                        <Upload size={40} className="mb-3" />
                                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">Upload Aadhar Card</span>
                                        <p className="text-[8px] font-bold mt-2">JPG, PNG OR PDF (MAX 5MB)</p>
                                    </div>
                                )}
                                <input type="file" className="hidden" onChange={(e) => handleImageChange(e, 'aadhar')} accept="image/*" />
                            </label>

                            <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100/50">
                                <div className="flex gap-4">
                                    <ShieldCheck className="text-orange-400 shrink-0" size={24} />
                                    <p className="text-[11px] font-bold text-orange-700 leading-relaxed uppercase tracking-tight">
                                        Verification helps in building trust with vendors and enables instant booking privileges on Utsav Chakra.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleAadharUpload}
                                className="w-full bg-[#FF4D6D] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-pink-100 flex items-center justify-center gap-3 active:scale-95 transition-all mt-4"
                            >
                                Submit for Verification <CheckCircle2 size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
