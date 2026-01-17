import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bell,
    ChevronLeft,
    ChevronRight,
    Plus,
    Trash2,
    Clock,
    X,
    Calendar as CalendarIcon,
    Sparkles,
    ChevronDown,
    MapPin,
    Zap,
    Heart,
    Utensils,
    Camera,
    Music,
    Home,
    Gift,
    Scissors,
    Shield,
    Star
} from 'lucide-react';
import MobileNav from '../components/MobileNav';

const CATEGORY_DATA = [
    {
        id: 'venues',
        label: 'Venues',
        icon: Home,
        img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=200',
        subCategories: ["Wedding Venues", "Banquet Halls", "Convention Centres", "Community Halls", "Farm Houses", "Resorts"]
    },
    {
        id: 'gifting',
        label: 'Gifting & Accessories',
        icon: Gift,
        img: 'https://images.unsplash.com/photo-1549465220-1a129d2f2d9e?w=200',
        subCategories: ["Custom Gifting", "Wedding Garlands", "Painting Activities", "German Hangers"]
    },
    {
        id: 'transport',
        label: 'Luxury Transport',
        icon: Star,
        img: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=200',
        subCategories: ["Luxury Car Rentals", "Car Dealers", "Transport Logistics"]
    },
    {
        id: 'beauty',
        label: 'Beauty & Fashion',
        icon: Scissors,
        img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200',
        subCategories: ["Beauticians", "Bridal Couture", "Groom Couture", "Studios"]
    },
    {
        id: 'photography',
        label: 'Photography & Media',
        icon: Camera,
        img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200',
        subCategories: ["Photographers", "Videographers", "Drone Pilots", "Reels Makers"]
    },
    {
        id: 'entertainment',
        label: 'Entertainment',
        icon: Music,
        img: 'https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=200',
        subCategories: ["Anchors / Emcees", "Magicians", "Live Performances", "Special Effects"]
    },
    {
        id: 'decor',
        label: 'Decor & Lighting',
        icon: Sparkles,
        img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=200',
        subCategories: ["Home Décors", "Floral Arrangements", "Lighting Decorators", "LED Screens"]
    },
    {
        id: 'food',
        label: 'Food & Hospitality',
        icon: Utensils,
        img: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=200',
        subCategories: ["Caterers", "Cooking Masters", "Live Food Stalls", "Bartenders"]
    },
    {
        id: 'religious',
        label: 'Religious Services',
        icon: Heart,
        img: 'https://images.unsplash.com/photo-1544253324-44ed556f8f74?w=200',
        subCategories: ["Pandits / Priests", "Religious Ritual Services"]
    }
];

// --- Custom Components ---

