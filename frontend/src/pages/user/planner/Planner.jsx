import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Bell, Save, Calendar as CalendarIcon, X, Check, Store, Heart, MessageCircle, Newspaper, Home as HomeIcon } from 'lucide-react';

const Planner = () => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [notes, setNotes] = useState({}); // { 'YYYY-MM-DD': 'note content' }
    const [reminders, setReminders] = useState({}); // { 'YYYY-MM-DD': true }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState('');

    // Calendar Logic
    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        return { days, firstDay };
    };

    const { days, firstDay } = getDaysInMonth(currentDate);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDateClick = (day) => {
        const dateString = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
        setSelectedDate(dateString);
        setCurrentNote(notes[dateString] || '');
        setIsModalOpen(true);
    };

    const handleSaveNote = () => {
        if (selectedDate) {
            setNotes(prev => ({ ...prev, [selectedDate]: currentNote }));
            setIsModalOpen(false);
        }
    };

    const toggleReminder = () => {
        if (selectedDate) {
            const isSet = reminders[selectedDate];
            setReminders(prev => ({ ...prev, [selectedDate]: !isSet }));

            if (!isSet) {
                // Simulate notification
                if ('Notification' in window && Notification.permission === 'granted') {
                    new Notification("Reminder Set!", { body: `Reminder set for ${new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(selectedDate.split('-')[2])).toDateString()}` });
                } else {
                    alert(`🔔 Reminder set for this date! We'll notify you.`);
                }
            }
        }
    };

    // Generate Calendar Grid
    const renderCalendar = () => {
        const blanks = Array(firstDay).fill(null);
        const daySlots = Array.from({ length: days }, (_, i) => i + 1);
        const totalSlots = [...blanks, ...daySlots];

        return (
            <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase py-2">
                        {day}
                    </div>
                ))}
                {totalSlots.map((day, index) => {
                    if (!day) return <div key={`blank-${index}`} />;

                    const dateString = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
                    const hasNote = notes[dateString];
                    const hasReminder = reminders[dateString];
                    const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

                    return (
                        <button
                            key={day}
                            onClick={() => handleDateClick(day)}
                            className={`
                                aspect-square rounded-2xl flex flex-col items-center justify-center relative transition-all
                                ${isToday ? 'bg-brand-pink text-white shadow-lg shadow-brand-pink/30' : 'bg-white text-slate-700 hover:bg-pink-50'}
                                ${hasNote ? 'border-2 border-brand-pink/20' : ''}
                            `}
                        >
                            <span className={`text-sm font-bold ${isToday ? 'text-white' : 'text-slate-700'}`}>{day}</span>

                            {/* Indicators */}
                            <div className="flex gap-1 mt-1">
                                {hasReminder && <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />}
                                {hasNote && <div className={`w-1.5 h-1.5 rounded-full ${isToday ? 'bg-white' : 'bg-brand-pink'}`} />}
                            </div>
                        </button>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white px-5 py-4 rounded-b-[24px] shadow-sm mb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-serif font-bold text-slate-800">Wedding Planner</h1>
                        <p className="text-brand-pink font-medium text-xs">Organize your big day</p>
                    </div>
                    <div className="w-9 h-9 bg-brand-pink/10 rounded-full flex items-center justify-center text-brand-pink">
                        <CalendarIcon className="w-5 h-5" />
                    </div>
                </div>
            </header>

            <div className="px-6 container mx-auto max-w-lg">

                {/* Month Navigation */}
                <div className="bg-brand-light-pink p-6 rounded-[32px] shadow-none mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <button onClick={handlePrevMonth} className="p-2 hover:bg-white/50 rounded-full transition-colors text-slate-600">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl font-serif font-bold text-slate-800">
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </h2>
                        <button onClick={handleNextMonth} className="p-2 hover:bg-white/50 rounded-full transition-colors text-slate-600">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {renderCalendar()}
                </div>

                {/* Upcoming Reminders Preview (Optional) */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-lg font-bold text-slate-800">Upcoming Tasks</h3>
                        <img
                            src="/illustrations/calenderiamge.jpg"
                            alt="Calendar"
                            className="w-32 object-contain -my-6"
                        />
                    </div>
                    {Object.keys(notes).length === 0 ? (
                        <div className="bg-white/50 border border-white p-6 rounded-3xl text-center">
                            <p className="text-slate-400 text-sm">No notes or reminders yet.</p>
                            <p className="text-brand-pink text-xs font-bold mt-1">Tap a date to start planning!</p>
                        </div>
                    ) : (
                        Object.entries(notes).map(([dateStr, note]) => {
                            const [y, m, d] = dateStr.split('-');
                            const dateObj = new Date(y, m, d);
                            return (
                                <div key={dateStr} className="bg-white p-4 rounded-2xl shadow-sm flex items-start gap-4">
                                    <div className="bg-brand-pink/10 w-12 h-12 rounded-xl flex flex-col items-center justify-center text-brand-pink shrink-0">
                                        <span className="text-xs font-bold uppercase">{monthNames[dateObj.getMonth()].substring(0, 3)}</span>
                                        <span className="text-lg font-bold leading-none">{d}</span>
                                    </div>
                                    <div>
                                        <p className="text-slate-800 font-medium text-sm line-clamp-2">{note}</p>
                                        {reminders[dateStr] && (
                                            <div className="flex items-center gap-1 text-xs text-yellow-600 mt-1 font-bold">
                                                <Bell className="w-3 h-3" /> Reminder Set
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>

            {/* Note Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-sm rounded-[32px] shadow-2xl p-6 relative animate-in zoom-in-95 duration-300">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-xl font-serif font-bold text-slate-800 mb-1">
                            {selectedDate && `${monthNames[selectedDate.split('-')[1]]} ${selectedDate.split('-')[2]}`}
                        </h3>
                        <p className="text-slate-400 text-sm mb-6">Add details for this day</p>

                        <div className="space-y-4">
                            <textarea
                                value={currentNote}
                                onChange={(e) => setCurrentNote(e.target.value)}
                                placeholder="Meeting with decorators, payment due..."
                                className="w-full bg-slate-50 border-none rounded-2xl p-4 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-pink/20 h-32 resize-none text-sm font-medium"
                                autoFocus
                            />

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={toggleReminder}
                                    className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${reminders[selectedDate]
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                        }`}
                                >
                                    <Bell className={`w-4 h-4 ${reminders[selectedDate] ? 'fill-current' : ''}`} />
                                    {reminders[selectedDate] ? 'Reminder On' : 'Set Reminder'}
                                </button>

                                <button
                                    onClick={handleSaveNote}
                                    className="flex-[2] bg-brand-pink text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-brand-dark-pink transition-all shadow-lg shadow-brand-pink/20"
                                >
                                    <Save className="w-4 h-4" />
                                    Save Note
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Planner;
