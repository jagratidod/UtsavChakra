import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmergencyAlerts } from '../../../utils/emergencyStore';
import {
    AlertTriangle,
    Zap,
    ChevronLeft,
    Navigation,
    Search,
    Filter,
    Radar,
    Globe
} from 'lucide-react';
import { IncomingAlert } from '../components/EmergencySupport';

const EmergencyHub = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
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
                    },
                    {
                        id: 'sos-2',
                        requesterName: 'Ankit Verma (Customer)',
                        item: 'Back-up Generator',
                        quantity: '1 Unit',
                        location: 'Gachibowli, Hyderabad',
                        deadline: 'Required in 30 mins',
                        budget: '₹5000',
                        notes: 'Main power failure at outdoor venue. Need silent generator ASAP.'
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

    const filteredAlerts = emergencyAlerts.filter(alert =>
        alert.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.requesterName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#FDFCFD] flex flex-col font-sans pb-10 max-w-[440px] mx-auto shadow-2xl shadow-gray-200/50 border-x border-gray-50 relative">
            {/* Premium App Bar */}
            <div className="bg-white px-6 py-6 border-b border-gray-100 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-4">

                    <div>
                        <h1 className="text-2xl font-script text-[#FF4D6D] tracking-tight leading-none">Emergency Hub</h1>
                        <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-1">Live SOS Network</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                        <span className="text-[9px] font-black text-red-600 uppercase tracking-widest">Active</span>
                    </div>
                </div>
            </div>

            <div className="px-6 py-8 space-y-8">
                {/* Stats / Radar View */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-3">
                            <Radar size={24} />
                        </div>
                        <div className="text-2xl font-black text-gray-900">25KM</div>
                        <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">Scan Radius</div>
                    </div>
                    <div className="bg-white p-5 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-3">
                            <Globe size={24} />
                        </div>
                        <div className="text-2xl font-black text-gray-900">64</div>
                        <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">Nearby Partners</div>
                    </div>
                </div>

                {/* Search & Filter */}
                <div className="flex gap-3">
                    <div className="flex-1 relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-red-500 transition-colors">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Filter requirements..."
                            className="w-full h-14 bg-white border border-gray-100 rounded-2xl pl-14 pr-6 text-sm font-bold text-gray-800 outline-none focus:ring-4 focus:ring-red-50 focus:border-red-200 transition-all placeholder:text-gray-300"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-red-500 transition-all">
                        <Filter size={20} />
                    </button>
                </div>

                {/* Alerts List */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Live Requirements</h3>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{filteredAlerts.length} Active</span>
                    </div>

                    {filteredAlerts.length > 0 ? (
                        filteredAlerts.map(alert => (
                            <IncomingAlert
                                key={alert.id}
                                alert={alert}
                                onRespond={(type, data) => console.log('Responded:', type, data)}
                            />
                        ))
                    ) : (
                        <div className="py-20 flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-4 text-3xl">📭</div>
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">No Alerts Found</h3>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-2">All partners are covered right now!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmergencyHub;
