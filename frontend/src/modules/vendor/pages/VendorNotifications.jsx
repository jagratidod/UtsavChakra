import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Bell,
    Calendar,
    MessageCircle,
    Star,
    Zap,
    ChevronRight,
    Sparkles,
    Trash2
} from 'lucide-react';

const VendorNotifications = () => {
    const navigate = useNavigate();

    const notifications = [
        {
            id: 1,
            type: 'event',
            title: 'Event Reminder',
            message: 'Wedding of Rahul & Priya is scheduled in 5 days.',
            time: '2 hours ago',
            icon: Calendar,
            color: 'bg-pink-100 text-[#FF4D6D]'
        },
        {
            id: 2,
            type: 'message',
            title: 'New Query',
            message: 'Sravani sent you a message regarding Engagement decor.',
            time: '5 hours ago',
            icon: MessageCircle,
            color: 'bg-blue-100 text-blue-500'
        },
        {
            id: 3,
            type: 'review',
            title: 'New Review',
            message: 'You received a 5-star review from Aarav!',
            time: '1 day ago',
            icon: Star,
            color: 'bg-orange-100 text-orange-500'
        },
        {
            id: 4,
            type: 'system',
            title: 'Elite Status',
            message: 'Congratulations! You are now an Elite Vendor on Utsav Chakra.',
            time: '2 days ago',
            icon: Zap,
            color: 'bg-purple-100 text-purple-500'
        }
    ];

    return (
        <div className="min-h-screen bg-[#FDFCFD] flex flex-col font-sans">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-5 sticky top-0 z-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-800 hover:bg-gray-50 rounded-full transition-all">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-xl font-black text-gray-900 tracking-tight">Notifications</h1>
                </div>
                <button className="text-gray-400 hover:text-[#FF4D6D] p-2 transition-colors">
                    <Trash2 size={20} />
                </button>
            </div>

            <div className="p-6 space-y-6 pb-32">
                {/* Highlights Summary */}
                <div className="bg-gradient-to-br from-[#FF4D6D] to-[#FF8540] rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black tracking-tighter">Stay Updated</h2>
                            <p className="text-pink-100 text-[10px] font-black uppercase tracking-widest mt-1">You have {notifications.length} new alerts</p>
                        </div>
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                            <Sparkles size={28} />
                        </div>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    {notifications.map((notif) => {
                        const Icon = notif.icon;
                        return (
                            <div
                                key={notif.id}
                                className="bg-white p-5 rounded-[2rem] border border-gray-50 shadow-sm flex gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${notif.color}`}>
                                    <Icon size={24} />
                                </div>
                                <div className="flex-1 py-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-black text-gray-900 group-hover:text-[#FF4D6D] transition-colors">{notif.title}</h4>
                                        <span className="text-[9px] font-black text-gray-300 uppercase tracking-tight">{notif.time}</span>
                                    </div>
                                    <p className="text-xs font-medium text-gray-500 mt-1 leading-relaxed">
                                        {notif.message}
                                    </p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-[10px] font-black text-[#FF4D6D] uppercase tracking-widest">View Details</span>
                                        <ChevronRight size={14} className="text-gray-300 group-hover:text-[#FF4D6D] transition-colors" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* No more notifications */}
                <div className="py-10 text-center">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">No more notifications</p>
                </div>
            </div>
        </div>
    );
};

export default VendorNotifications;
