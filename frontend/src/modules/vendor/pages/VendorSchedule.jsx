import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Menu,
    Bell,
    ChevronLeft,
    ChevronRight,
    Plus,
    Trash2,
    Clock,
    MapPin,
    X,
    Calendar as CalendarIcon,
    BarChart3,
    TrendingUp
} from 'lucide-react';

const VendorSchedule = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date(2026, 0, 10)); // Default Jan 10
    const [viewDate, setViewDate] = useState(new Date(2026, 0, 1));
    const [showAddModal, setShowAddModal] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', time: '10:00 AM', location: '', type: 'Wedding' });

    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const daysArr = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const year = viewDate.getFullYear();
    const monthIndex = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, monthIndex);
    const firstDay = getFirstDayOfMonth(year, monthIndex);

    // Initial mock events
    const [schedules, setSchedules] = useState([
        { id: 1, day: 11, month: 0, title: 'Wedding Shoot', time: '10:30 am', location: 'Gachibowli' },
        { id: 2, day: 11, month: 0, title: 'Consultation', time: '3:30 pm', location: 'Banjara Hills' },
        { id: 3, day: 17, month: 0, title: 'Engagement Ceremony', time: '8:30 am', location: 'Secunderabad' },
        { id: 4, day: 25, month: 0, title: 'Corporate Event', time: '9:30 pm', location: 'Hi-Tech City' },
    ]);

    const handleAddEvent = (e) => {
        e.preventDefault();
        const event = {
            id: Date.now(),
            ...newEvent,
            day: selectedDate.getDate(),
            month: selectedDate.getMonth(),
        };
        setSchedules([...schedules, event]);
        setShowAddModal(false);
        setNewEvent({ title: '', time: '10:00 AM', location: '', type: 'Wedding' });
    };

    const deleteEvent = (id) => {
        setSchedules(schedules.filter(s => s.id !== id));
    };

    // Filter events for the upcoming section (current month)
    const upcomingEvents = schedules
        .filter(s => s.month === monthIndex)
        .sort((a, b) => a.day - b.day);

    // Group events by day for rendering
    const groupedEvents = upcomingEvents.reduce((acc, event) => {
        if (!acc[event.day]) acc[event.day] = [];
        acc[event.day].push(event);
        return acc;
    }, {});

    // Graph Data Calculation
    const getWeekOfMonth = (day) => Math.ceil(day / 7);
    const weeklyData = [0, 0, 0, 0, 0]; // 5 weeks
    upcomingEvents.forEach(e => {
        const week = getWeekOfMonth(e.day);
        if (week <= 5) weeklyData[week - 1]++;
    });

    const maxBookings = Math.max(...weeklyData, 1);
    const weeks = ["WEEK 1", "WEEK 2", "WEEK 3", "WEEK 4", "WEEK 5"];

    return (
        <div className="min-h-screen bg-white font-sans flex flex-col max-w-[440px] mx-auto shadow-[0_0_50px_rgba(0,0,0,0.05)] border-x border-gray-50 relative overflow-x-hidden select-none">
            {/* Top Navigation */}
            <div className="px-6 py-8 flex justify-between items-center bg-white sticky top-0 z-50">

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-[#FF4D6D] hover:bg-pink-50 transition-all"
                    >
                        <Plus size={22} />
                    </button>
                    <Bell size={24} className="text-gray-800 cursor-pointer" />
                </div>
            </div>

            {/* Year Selection Navigation */}
            <div className="px-8 mb-6 flex items-center gap-6 group">
                <div className="flex items-center gap-2">
                    <h1 className="text-5xl font-black text-gray-900 leading-tight tracking-tighter cursor-default select-none">
                        {year}
                    </h1>
                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2">
                        <button
                            onClick={() => setViewDate(new Date(year + 1, monthIndex, 1))}
                            className="p-1 hover:bg-pink-50 rounded-md text-gray-400 hover:text-[#FF4D6D] transition-all active:scale-90"
                            title="Next Year"
                        >
                            <ChevronLeft size={18} className="rotate-90" />
                        </button>
                        <button
                            onClick={() => setViewDate(new Date(year - 1, monthIndex, 1))}
                            className="p-1 hover:bg-pink-50 rounded-md text-gray-400 hover:text-[#FF4D6D] transition-all active:scale-90"
                            title="Previous Year"
                        >
                            <ChevronRight size={18} className="rotate-90" />
                        </button>
                    </div>
                </div>
                <div className="h-10 w-[1.5px] bg-gray-100 rounded-full mx-2"></div>
                <div className="flex flex-col">
                    <p className="text-sm font-script text-[#FF4D6D] tracking-tight mt-1">Planner</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Annual Schedule</p>
                </div>
            </div>

            {/* Month Navigation */}
            <div className="px-8 mb-10 overflow-x-auto scrollbar-hide">
                <div className="flex gap-8 min-w-max">
                    {months.map((m, idx) => (
                        <div
                            key={m}
                            onClick={() => setViewDate(new Date(year, idx, 1))}
                            className="flex flex-col items-center cursor-pointer group"
                        >
                            <span className={`text-[13px] font-black tracking-widest ${monthIndex === idx ? 'text-gray-900' : 'text-gray-300'}`}>
                                {m}
                            </span>
                            {monthIndex === idx && (
                                <div className="w-6 h-1 bg-[#FF4D6D] rounded-full mt-2"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>



            {/* Calendar Grid */}
            <div className="px-6 flex-1 mb-10">
                {/* Days of Week */}
                <div className="grid grid-cols-7 mb-6">
                    {daysArr.map((d, i) => (
                        <div key={i} className="text-center text-[13px] font-black text-gray-400">
                            {d}
                        </div>
                    ))}
                </div>

                {/* Date Grid */}
                <div className="grid grid-cols-7 gap-y-4">
                    {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-10"></div>
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === monthIndex;
                        const hasEvents = schedules.some(s => s.day === day && s.month === monthIndex);

                        return (
                            <div
                                key={day}
                                onClick={() => setSelectedDate(new Date(year, monthIndex, day))}
                                className="h-10 flex items-center justify-center cursor-pointer relative"
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${isSelected ? 'bg-[#FF4D6D] text-white shadow-lg shadow-pink-200' :
                                    hasEvents ? 'bg-pink-50 text-[#FF4D6D]' : 'text-gray-800'
                                    }`}>
                                    {day}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Enhanced Booking Trends Section */}
            <div className="px-8 mb-12 animate-fade-in">
                <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] flex flex-col gap-10 relative overflow-hidden">
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF4D6D]/20 to-transparent"></div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-[#FF4D6D] to-[#FF8540] flex items-center justify-center text-white shadow-lg shadow-pink-100">
                                <BarChart3 size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-gray-900 leading-tight uppercase tracking-tight">Booking Trends</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Performance Metrics</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 px-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#FF4D6D] shadow-sm"></div>
                                <span className="text-[9px] font-black text-gray-500 uppercase tracking-wider">Busy</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-orange-400 shadow-sm"></div>
                                <span className="text-[9px] font-black text-gray-500 uppercase tracking-wider">Mid</span>
                            </div>
                        </div>
                    </div>

                    {/* Pro Graph Structure */}
                    <div className="relative h-56 mt-4 flex">
                        {/* Y-Axis with clearer markers */}
                        <div className="flex flex-col justify-between text-[9px] font-black text-gray-300 pr-6 pb-10 h-full border-r border-gray-50/50">
                            <span className="flex items-center gap-2">10 <div className="w-1.5 h-[1px] bg-gray-200"></div></span>
                            <span className="flex items-center gap-2">05 <div className="w-1.5 h-[1px] bg-gray-200"></div></span>
                            <span className="flex items-center gap-2">00 <div className="w-1.5 h-[1px] bg-gray-200"></div></span>
                        </div>

                        {/* Graph Content Area */}
                        <div className="flex-1 relative h-full flex items-end justify-between px-6 pb-10">
                            {/* Horizontal Grid Lines - Ultra Light */}
                            <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between pb-10 pointer-events-none">
                                <div className="w-full h-[1.5px] bg-gray-50/40"></div>
                                <div className="w-full h-[1.5px] bg-gray-50/40 border-dashed border-t border-gray-100/50"></div>
                                <div className="w-full h-[1px] bg-gray-100/30"></div>
                            </div>

                            {/* Actual Data Bars - Capsule Style */}
                            {weeklyData.map((count, idx) => {
                                const height = (count / (maxBookings || 1)) * 100;
                                const isPeak = count === maxBookings && count > 0;
                                const isMedium = count >= maxBookings * 0.5 && count > 0 && !isPeak;

                                let barColor = 'bg-gray-100';
                                let shadowColor = 'shadow-transparent';
                                if (isPeak) {
                                    barColor = 'bg-[#FF4D6D]';
                                    shadowColor = 'shadow-pink-200';
                                } else if (isMedium) {
                                    barColor = 'bg-orange-400';
                                    shadowColor = 'shadow-orange-100';
                                }

                                return (
                                    <div key={idx} className="relative z-10 flex-col flex items-center group cursor-pointer h-full justify-end" style={{ width: '12%' }}>
                                        {/* Premium Floating Tooltip */}
                                        <div className="absolute -top-10 bg-gray-900 text-white text-[9px] font-black px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all z-20 whitespace-nowrap shadow-2xl scale-75 group-hover:scale-100 origin-bottom">
                                            {count} Events
                                        </div>

                                        {/* Capsule Bar Structure */}
                                        <div className="w-full relative flex flex-col items-center justify-end h-full">
                                            <div
                                                className={`w-full ${barColor} rounded-full transition-all duration-700 shadow-lg ${shadowColor} relative overflow-hidden group-hover:scale-x-110`}
                                                style={{ height: `${Math.max(height, 8)}%` }}
                                            >
                                                {/* Glossy Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-black/10"></div>
                                                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent"></div>
                                            </div>
                                        </div>

                                        {/* X-Axis Vertical Label */}
                                        <span className={`absolute -bottom-8 text-[9px] font-black uppercase tracking-tighter transition-colors ${isPeak ? 'text-[#FF4D6D]' : 'text-gray-400'}`}>
                                            Wk {idx + 1}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Reimagined Footer Stats */}
                    <div className="pt-10 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-sm">
                                <TrendingUp size={22} />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1.5">Efficiency</p>
                                <p className="text-xl font-black text-gray-900">{upcomingEvents.length} <span className="text-[10px] text-gray-400">Total</span></p>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-[9px] font-black text-[#FF4D6D] uppercase tracking-[0.2em] leading-none mb-2">Peak Period</p>
                            <p className="text-lg font-black text-gray-900 tracking-tight">
                                {maxBookings > 0 ? `Week ${weeklyData.indexOf(maxBookings) + 1}` : 'None'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Daily Agenda Bottom Card (Focused on Selected Date) */}
            <div className="bg-[#FF4D6D] rounded-t-[3rem] px-8 pt-10 pb-20 shadow-2xl relative min-h-[400px] animate-slide-up">
                <div className="text-center mb-10">
                    <h3 className="text-white text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mb-2">Daily Agenda</h3>
                    <h4 className="text-white text-2xl font-black uppercase tracking-tight">
                        {selectedDate.toLocaleDateString('default', { day: 'numeric', month: 'long' })}
                    </h4>
                </div>

                <div className="space-y-10">
                    {schedules.filter(s => s.day === selectedDate.getDate() && s.month === selectedDate.getMonth()).length > 0 ? (
                        schedules
                            .filter(s => s.day === selectedDate.getDate() && s.month === selectedDate.getMonth())
                            .map((event) => (
                                <div key={event.id} className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10 group relative overflow-hidden">
                                    {/* Decorative background number */}
                                    <div className="absolute -right-4 -bottom-6 text-white/5 text-8xl font-black select-none pointer-events-none">
                                        {event.time.split(':')[0]}
                                    </div>

                                    <div className="flex justify-between items-start relative z-10">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#FF4D6D] shadow-lg">
                                                    <Clock size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-white/60 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Timing</p>
                                                    <p className="text-white text-sm font-black">{event.time}</p>
                                                </div>
                                            </div>

                                            <h4 className="text-white text-2xl font-black leading-tight mb-6">{event.title}</h4>

                                            <div className="flex items-center gap-3 text-white/80">
                                                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                                                    <MapPin size={16} />
                                                </div>
                                                <p className="text-sm font-bold">{event.location}</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => deleteEvent(event.id)}
                                            className="w-12 h-12 rounded-2xl bg-white/1) flex items-center justify-center text-white/40 hover:text-white hover:bg-white/20 transition-all active:scale-90"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-[3rem] border border-dashed border-white/20">
                            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-white/20 mb-6">
                                <CalendarIcon size={40} />
                            </div>
                            <p className="text-white/60 text-[11px] font-black uppercase tracking-[0.2em] text-center">
                                No Events Scheduled<br />for this day
                            </p>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="mt-8 bg-white text-[#FF4D6D] px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                            >
                                + Add Event
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Event Modal (Themed) */}
            {showAddModal && (
                <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-md z-[100] flex items-end justify-center">
                    <div className="bg-white w-full rounded-t-[3rem] p-10 animate-slide-up shadow-2xl">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900">Add Event</h3>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                                    {selectedDate.toLocaleDateString('default', { day: 'numeric', month: 'long' })}
                                </p>
                            </div>
                            <button onClick={() => setShowAddModal(false)} className="w-11 h-11 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddEvent} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Client Name / Event Title</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#FF4D6D]/10 outline-none"
                                    placeholder="Wedding Shoot - Rahul"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Time</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#FF4D6D]/10 outline-none"
                                        placeholder="10:00 AM"
                                        value={newEvent.time}
                                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest pl-2">Location</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#FF4D6D]/10 outline-none"
                                        placeholder="Gachibowli"
                                        value={newEvent.location}
                                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                                    />
                                </div>
                            </div>
                            <button className="w-full bg-[#FF4D6D] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-pink-100 mt-4 active:scale-95 transition-all">
                                Create Booking
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VendorSchedule;