const CustomDropdown = ({ label, options, value, onChange, placeholder, icon: Icon, colorClass = "bg-gray-50 border-gray-100" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.id === value || opt === value);
    const displayLabel = typeof selectedOption === 'object' ? selectedOption.label : selectedOption;

    return (
        <div className="space-y-2 relative" ref={dropdownRef}>
            <label className="text-[9px] font-black uppercase text-gray-300 tracking-[0.3em] ml-1 mb-1 block italic">/ {label}</label>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full ${colorClass} border rounded-2xl px-5 py-4 flex justify-between items-center cursor-pointer transition-all hover:border-[#2D328C]/20 ${isOpen ? 'ring-[4px] ring-blue-50 border-[#2D328C]/30 shadow-inner' : ''}`}
            >
                <div className="flex items-center gap-3">
                    {Icon && <Icon size={14} className="text-[#2D328C] opacity-30" />}
                    <span className={`text-[11px] font-black uppercase tracking-tighter ${value ? 'text-[#1E226A] italic' : 'text-gray-300'}`}>
                        {displayLabel || placeholder}
                    </span>
                </div>
                <ChevronDown size={14} className={`text-gray-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {isOpen && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white rounded-3xl shadow-2xl border border-gray-50 overflow-hidden z-[110] animate-in zoom-in-95 duration-200 p-2">
                    <div className="max-h-60 overflow-y-auto no-scrollbar space-y-1">
                        {options.map((opt, idx) => {
                            const optId = typeof opt === 'object' ? opt.id : opt;
                            const optLabel = typeof opt === 'object' ? opt.label : opt;
                            const optImg = typeof opt === 'object' ? opt.img : null;
                            const isSelected = optId === value;

                            return (
                                <div
                                    key={idx}
                                    onClick={() => {
                                        onChange(optId);
                                        setIsOpen(false);
                                    }}
                                    className={`px-3 py-2.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer ${isSelected ? 'bg-[#2D328C] text-white shadow-lg' : 'text-gray-300 hover:bg-gray-50 hover:text-[#1E226A]'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        {optImg && (
                                            <div className="w-8 h-8 rounded-xl overflow-hidden border border-white/20">
                                                <img src={optImg} className="w-full h-full object-cover" alt="" />
                                            </div>
                                        )}
                                        <span className="text-[10px] font-black uppercase tracking-widest">{optLabel}</span>
                                    </div>
                                    {isSelected && <Sparkles size={12} className="text-orange-400" />}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

const CustomDatePicker = ({ label, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date());

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const handleDateSelect = (day) => {
        const selected = new Date(year, month, day);
        onChange(selected.toISOString().split('T')[0]);
        setIsOpen(false);
    };

    return (
        <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-gray-300 tracking-[0.3em] ml-1 mb-1 block italic">/ {label}</label>
            <div
                onClick={() => setIsOpen(true)}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 flex justify-between items-center cursor-pointer hover:border-[#2D328C]/20 transition-all shadow-sm group"
            >
                <div className="flex items-center gap-3">
                    <CalendarIcon size={14} className="text-gray-300 group-hover:text-[#2D328C] transition-colors" />
                    <span className="text-[11px] font-black text-[#1E226A] uppercase tracking-tighter italic">
                        {value ? new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Pick Date'}
                    </span>
                </div>
                <ChevronDown size={14} className="text-gray-300" />
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-[320px] rounded-[3rem] shadow-2xl border border-gray-100 p-8 z-[120] animate-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#2D328C]/5 rounded-full blur-3xl -mr-16 -mt-16"></div>

                        <div className="relative z-10 flex justify-between items-center mb-8">
                            <button onClick={() => setViewDate(new Date(year, month - 1))} className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"><ChevronLeft size={16} /></button>
                            <span className="text-[10px] font-black text-[#1E226A] uppercase tracking-[0.2em] italic">{months[month]} {year}</span>
                            <button onClick={() => setViewDate(new Date(year, month + 1))} className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"><ChevronRight size={16} /></button>
                        </div>

                        <div className="relative z-10 grid grid-cols-7 mb-4 border-b border-gray-50 pb-2">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-[8px] font-black text-gray-300 text-center uppercase tracking-widest">{d}</div>)}
                        </div>

                        <div className="relative z-10 grid grid-cols-7 gap-1">
                            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                                const day = i + 1;
                                const isSelected = value && new Date(value).getDate() === day && new Date(value).getMonth() === month && new Date(value).getFullYear() === year;
                                const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;

                                return (
                                    <button
                                        key={day}
                                        onClick={() => handleDateSelect(day)}
                                        className={`h-9 w-full rounded-xl text-[10px] font-black flex items-center justify-center transition-all ${isSelected ? 'bg-[#2D328C] text-white shadow-lg italic scale-110' : isToday ? 'text-orange-500 border-2 border-orange-50' : 'text-gray-400 hover:text-[#1E226A] hover:bg-gray-50'}`}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>
                        <button onClick={() => setIsOpen(false)} className="w-full mt-10 bg-[#2D328C] text-white h-12 rounded-2xl font-black text-[9px] uppercase tracking-[0.3em] italic shadow-lg shadow-blue-200">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const CustomTimePicker = ({ label, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState('hours');

    const [h24, m] = value ? value.split(':').map(Number) : [12, 0];
    const ampm = h24 >= 12 ? 'PM' : 'AM';
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;

    const handleTimeChange = (newH12, newM, newAmpm) => {
        let h = newH12;
        if (newAmpm === 'PM' && h < 12) h += 12;
        if (newAmpm === 'AM' && h === 12) h = 0;
        const hh = h.toString().padStart(2, '0');
        const mm = newM.toString().padStart(2, '0');
        onChange(`${hh}:${mm}`);
    };

    const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

    return (
        <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-gray-300 tracking-[0.3em] ml-1 mb-1 block italic">/ {label}</label>
            <div
                onClick={() => {
                    setIsOpen(true);
                    setMode('hours');
                }}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 flex justify-between items-center cursor-pointer hover:border-[#2D328C]/20 transition-all shadow-sm group"
            >
                <div className="flex items-center gap-3">
                    <Clock size={14} className="text-gray-300 group-hover:text-[#2D328C] transition-colors" />
                    <span className="text-[11px] font-black text-[#1E226A] uppercase tracking-tighter italic">
                        {value ? `${h12}:${m.toString().padStart(2, '0')} ${ampm}` : 'Set Time'}
                    </span>
                </div>
                <ChevronDown size={14} className="text-gray-300" />
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsOpen(false)}></div>

                    <div className="relative bg-white w-full max-w-[320px] rounded-[3.5rem] shadow-[0_20px_70px_-10px_rgba(45,50,140,0.3)] p-8 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#2D328C]/5 rounded-full blur-3xl -mr-16 -mt-16"></div>

                        <div className="relative z-10 flex justify-center items-center gap-4 mb-8 select-none">
                            <div className="flex items-center bg-gray-50 p-2 rounded-2xl border border-gray-100 shadow-inner">
                                <button
                                    onClick={() => setMode('hours')}
                                    className={`w-12 h-12 rounded-xl text-2xl font-black transition-all flex items-center justify-center ${mode === 'hours' ? 'bg-[#2D328C] text-white shadow-xl italic' : 'text-gray-300 hover:text-gray-400'}`}
                                >
                                    {h12}
                                </button>
                                <span className="text-xl font-black text-gray-200 px-1">:</span>
                                <button
                                    onClick={() => setMode('minutes')}
                                    className={`w-12 h-12 rounded-xl text-2xl font-black transition-all flex items-center justify-center ${mode === 'minutes' ? 'bg-[#2D328C] text-white shadow-xl italic' : 'text-gray-300 hover:text-gray-400'}`}
                                >
                                    {m.toString().padStart(2, '0')}
                                </button>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                {['AM', 'PM'].map(a => (
                                    <button
                                        key={a}
                                        onClick={() => handleTimeChange(h12, m, a)}
                                        className={`text-[9px] font-black px-3 py-2 rounded-xl transition-all uppercase tracking-widest ${ampm === a ? 'bg-[#2D328C] text-white shadow-md italic' : 'bg-gray-100 text-gray-400'}`}
                                    >
                                        {a}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative w-48 h-48 mx-auto bg-gray-50 rounded-full flex items-center justify-center border-[6px] border-white shadow-[inset_0_4px_15px_rgba(0,0,0,0.05)] select-none touch-none scale-105">
                            <div className="absolute w-2.5 h-2.5 bg-[#2D328C] rounded-full z-20 border-2 border-white shadow-sm"></div>
                            <div
                                className="absolute bg-[#2D328C]/10 origin-bottom transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)"
                                style={{
                                    height: mode === 'hours' ? '55px' : '75px',
                                    width: '2px',
                                    bottom: '50%',
                                    transform: `rotate(${mode === 'hours' ? (hours.indexOf(h12) * 30) : (minutes.indexOf(Math.round(m / 5) * 5) * 30)}deg)`
                                }}
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#2D328C] rounded-full shadow-2xl flex items-center justify-center transition-all">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                </div>
                            </div>

                            {(mode === 'hours' ? hours : minutes).map((val, i) => {
                                const angle = (i * 30) - 90;
                                const radius = mode === 'hours' ? 60 : 78;
                                const x = Math.cos(angle * Math.PI / 180) * radius;
                                const y = Math.sin(angle * Math.PI / 180) * radius;
                                const isSelected = mode === 'hours' ? h12 === val : m === val;

                                return (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            if (mode === 'hours') {
                                                handleTimeChange(val, m, ampm);
                                                setMode('minutes');
                                            } else {
                                                handleTimeChange(h12, val, ampm);
                                            }
                                        }}
                                        className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all transform -translate-x-1/2 -translate-y-1/2 z-10
                                            ${isSelected ? 'text-transparent scale-125' : 'text-gray-300 hover:text-[#2D328C] hover:bg-white active:scale-110'}`}
                                        style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                                    >
                                        {mode === 'minutes' ? val.toString().padStart(2, '0') : val}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="grid grid-cols-1 gap-3 mt-10 relative z-10 px-4">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="bg-[#2D328C] text-white h-12 rounded-2xl font-black text-[9px] uppercase tracking-[0.4em] shadow-xl shadow-blue-200 italic active:scale-95 transition-all"
                            >
                                Confirm Time
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-300 font-black text-[8px] uppercase tracking-[0.2em] hover:text-[#1E226A] transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Main Page Component ---

const UserSchedule = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [viewDate, setViewDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [bookingForm, setBookingForm] = useState({
        category: '',
        subCategory: '',
        eventName: '',
        location: '',
        bookingDate: '',
        appointmentDate: '',
        time: '',
        notes: ''
    });

    useEffect(() => {
        const savedEvents = JSON.parse(localStorage.getItem('user_calendar_events') || '[]');
        setEvents(savedEvents);
    }, []);

    useEffect(() => {
        localStorage.setItem('user_calendar_events', JSON.stringify(events));
    }, [events]);

    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const daysArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const year = viewDate.getFullYear();
    const monthIndex = viewDate.getMonth();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const firstDay = new Date(year, monthIndex, 1).getDay();

    const handleAddBooking = () => {
        if (!bookingForm.eventName || !bookingForm.category || !bookingForm.appointmentDate) return;

        const appDate = new Date(bookingForm.appointmentDate);
        const eventToAdd = {
            id: Date.now(),
            date: appDate.toDateString(),
            day: appDate.getDate(),
            title: bookingForm.eventName,
            category: bookingForm.category,
            subCategory: bookingForm.subCategory,
            location: bookingForm.location,
            bookingDate: bookingForm.bookingDate,
            appointmentDate: bookingForm.appointmentDate,
            time: bookingForm.time,
            notes: bookingForm.notes
        };

        setEvents([...events, eventToAdd]);
        setBookingForm({
            category: '',
            subCategory: '',
            eventName: '',
            location: '',
            bookingDate: '',
            appointmentDate: '',
            time: '',
            notes: ''
        });
        setIsModalOpen(false);
    };

    const deleteEvent = (id) => {
        setEvents(events.filter(e => e.id !== id));
    };

    const monthlyEvents = events
        .filter(e => {
            const eventDate = new Date(e.date);
            return eventDate.getMonth() === monthIndex && eventDate.getFullYear() === year;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const groupedEvents = monthlyEvents.reduce((acc, event) => {
        if (!acc[event.day]) acc[event.day] = [];
        acc[event.day].push(event);
        return acc;
    }, {});

    const currentCategory = CATEGORY_DATA.find(cat => cat.id === bookingForm.category);
    const availableSubCategories = currentCategory ? currentCategory.subCategories : [];

    return (
        <div className="min-h-screen bg-white font-sans flex flex-col pb-32 max-w-[440px] mx-auto shadow-[0_0_50px_rgba(0,0,0,0.05)] border-x border-gray-50 relative overflow-x-hidden">
            {/* Header - Boutique Style */}
            <div className="bg-[#2D328C] px-5 pt-12 pb-24 rounded-b-[2.5rem] relative overflow-hidden shadow-2xl shrink-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="absolute top-20 -left-10 w-24 h-24 bg-orange-400/10 rounded-full blur-2xl"></div>

                <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white border border-white/10 shadow-lg">
                            <CalendarIcon size={20} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-1 block italic">Live Calendar</span>
                            <h1 className="text-sm font-black text-white uppercase tracking-widest italic leading-none">Record Schedule</h1>
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    </div>
                </div>

                <div className="mt-10 relative z-10 flex items-center justify-between px-2">
                    <h2 className="text-white font-black text-2xl tracking-tighter italic uppercase underline decoration-orange-400 decoration-4 underline-offset-8">
                        {months[monthIndex]} / {year}
                    </h2>
                    <div className="flex gap-1.5">
                        <button onClick={() => setViewDate(new Date(year, monthIndex - 1, 1))} className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white transition-colors"><ChevronLeft size={16} /></button>
                        <button onClick={() => setViewDate(new Date(year, monthIndex + 1, 1))} className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white transition-colors"><ChevronRight size={16} /></button>
                    </div>
                </div>
            </div>

            {/* Calendar Grid Integration */}
            <div className="px-5 -mt-12 relative z-20">
                <div className="bg-white rounded-[2.5rem] shadow-xl p-6 border border-gray-50 overflow-hidden relative">
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#2D328C]/5 rounded-full blur-2xl"></div>
                    <div className="grid grid-cols-7 mb-6 relative z-10">
                        {daysArr.map((d) => (
                            <div key={d} className="text-center text-[9px] font-black text-gray-300 uppercase tracking-tighter italic">{d}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-y-3 relative z-10">
                        {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} className="h-9"></div>)}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const isToday = new Date().getDate() === day && new Date().getMonth() === monthIndex && new Date().getFullYear() === year;
                            const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === monthIndex && selectedDate.getFullYear() === year;
                            const hasEvents = events.some(e => {
                                const d = new Date(e.date);
                                return d.getDate() === day && d.getMonth() === monthIndex && d.getFullYear() === year;
                            });
                            return (
                                <div key={day} onClick={() => {
                                    const newDate = new Date(year, monthIndex, day);
                                    setSelectedDate(newDate);
                                    setBookingForm(prev => ({ ...prev, appointmentDate: newDate.toISOString().split('T')[0] }));
                                }} className="h-9 flex flex-col items-center justify-center cursor-pointer group">
                                    <div className={`w-8 h-8 rounded-[1rem] flex items-center justify-center text-[11px] font-black transition-all ${isSelected ? 'bg-[#2D328C] text-white shadow-lg shadow-blue-100 italic scale-110' : isToday ? 'text-orange-500 border-2 border-orange-50' : 'text-[#1E226A] group-hover:bg-gray-50'}`}>{day}</div>
                                    {hasEvents && !isSelected && <div className="absolute bottom-0 w-1 h-1 bg-orange-400 rounded-full animate-bounce"></div>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Upcoming List */}
            <div className="px-5 mt-10 space-y-6 pb-20">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-[#1E226A] font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 italic">
                        <Zap size={10} className="text-orange-400" /> Upcoming
                    </h3>
                    <button onClick={() => setIsModalOpen(true)} className="bg-[#2D328C] text-white px-5 py-2.5 rounded-xl font-black text-[9px] shadow-lg shadow-blue-200 flex items-center gap-2 active:scale-95 transition-all uppercase tracking-widest italic">
                        <Plus size={12} strokeWidth={4} /> Record
                    </button>
                </div>

                <div className="space-y-4">
                    {Object.keys(groupedEvents).length > 0 ? (
                        Object.entries(groupedEvents).map(([day, dayEvents]) => (
                            <div key={day} className="space-y-3">
                                {dayEvents.map((event) => {
                                    const CategoryInfo = CATEGORY_DATA.find(c => c.id === event.category) || CATEGORY_DATA[0];
                                    return (
                                        <div key={event.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-4 group hover:border-[#2D328C]/10 transition-all">
                                            <div className="relative w-12 h-12 rounded-xl border border-gray-50 overflow-hidden shadow-sm shrink-0">
                                                <img src={CategoryInfo.img} className="w-full h-full object-cover grayscale-0 opacity-80" alt="" />
                                                <div className="absolute inset-0 bg-[#2D328C]/10"></div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-0.5">
                                                    <h4 className="text-[#1E226A] font-black text-[11px] tracking-tight truncate uppercase italic">{event.title}</h4>
                                                    <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">{event.time || 'TBD'}</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] font-black text-orange-500 uppercase tracking-[0.2em]">{event.subCategory || event.category}</span>
                                                    <div className="flex items-center gap-1.5 text-[8px] font-bold text-gray-400 mt-1 uppercase truncate"><MapPin size={9} strokeWidth={3} /><span>{event.location || 'Not Set'}</span></div>
                                                </div>
                                            </div>
                                            <button onClick={() => deleteEvent(event.id)} className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 active:scale-90 transition-all"><Trash2 size={12} /></button>
                                        </div>
                                    );
                                })}
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 border-dashed">
                            <CalendarIcon size={32} strokeWidth={1} className="text-gray-200 mb-4" />
                            <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.3em] italic">Timeline is empty</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Custom Modal - Portfolio Style */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-end justify-center p-0 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-white w-full max-w-[440px] rounded-t-[3.5rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-500 max-h-[95vh] flex flex-col no-scrollbar">
                        <div className="p-8 bg-[#2D328C] relative flex justify-between items-center text-white shrink-0 shadow-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                            <div className="relative z-10">
                                <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] mb-1 block">New Audit</span>
                                <h3 className="text-lg font-black tracking-tight uppercase italic">Record Milestone</h3>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 active:scale-90 transition-all"><X size={18} strokeWidth={3} /></button>
                        </div>

                        <div className="p-7 overflow-y-auto no-scrollbar space-y-7 pb-16 flex-1">
                            <CustomDropdown label="Select Service Area" options={CATEGORY_DATA} value={bookingForm.category} onChange={(val) => setBookingForm({ ...bookingForm, category: val, subCategory: '' })} placeholder="Browse Categories" icon={Star} />

                            {bookingForm.category && (
                                <div className="animate-in slide-in-from-top-2 duration-300">
                                    <CustomDropdown label="Service Type" options={availableSubCategories} value={bookingForm.subCategory} onChange={(val) => setBookingForm({ ...bookingForm, subCategory: val })} placeholder="Pick a service..." icon={Sparkles} colorClass="bg-orange-50/30 border-orange-100/50" />
                                </div>
                            )}

                            <div className="space-y-5">
                                <label className="text-[9px] font-black uppercase text-gray-300 tracking-[0.3em] ml-1 mb-1 block italic">/ Professional Entry</label>
                                <div className="space-y-4">
                                    <div className="relative group">
                                        <input type="text" placeholder="Client or Venue Name" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-[11px] font-black text-[#1E226A] uppercase tracking-tighter italic outline-none focus:ring-[4px] focus:ring-blue-50 focus:border-[#2D328C]/20 transition-all placeholder:text-gray-300 placeholder:not-italic" value={bookingForm.eventName} onChange={(e) => setBookingForm({ ...bookingForm, eventName: e.target.value })} />
                                    </div>
                                    <div className="relative group">
                                        <input type="text" placeholder="Specific Location / City" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-[11px] font-black text-[#1E226A] uppercase tracking-tighter italic outline-none focus:ring-[4px] focus:ring-blue-50 focus:border-[#2D328C]/20 transition-all placeholder:text-gray-300 placeholder:not-italic" value={bookingForm.location} onChange={(e) => setBookingForm({ ...bookingForm, location: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <CustomDatePicker label="Function Date" value={bookingForm.bookingDate} onChange={(val) => setBookingForm({ ...bookingForm, bookingDate: val })} />
                                    <CustomTimePicker label="Arrival Time" value={bookingForm.time} onChange={(val) => setBookingForm({ ...bookingForm, time: val })} />
                                </div>
                            </div>

                            <button onClick={handleAddBooking} className="w-full bg-[#2D328C] text-white h-14 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl shadow-blue-100 flex items-center justify-center gap-3 active:scale-[0.98] transition-all mt-4 italic">
                                Finalize Record <Sparkles size={14} className="text-orange-400" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <MobileNav />
        </div>
    );
};

export default UserSchedule;
