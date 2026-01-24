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
                statusClasses = 'bg-brand-pink/20 text-brand-pink border-brand-pink border';
            } else if (status === 'blocked') {
                statusClasses = 'bg-red-100 text-red-600 border-red-200 border';
            } else if (status === 'available') {
                statusClasses = 'bg-emerald-100 text-emerald-600 border-emerald-200 border';
            } else {
                statusClasses = 'bg-slate-50 text-slate-400 border-slate-100 border hover:border-slate-300';
            }

            days.push(
                <button
                    key={i}
                    onClick={() => toggleDateStatus(dateStr)}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all ${statusClasses}`}
                >
                    <span className="text-sm font-bold">{i}</span>
                    <span className="text-[10px] uppercase font-medium mt-0.5">
                        {status === 'unset' ? '' : status}
                    </span>
                </button>
            );
        }

        return days;
    };

    const handleMarkMonthAvailable = () => {
        markMonthAvailable(currentDate.getFullYear(), currentDate.getMonth(), daysInMonth(currentDate));
    };

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
                        <p className="text-xs text-slate-400">Manage your calendar dates</p>
                    </div>
                </div>
            </header>

            <main className="p-6">
                {/* Calendar Controls */}
                <div className="bg-white rounded-t-2xl p-6 border-b border-slate-100 flex items-center justify-between">
                    <button
                        onClick={prevMonth}
                        className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200"
                    >
                        <ChevronLeft className="w-5 h-5 text-slate-600" />
                    </button>
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-slate-800">
                            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h2>
                    </div>
                    <button
                        onClick={nextMonth}
                        className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200"
                    >
                        <ChevronRight className="w-5 h-5 text-slate-600" />
                    </button>
                </div>

                {/* Calendar Grid */}
                <div className="bg-white rounded-b-2xl p-6 shadow-sm border border-slate-100 mb-6">
                    {/* Weekday Headers */}
                    <div className="grid grid-cols-7 mb-4">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase">
                                {day}
                            </div>
                        ))}
                    </div>
                    {/* Days */}
                    <div className="grid grid-cols-7 gap-3">
                        {renderCalendar()}
                    </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-4 justify-center mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span className="text-xs font-medium text-slate-600">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-xs font-medium text-slate-600">Blocked</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-brand-pink"></div>
                        <span className="text-xs font-medium text-slate-600">Booked</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                        <span className="text-xs font-medium text-slate-600">Not Set</span>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <h3 className="font-serif font-bold text-slate-800 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            onClick={handleMarkMonthAvailable}
                            className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-3 hover:bg-emerald-100 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-emerald-800 text-sm">Mark All Available</p>
                                <p className="text-xs text-emerald-600">Set entire month as available</p>
                            </div>
                        </button>

                        <button
                            onClick={() => {
                                // Reset logic could be implemented if needed
                                alert("This would reset the month's availability.");
                            }}
                            className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3 hover:bg-slate-100 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                                <RefreshCcw className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-slate-800 text-sm">Reset Month</p>
                                <p className="text-xs text-slate-500">Clear manual settings</p>
                            </div>
                        </button>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-xs rounded-lg flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <p>Dates with confirmed bookings cannot be changed. Tap on any date to cycle through status: Available → Blocked → Not Set.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VendorAvailability;
