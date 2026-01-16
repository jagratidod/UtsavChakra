import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Menu,
    Bell,
    ChevronLeft,
    ChevronRight,
    Plus,
    Trash2,
    Clock,
    X,
    Calendar as CalendarIcon,
    Sparkles
} from 'lucide-react';

const UserSchedule = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [viewDate, setViewDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', time: '' });

    // Load events from localStorage
    useEffect(() => {
        const savedEvents = JSON.parse(localStorage.getItem('user_calendar_events') || '[]');
        setEvents(savedEvents);
    }, []);

    // Save events to localStorage
    useEffect(() => {
        localStorage.setItem('user_calendar_events', JSON.stringify(events));
    }, [events]);

    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const daysArr = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const year = viewDate.getFullYear();
    const monthIndex = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, monthIndex);
    const firstDay = getFirstDayOfMonth(year, monthIndex);

    const addEvent = () => {
        if (!newEvent.title || !newEvent.time) return;
        const eventToAdd = {
            id: Date.now(),
            date: selectedDate.toDateString(),
            day: selectedDate.getDate(),
            ...newEvent
        };
        setEvents([...events, eventToAdd]);
        setNewEvent({ title: '', time: '' });
        setIsModalOpen(false);
    };

    const deleteEvent = (id) => {
        setEvents(events.filter(e => e.id !== id));
    };

    // Filter events for the selected month to show in "Upcoming"
    const monthlyEvents = events
        .filter(e => {
            const eventDate = new Date(e.date);
            return eventDate.getMonth() === monthIndex && eventDate.getFullYear() === year;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Group events by day for display
    const groupedEvents = monthlyEvents.reduce((acc, event) => {
        if (!acc[event.day]) acc[event.day] = [];
        acc[event.day].push(event);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-white font-sans flex flex-col overflow-x-hidden select-none pb-20">
            {/* Top Navigation */}
            <div className="px-6 py-8 flex justify-between items-center bg-white sticky top-0 z-50">
                <div
                    onClick={() => navigate(-1)}
                    className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-800 cursor-pointer active:scale-90 transition-all"
                >
                    <ChevronLeft size={24} strokeWidth={2.5} />
                </div>
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-800 cursor-pointer relative">
                    <Bell size={24} />
                    <div className="absolute top-3 right-3 w-2 h-2 bg-[#FF4D6D] rounded-full border-2 border-white"></div>
                </div>
            </div>

            {/* Year Display */}
            <div className="px-8 mt-2 mb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-6xl font-black text-gray-900 leading-none tracking-tighter">{year}</h1>
                    <p className="text-[10px] font-black text-[#FF4D6D] uppercase tracking-[0.3em] mt-3">Event Planner</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewDate(new Date(year - 1, monthIndex, 1))}
                        className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-gray-900 transition-colors"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={() => setViewDate(new Date(year + 1, monthIndex, 1))}
                        className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-gray-900 transition-colors"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Month Navigation */}
            <div className="px-8 mb-8 overflow-x-auto scrollbar-hide">
                <div className="flex gap-8 min-w-max pb-4">
                    {months.map((m, idx) => (
                        <div
                            key={m}
                            onClick={() => setViewDate(new Date(year, idx, 1))}
                            className="flex flex-col items-center cursor-pointer group"
                        >
                            <span className={`text-sm font-black tracking-widest transition-all ${monthIndex === idx ? 'text-gray-900 scale-110' : 'text-gray-200 hover:text-gray-400'}`}>
                                {m}
                            </span>
                            {monthIndex === idx && (
                                <div className="w-6 h-1 bg-[#FF4D6D] rounded-full mt-2 animate-bounce"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="px-8 mb-10">
                <div className="grid grid-cols-7 mb-8">
                    {daysArr.map((d, i) => (
                        <div key={i} className="text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            {d}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-y-6">
                    {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-10"></div>
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === monthIndex && selectedDate.getFullYear() === year;
                        const hasEvents = events.some(e => {
                            const d = new Date(e.date);
                            return d.getDate() === day && d.getMonth() === monthIndex && d.getFullYear() === year;
                        });

                        return (
                            <div
                                key={day}
                                onClick={() => setSelectedDate(new Date(year, monthIndex, day))}
                                className="h-10 flex flex-col items-center justify-center cursor-pointer relative"
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all ${isSelected ? 'bg-[#FF4D6D] text-white shadow-xl shadow-pink-200 scale-110' : 'text-gray-800 hover:bg-pink-50'}`}>
                                    {day}
                                </div>
                                {hasEvents && !isSelected && (
                                    <div className="absolute bottom-[-4px] w-1 h-1 bg-[#FF4D6D] rounded-full"></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Upcoming Events Bottom Card */}
            <div className="flex-1 bg-[#FF4D6D] rounded-t-[3.5rem] px-8 pt-12 pb-12 shadow-[0_-20px_40px_rgba(255,77,109,0.2)] relative">
                <div className="flex items-center justify-between mb-12">
                    <h3 className="text-white text-[10px] font-black uppercase tracking-[0.5em]">Upcoming Schedule</h3>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#FF4D6D] shadow-xl active:scale-90 transition-all"
                    >
                        <Plus size={24} strokeWidth={3} />
                    </button>
                </div>

                <div className="space-y-12">
                    {Object.keys(groupedEvents).length > 0 ? (
                        Object.entries(groupedEvents).map(([day, dayEvents]) => (
                            <div key={day} className="flex gap-8 relative">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#FF4D6D] font-black text-lg z-10 shadow-xl">
                                        {day}
                                    </div>
                                    <div className="w-[1px] h-full absolute top-12 border-l border-white/30 border-dashed"></div>
                                </div>
                                <div className="flex-1 space-y-8 pt-1">
                                    {dayEvents.map((event) => (
                                        <div key={event.id} className="flex items-start justify-between group">
                                            <div>
                                                <h4 className="text-white text-xl font-black leading-tight tracking-tight uppercase group-hover:translate-x-1 transition-transform">{event.title}</h4>
                                                <div className="flex items-center gap-2 text-white/60 mt-2">
                                                    <Clock size={12} />
                                                    <p className="text-[11px] font-bold uppercase tracking-widest">{event.time}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => deleteEvent(event.id)}
                                                className="p-2 text-white/40 hover:text-white transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-white/60">
                            <CalendarIcon size={48} strokeWidth={1} className="mb-4 opacity-20" />
                            <p className="text-[10px] font-black uppercase tracking-widest">No Events Found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Event Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-black text-gray-900 tracking-tight">Add Event</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="p-4 bg-pink-50 rounded-2xl flex items-center gap-4 border border-pink-100">
                                <span className="text-sm font-black text-[#FF4D6D]">
                                    {selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Event Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Wedding Meeting"
                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#FF4D6D]/10 outline-none"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Time</label>
                                <input
                                    type="time"
                                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#FF4D6D]/10 outline-none"
                                    value={newEvent.time}
                                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                                />
                            </div>

                            <button
                                onClick={addEvent}
                                className="w-full bg-[#FF4D6D] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-pink-100 flex items-center justify-center gap-3 active:scale-95 transition-all mt-4"
                            >
                                Schedule Event <Sparkles size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserSchedule;
