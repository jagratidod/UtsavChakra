import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmergencyAlerts } from '../../../utils/emergencyStore';
import Logo from '../../../assets/logo/utsavchakralogo.png';
import LanguageSelector from '../../../components/ui/LanguageSelector';
import {
    Bell,
    Home,
    MessageCircle,
    Calendar,
    User,
    Users,
    PlusSquare,
    Camera,
    Newspaper,
    MessageSquare,
    BookOpen,
    MapPin,
    Folder,
    FileText,
    UserPlus,
    Search,
    Sparkles,
    AlertTriangle,
    Zap,
    Navigation
} from 'lucide-react';
import EmergencySupport, { IncomingAlert } from '../components/EmergencySupport';

const ServiceIcon = ({ icon: Icon, label, onClick }) => (
    <div className="flex flex-col items-center justify-center space-y-3 group cursor-pointer" onClick={onClick}>
        <div className="w-14 h-14 bg-white rounded-[1.5rem] flex items-center justify-center text-[#2D328C] shadow-[0_10px_25px_rgba(0,0,0,0.03)] border border-gray-50 group-hover:scale-110 group-hover:bg-[#2D328C] group-hover:text-white group-hover:shadow-blue-200 transition-all duration-500 relative overflow-hidden animate-tilt">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Icon size={20} strokeWidth={2.5} />
        </div>
        <span className="text-[8px] font-black text-gray-400 text-center uppercase tracking-[0.2em] leading-tight px-1 group-hover:text-[#2D328C] transition-colors italic">
            {label}
        </span>
    </div>
);

const StatCard = ({ label, value, icon: Icon, colorClass, trend }) => (
    <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col space-y-4 flex-1 min-w-[140px] relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-gray-50 rounded-full blur-2xl group-hover:bg-blue-50 transition-colors"></div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass} shadow-sm relative z-10`}>
            <Icon size={18} />
        </div>
        <div className="relative z-10">
            <div className="text-2xl font-black text-[#1E226A] leading-none tracking-tighter italic">{value}</div>
            <div className="text-[9px] font-black text-gray-300 uppercase mt-2 tracking-[0.2em]">{label}</div>
        </div>
        {trend && (
            <div className="text-[8px] font-black text-emerald-500 bg-emerald-50/50 self-start px-2 py-1 rounded-lg border border-emerald-100 uppercase tracking-widest relative z-10">
                +{trend}% Growth
            </div>
        )}
    </div>
);

