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
    Calendar as CalendarIcon
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

    return (
        <div className="min-h-screen bg-white font-sans flex flex-col overflow-hidden select-none">
            {/* Top Navigation */}
            <div className="px-6 py-8 flex justify-between items-center bg-white sticky top-0 z-50">
                <Menu size={24} className="text-gray-800 cursor-pointer" onClick={() => navigate(-1)} />
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

            {/* Year Display */}
            <div className="px-8 mb-6">
                <h1 className="text-5xl font-black text-gray-900 leading-tight">{year}</h1>
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

            {/* Upcoming Events Bottom Card */}
            <div className="bg-[#FF4D6D] rounded-t-[3rem] px-8 pt-10 pb-20 shadow-2xl relative min-h-[400px]">
                <div className="text-center mb-10">
                    <h3 className="text-white text-[13px] font-black uppercase tracking-[0.3em]">Monthly Agenda</h3>
                </div>

                <div className="space-y-12">
                    {Object.keys(groupedEvents).length > 0 ? (
                        Object.keys(groupedEvents).map((day) => (
                            <div key={day} className="flex gap-6 relative">
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#FF4D6D] font-black text-sm z-10 shadow-lg">
                                        {day}
                                    </div>
                                    <div className="w-[1.5px] h-full bg-white/40 absolute top-10 border-dashed border-l border-white/50"></div>
                                </div>
                                <div className="flex-1 space-y-8">
                                    {groupedEvents[day].map((event) => (
                                        <div key={event.id} className="flex items-start justify-between group">
                                            <div>
                                                <h4 className="text-white text-lg font-black leading-none">{event.title}</h4>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <p className="text-white/70 text-[10px] font-bold">{event.time}</p>
                                                    <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                                                    <p className="text-white/70 text-[10px] font-bold">{event.location}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Trash2
                                                    size={18}
                                                    className="text-white/60 cursor-pointer hover:text-white transition-colors"
                                                    onClick={() => deleteEvent(event.id)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10">
                            <CalendarIcon size={40} className="text-white/20 mb-4" />
                            <p className="text-white/60 text-xs font-bold uppercase tracking-widest">No Events Scheduled</p>
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
