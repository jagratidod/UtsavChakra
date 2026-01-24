import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Calendar, ChevronLeft, ChevronRight, Check, X, Lock
} from 'lucide-react';

const VendorAvailability = () => {
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Mock availability data
    const [availability, setAvailability] = useState({
        available: ['2026-02-01', '2026-02-03', '2026-02-05', '2026-02-07', '2026-02-09', '2026-02-11', '2026-02-13', '2026-02-17', '2026-02-19', '2026-02-21', '2026-02-23', '2026-02-25', '2026-02-27'],
        blocked: ['2026-02-06', '2026-02-12', '2026-02-20'],
        booked: ['2026-02-02', '2026-02-08', '2026-02-15', '2026-02-22', '2026-02-28']
    });

    const [selectedDate, setSelectedDate] = useState(null);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        return { daysInMonth, startingDay };
    };

    const formatDate = (year, month, day) => {
        const m = String(month + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        return `${year}-${m}-${d}`;
    };

    const getDateStatus = (dateStr) => {
        if (availability.booked.includes(dateStr)) return 'booked';
        if (availability.blocked.includes(dateStr)) return 'blocked';
        if (availability.available.includes(dateStr)) return 'available';
        return 'unset';
    };

    const toggleDateStatus = (dateStr) => {
        const currentStatus = getDateStatus(dateStr);
        if (currentStatus === 'booked') return; // Can't change booked dates

        const newAvailability = { ...availability };

        // Remove from current array
        if (currentStatus === 'available') {
            newAvailability.available = newAvailability.available.filter(d => d !== dateStr);
        } else if (currentStatus === 'blocked') {
            newAvailability.blocked = newAvailability.blocked.filter(d => d !== dateStr);
        }

        // Add to new array (cycle: unset -> available -> blocked -> unset)
        if (currentStatus === 'unset') {
            newAvailability.available.push(dateStr);
        } else if (currentStatus === 'available') {
            newAvailability.blocked.push(dateStr);
        }

        setAvailability(newAvailability);
    };

    const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const prevMonth = () => {
        setCurrentMonth(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(year, month + 1, 1));
    };

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-8">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-white shadow-sm px-6 py-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/vendor/dashboard')}
                        className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-xl font-serif font-bold text-slate-800">Availability</h1>
                        <p className="text-xs text-slate-400">Manage your booking calendar</p>
                    </div>
                </div>
            </header>

            <main className="p-6">
                {/* Legend */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-6">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                            <span className="text-xs text-slate-600">Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-red-400"></div>
                            <span className="text-xs text-slate-600">Blocked</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-brand-pink"></div>
                            <span className="text-xs text-slate-600">Booked</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-slate-200"></div>
                            <span className="text-xs text-slate-600">Not Set</span>
                        </div>
                    </div>
                </div>

                {/* Calendar */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between p-4 border-b border-slate-100">
                        <button
                            onClick={prevMonth}
                            className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h3 className="text-lg font-serif font-bold text-slate-800">
                            {monthNames[month]} {year}
                        </h3>
                        <button
                            onClick={nextMonth}
                            className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Day Headers */}
                    <div className="grid grid-cols-7 border-b border-slate-100">
                        {dayNames.map((day) => (
                            <div key={day} className="py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 p-2">
                        {/* Empty cells for starting day */}
                        {[...Array(startingDay)].map((_, i) => (
                            <div key={`empty-${i}`} className="aspect-square"></div>
                        ))}

                        {/* Day cells */}
                        {[...Array(daysInMonth)].map((_, i) => {
                            const day = i + 1;
                            const dateStr = formatDate(year, month, day);
                            const status = getDateStatus(dateStr);
                            const isToday = new Date().toISOString().split('T')[0] === dateStr;

                            let bgColor = 'bg-slate-100 hover:bg-slate-200';
                            let textColor = 'text-slate-700';
                            let icon = null;

                            if (status === 'available') {
                                bgColor = 'bg-emerald-100 hover:bg-emerald-200';
                                textColor = 'text-emerald-700';
                                icon = <Check className="w-3 h-3" />;
                            } else if (status === 'blocked') {
                                bgColor = 'bg-red-100 hover:bg-red-200';
                                textColor = 'text-red-600';
                                icon = <X className="w-3 h-3" />;
                            } else if (status === 'booked') {
                                bgColor = 'bg-brand-pink text-white cursor-not-allowed';
                                textColor = 'text-white';
                                icon = <Lock className="w-3 h-3" />;
                            }

                            return (
                                <button
                                    key={day}
                                    onClick={() => toggleDateStatus(dateStr)}
                                    disabled={status === 'booked'}
                                    className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${bgColor} ${textColor} ${isToday ? 'ring-2 ring-brand-pink ring-offset-2' : ''}`}
                                >
                                    <span className="text-sm font-semibold">{day}</span>
                                    {icon && <span>{icon}</span>}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 space-y-3">
                    <button
                        onClick={() => {
                            // Mark all unset dates in current month as available
                            const newAvailable = [...availability.available];
                            for (let i = 1; i <= daysInMonth; i++) {
                                const dateStr = formatDate(year, month, i);
                                if (!availability.available.includes(dateStr) &&
                                    !availability.blocked.includes(dateStr) &&
                                    !availability.booked.includes(dateStr)) {
                                    newAvailable.push(dateStr);
                                }
                            }
                            setAvailability({ ...availability, available: newAvailable });
                        }}
                        className="w-full py-4 rounded-xl bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
                    >
                        <Check className="w-5 h-5" />
                        Mark All Available for {monthNames[month]}
                    </button>

                    <button
                        onClick={() => {
                            // Clear all availability for current month (except booked)
                            const newAvailable = availability.available.filter(d => !d.startsWith(formatDate(year, month, 1).slice(0, 7)));
                            const newBlocked = availability.blocked.filter(d => !d.startsWith(formatDate(year, month, 1).slice(0, 7)));
                            setAvailability({ ...availability, available: newAvailable, blocked: newBlocked });
                        }}
                        className="w-full py-4 rounded-xl bg-white text-slate-600 font-bold text-sm flex items-center justify-center gap-2 border border-slate-200"
                    >
                        Reset {monthNames[month]} Availability
                    </button>
                </div>

                {/* Info */}
                <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <p className="text-sm text-blue-700">
                        <strong>Tip:</strong> Click on any date to cycle through: Available → Blocked → Unset. Booked dates cannot be changed.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default VendorAvailability;
