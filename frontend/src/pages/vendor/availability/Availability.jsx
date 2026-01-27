import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVendor } from '../../../context/VendorContext';
import {
    ArrowLeft, ChevronLeft, ChevronRight, Calendar as CalendarIcon,
    Lock, CheckCircle2, AlertCircle, RefreshCcw
} from 'lucide-react';

const VendorAvailability = () => {
    const navigate = useNavigate();
    const {
        availability,
        toggleDateStatus,
        getDateStatus,
        markMonthAvailable
    } = useVendor();

    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const startDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const renderCalendar = () => {
        const totalDays = daysInMonth(currentDate);
        const startDay = startDayOfMonth(currentDate);
        const days = [];

        // Empty cells for start padding
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
        }

        // Day cells
        for (let i = 1; i <= totalDays; i++) {
            const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const status = getDateStatus(dateStr);

            let statusClasses = '';
            // booked > blocked > available > unset
            if (status === 'booked') {
                statusClasses = 'bg-brand-pink/10 text-brand-pink border-brand-pink/30 border font-bold shadow-sm shadow-brand-pink/10';
            } else if (status === 'blocked') {
                statusClasses = 'bg-red-50 text-red-500 border-red-100 border font-medium';
            } else if (status === 'available') {
                statusClasses = 'bg-emerald-50 text-emerald-600 border-emerald-100 border font-bold shadow-sm shadow-emerald-500/10';
            } else {
                statusClasses = 'bg-slate-50 text-slate-400 border-slate-100 border hover:border-brand-pink/30 hover:bg-white hover:shadow-md hover:text-slate-600 hover:-translate-y-1';
            }

            days.push(
                <button
                    key={i}
                    onClick={() => toggleDateStatus(dateStr)}
                    className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden group ${statusClasses}`}
                >
                    <span className="text-sm z-10">{i}</span>
                    {status !== 'unset' && (
                        <div className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${status === 'available' ? 'bg-emerald-500' :
                                status === 'blocked' ? 'bg-red-400' :
                                    'bg-brand-pink'
                            }`}></div>
                    )}
                </button>
            );
        }

        return days;
    };

    const handleMarkMonthAvailable = () => {
        markMonthAvailable(currentDate.getFullYear(), currentDate.getMonth(), daysInMonth(currentDate));
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-24">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md shadow-sm border-b border-indigo-50 px-6 py-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/vendor/dashboard')}
                        className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors hover:shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-xl font-serif font-bold text-slate-800">Availability</h1>
                        <p className="text-xs text-slate-500">Manage your schedule</p>
                    </div>
                </div>
            </header>

            <main className="p-6 max-w-lg mx-auto">
                {/* Hero Section / Month Selector */}
                <div className="bg-gradient-to-br from-brand-pink to-brand-dark-pink rounded-3xl p-6 text-white shadow-xl shadow-brand-pink/20 mb-8 relative overflow-hidden">
                    {/* Decorative Circles */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <button
                                onClick={prevMonth}
                                className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all"
                            >
                                <ChevronLeft className="w-5 h-5 text-white" />
                            </button>
                            <div className="text-center">
                                <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
                                    {currentDate.toLocaleDateString('en-US', { month: 'long' })}
                                </h2>
                                <p className="text-sm text-white/80 font-medium">
                                    {currentDate.toLocaleDateString('en-US', { year: 'numeric' })}
                                </p>
                            </div>
                            <button
                                onClick={nextMonth}
                                className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all"
                            >
                                <ChevronRight className="w-5 h-5 text-white" />
                            </button>
                        </div>

                        {/* Quick Stats or Tips inside Hero */}
                        <div className="flex items-center justify-between bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <CalendarIcon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-white/80 uppercase tracking-wider">Total Days</p>
                                    <p className="font-bold text-lg">{daysInMonth(currentDate)}</p>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-white/20"></div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <CheckCircle2 className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-white/80 uppercase tracking-wider">Action</p>
                                    <button
                                        onClick={handleMarkMonthAvailable}
                                        className="text-xs font-bold bg-white text-brand-pink px-3 py-1 rounded-full hover:bg-pink-50 transition-colors"
                                    >
                                        Mark All Free
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-6 px-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 box-shadow-sm"></div>
                        <span className="text-xs font-bold text-emerald-700">Available</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 border border-red-100">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                        <span className="text-xs font-bold text-red-700">Blocked</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100">
                        <div className="w-2.5 h-2.5 rounded-full bg-brand-pink"></div>
                        <span className="text-xs font-bold text-brand-pink">Booked</span>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                    {/* Weekday Headers */}
                    <div className="grid grid-cols-7 mb-4">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                            <div key={day} className={`text-center text-[10px] font-bold uppercase tracking-widest ${i === 0 || i === 6 ? 'text-brand-pink/70' : 'text-slate-400'}`}>
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days */}
                    <div className="grid grid-cols-7 gap-3 sm:gap-4 relative z-10">
                        {renderCalendar()}
                    </div>
                </div>

                {/* Tips Section */}
                <div className="mt-8 bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-blue-800 mb-1">Managing Availability</h4>
                        <p className="text-xs text-blue-600/80 leading-relaxed">
                            Tap any date to toggle its status. Keeping your calendar updated helps you get more relevant requests and avoids cancellations.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VendorAvailability;