const VendorDashboard = () => {
    const navigate = useNavigate();
    const [emergencyAlerts, setEmergencyAlerts] = useState([]);

    useEffect(() => {
        const loadAlerts = () => {
            const alerts = getEmergencyAlerts();
            if (alerts.length === 0) {
                setEmergencyAlerts([
                    {
                        id: 'sos-1',
                        requesterName: 'Priya Sharma (Customer)',
                        item: 'Extra Catering for 50',
                        quantity: '50 Plates',
                        location: 'Banjara Hills, Hyderabad',
                        deadline: 'Required in 1 hour',
                        budget: '₹12000',
                        notes: 'Unexpected guest increase. Need premium veg snacks and starters immediately.'
                    }
                ]);
            } else {
                setEmergencyAlerts(alerts);
            }
        };

        loadAlerts();
        const interval = setInterval(loadAlerts, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans pb-32 max-w-[440px] mx-auto shadow-[0_0_50px_rgba(0,0,0,0.05)] border-x border-gray-50 relative overflow-x-hidden">
            {/* Boutique Header */}
            <div className="bg-[#2D328C] px-6 pt-12 pb-20 rounded-b-[2.5rem] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-400/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

                <div className="flex justify-between items-center relative z-10">
                    <div className="h-9 brightness-0 invert opacity-90">
                        <img src={Logo} alt="Utsav Chakra" className="h-full w-auto object-contain" />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="scale-75 origin-right"><LanguageSelector /></div>
                        <button
                            onClick={() => navigate('/vendor/notifications')}
                            className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl relative flex items-center justify-center text-white border border-white/10 active:scale-90 transition-all font-black"
                        >
                            <Bell size={18} />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-[#2D328C]"></span>
                        </button>
                    </div>
                </div>

                <div className="mt-10 relative z-10">
                    <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] mb-2 block italic">Partner Portal</span>
                    <h1 className="text-xl font-black text-white uppercase tracking-widest italic leading-none">Vendor Console</h1>
                </div>
            </div>

            <div className="px-5 -mt-10 pt-4 space-y-12 z-10 relative">
                {/* Main Actions */}
                <div className="grid grid-cols-2 gap-5 px-1">
                    <div
                        onClick={() => navigate('/vendor/portfolio')}
                        className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-blue-900/5 group cursor-pointer border border-gray-50 active:scale-95 transition-all text-center"
                    >
                        <div className="w-20 h-20 mx-auto mb-4 transition-transform duration-500 group-hover:scale-110">
                            <img src="/src/assets/vendor icons/photos.png" alt="" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[10px] font-black text-[#1E226A] uppercase tracking-[0.2em] italic">Portfolio</span>
                    </div>

                    <div
                        onClick={() => navigate('/vendor/schedule')}
                        className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-blue-900/5 group cursor-pointer border border-gray-50 active:scale-95 transition-all text-center"
                    >
                        <div className="w-20 h-20 mx-auto mb-4 transition-transform duration-500 group-hover:scale-110">
                            <img src="/src/assets/vendor icons/calender-removebg-preview.png" alt="" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[10px] font-black text-[#1E226A] uppercase tracking-[0.2em] italic">Timeline</span>
                    </div>
                </div>

                {/* Services Section */}
                <div>
                    <div className="flex items-center justify-between mb-8 px-2">
                        <h3 className="text-[#1E226A] font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 italic">
                            <Sparkles size={12} className="text-orange-400" /> Professional Lab
                        </h3>
                        <div className="h-[1px] flex-1 mx-4 bg-gray-100"></div>
                    </div>
                    <div className="grid grid-cols-4 gap-y-10">
                        <ServiceIcon icon={Users} label="Leads" />
                        <ServiceIcon icon={Search} label="Lookup" />
                        <ServiceIcon icon={PlusSquare} label="Deals" />
                        <ServiceIcon icon={Newspaper} label="Brief" />
                        <ServiceIcon icon={MessageSquare} label="Bids" />
                        <ServiceIcon icon={BookOpen} label="Guide" onClick={() => navigate('/vendor/messages')} />
                        <ServiceIcon icon={Calendar} label="Events" />
                        <ServiceIcon icon={MapPin} label="Spots" />
                        <ServiceIcon icon={Folder} label="Assets" />
                        <ServiceIcon icon={FileText} label="Drafts" />
                        <ServiceIcon icon={UserPlus} label="Crew" />
                        <ServiceIcon icon={Zap} label="Elite" />
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="flex gap-4 px-1">
                    <StatCard icon={Users} label="Leads Today" value="24" colorClass="bg-blue-50 text-[#2D328C]" trend="12" />
                    <StatCard icon={MessageCircle} label="Response" value="98%" colorClass="bg-orange-50 text-orange-500" />
                </div>

                {/* Emergency Section */}
                <div className="animate-in slide-in-from-bottom-5 duration-700 pb-20">
                    <div className="flex items-center justify-between mb-8 px-2">
                        <div onClick={() => navigate('/vendor/emergency-hub')} className="cursor-pointer group">
                            <h3 className="text-[#1E226A] font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 italic group-hover:text-red-500 transition-colors">
                                <AlertTriangle size={12} className="text-red-500" /> Crisis Support
                            </h3>
                            <p className="text-[7px] font-black text-gray-300 uppercase tracking-widest mt-1 italic pl-5">Near Mumbai Sector 4</p>
                        </div>
                        <div className="flex items-center gap-2 bg-red-50 px-2 py-1 rounded-lg">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
                            <span className="text-[8px] font-black text-red-500 uppercase tracking-widest italic">Live SOS</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {emergencyAlerts.slice(0, 1).map(alert => (
                            <div key={alert.id} className="relative active:scale-98 transition-all">
                                <IncomingAlert
                                    alert={alert}
                                    onRespond={(type, data) => console.log('Responded:', type, data)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Premium Bottom Navigation */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] px-6 pb-6 z-50">
                <div className="bg-[#2D328C] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] px-8 py-3 flex justify-between items-center border border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

                    <button className="flex flex-col items-center group relative z-10 transition-all">
                        <div className="bg-white text-[#2D328C] p-3 rounded-2xl shadow-xl shadow-blue-900/50 scale-110 border border-white/20 animate-boutique-bounce">
                            <Home size={22} strokeWidth={3} />
                        </div>
                    </button>

                    <button onClick={() => navigate('/vendor/messages')} className="flex flex-col items-center p-3 text-white/40 hover:text-white transition-all group relative z-10">
                        <MessageCircle size={22} strokeWidth={2.5} />
                    </button>

                    <button onClick={() => navigate('/vendor/schedule')} className="flex flex-col items-center p-3 text-white/40 hover:text-white transition-all group relative z-10">
                        <Calendar size={22} strokeWidth={2.5} />
                    </button>

                    <button onClick={() => navigate('/vendor/profile')} className="flex flex-col items-center p-3 text-white/40 hover:text-white transition-all group relative z-10">
                        <User size={22} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;
