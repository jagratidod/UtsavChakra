import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    Mic,
    MicOff,
    StickyNote,
    Bell,
    Calendar,
    LayoutGrid,
    CheckCircle2,
    Wallet,
    Box,
    Sparkles,
    Trash2,
    Save,
    RotateCcw,
    Check
} from 'lucide-react';
import MobileNav from '../components/MobileNav';

const UserPlanner = () => {
    const navigate = useNavigate();
    const [note, setNote] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [notes, setNotes] = useState([]);
    const [activeTab, setActiveTab] = useState('summary'); // 'summary' or 'notes'
    const [showSuccess, setShowSuccess] = useState(false);
    const recognitionRef = useRef(null);
    const textareaRef = useRef(null);

    // Mock Stats
    const [stats, setStats] = useState({
        upcomingEvents: 2,
        appointmentsConfirmed: 5,
        categoriesExplored: 12,
        eventsBooked: 3,
        budget: '₹12.4L',
        activePackages: 4
    });

    const [reminders, setReminders] = useState([
        { id: 1, title: 'Photography Confirmation', time: 'Today, 2:00 PM', urgency: 'high' },
        { id: 2, title: 'Venue Recce - Grand Plaza', time: 'Tomorrow, 11:00 AM', urgency: 'medium' },
        { id: 3, title: 'Catering Menu Finalization', time: 'Jan 20, 4:00 PM', urgency: 'low' }
    ]);

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('user_planner_notes') || '[]');
        setNotes(savedNotes);

        const savedDraft = localStorage.getItem('user_planner_draft');
        if (savedDraft) setNote(savedDraft);

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                let currentTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        currentTranscript += event.results[i][0].transcript;
                    }
                }
                if (currentTranscript) {
                    setNote(prev => {
                        const newNote = prev ? prev + ' ' + currentTranscript : currentTranscript;
                        localStorage.setItem('user_planner_draft', newNote);
                        return newNote;
                    });
                }
            };

            recognitionRef.current.onerror = (err) => {
                console.error('Speech recognition error:', err);
                setIsRecording(false);
            };

            recognitionRef.current.onend = () => {
                setIsRecording(false);
            };
        }
    }, []);

    const toggleRecording = () => {
        if (!recognitionRef.current) {
            alert('Speech Recognition is not supported in this browser.');
            return;
        }

        if (isRecording) {
            recognitionRef.current.stop();
        } else {
            setIsRecording(true);
            recognitionRef.current.start();
        }
    };

    const handleSaveNote = () => {
        if (!note.trim()) return;
        const newNote = {
            id: Date.now(),
            text: note.trim(),
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
            type: 'manual'
        };
        const updatedNotes = [newNote, ...notes];
        setNotes(updatedNotes);
        localStorage.setItem('user_planner_notes', JSON.stringify(updatedNotes));
        localStorage.removeItem('user_planner_draft');
        setNote('');
        if (isRecording) {
            recognitionRef.current.stop();
        }

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const deleteNote = (id) => {
        const updatedNotes = notes.filter(n => n.id !== id);
        setNotes(updatedNotes);
        localStorage.setItem('user_planner_notes', JSON.stringify(updatedNotes));
    };

    const dismissReminder = (id) => {
        setReminders(reminders.filter(r => r.id !== id));
    };

    const handleManualType = (e) => {
        const val = e.target.value;
        setNote(val);
        localStorage.setItem('user_planner_draft', val);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col pb-32 max-w-[440px] mx-auto shadow-[0_0_50px_rgba(0,0,0,0.05)] border-x border-gray-50 relative font-sans overflow-x-hidden">
            {/* Header - Boutique Liquid Style */}
            <div className="bg-[#2D328C] px-5 pt-12 pb-24 rounded-b-[2.5rem] relative overflow-hidden shadow-2xl shrink-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-400/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

                <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white border border-white/10 shadow-lg">
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-1 block italic">Your Digital</span>
                            <h1 className="text-sm font-black text-white uppercase tracking-widest italic leading-none">Concierge Planner</h1>
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-orange-400 border border-white/10">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
                    </div>
                </div>

                {/* Boutique Tabs */}
                <div className="flex gap-2 mt-10 relative z-10 bg-black/20 p-1 rounded-2xl backdrop-blur-md border border-white/10">
                    <button
                        onClick={() => setActiveTab('summary')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[9px] font-black tracking-[0.2em] transition-all duration-500 uppercase italic ${activeTab === 'summary' ? 'bg-white text-[#2D328C] shadow-lg scale-[1.02]' : 'text-white/40 hover:text-white'}`}
                    >
                        <LayoutGrid size={12} /> Summary
                    </button>
                    <button
                        onClick={() => setActiveTab('notes')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[9px] font-black tracking-[0.2em] transition-all duration-500 uppercase italic ${activeTab === 'notes' ? 'bg-white text-[#2D328C] shadow-lg scale-[1.02]' : 'text-white/40 hover:text-white'}`}
                    >
                        <StickyNote size={12} /> Journal
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="px-5 -mt-12 relative z-20 space-y-8">

                {activeTab === 'summary' ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
                        {/* Stats Grid - Boutique Typography */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Calendar, val: stats.upcomingEvents, label: 'Upcoming', color: 'blue' },
                                { icon: CheckCircle2, val: stats.appointmentsConfirmed, label: 'Confirmed', color: 'orange' },
                                { icon: Box, val: stats.eventsBooked, label: 'Events', color: 'purple' },
                                { icon: Wallet, val: stats.budget, label: 'Budget', color: 'blue' },
                            ].map((s, idx) => (
                                <div key={idx} className="bg-white p-5 rounded-[2rem] shadow-[0_10px_35px_rgba(0,0,0,0.03)] border border-gray-50 group active:scale-95 transition-all relative overflow-hidden">
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-3 ${s.color === 'blue' ? 'bg-[#2D328C]/5 text-[#2D328C]' : s.color === 'orange' ? 'bg-orange-50 text-orange-500' : 'bg-purple-50 text-purple-600'}`}>
                                        <s.icon size={14} />
                                    </div>
                                    <span className="text-xl font-black text-[#1E226A] block leading-none mb-1 tracking-tight italic">{s.val}</span>
                                    <span className="text-[8px] font-black text-gray-300 uppercase tracking-[0.2em]">{s.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Reminders */}
                        <div className="mt-10 space-y-4">
                            <div className="flex items-center justify-between px-1">
                                <h3 className="text-[#1E226A] font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 italic">
                                    <Bell size={10} className="text-orange-400" /> Active Alerts
                                </h3>
                                <div className="h-[1px] flex-1 mx-4 bg-gray-100"></div>
                            </div>
                            {reminders.length === 0 ? (
                                <div className="bg-gray-50/50 py-10 rounded-[2rem] text-center border border-dashed border-gray-100">
                                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest italic">All caught up!</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {reminders.map((r) => (
                                        <div key={r.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-4 group hover:border-[#2D328C]/10 transition-all">
                                            <div className={`w-0.5 h-6 rounded-full shrink-0 ${r.urgency === 'high' ? 'bg-red-500' : r.urgency === 'medium' ? 'bg-orange-400' : 'bg-green-400'}`}></div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-[#1E226A] font-black text-[10px] leading-tight uppercase tracking-tighter truncate">{r.title}</h4>
                                                <p className="text-[7px] font-bold text-gray-400 mt-1 flex items-center gap-1.5 uppercase tracking-widest">
                                                    <RotateCcw size={8} /> {r.time}
                                                </p>
                                            </div>
                                            <button onClick={() => dismissReminder(r.id)} className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 hover:text-green-500 active:scale-90 transition-all">
                                                <Check size={12} strokeWidth={4} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Explore All CTA */}
                        <div className="mt-10 bg-gradient-to-br from-[#2D328C] to-[#1E226A] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-blue-100/50">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.5em] mb-4">Discover More</span>
                                <h4 className="text-lg font-black tracking-tight leading-none uppercase italic mb-6">Need more vendors?</h4>
                                <div className="flex flex-wrap justify-center gap-2 mb-8">
                                    {['Venues', 'Catering', 'Music', 'Lights'].map(cat => (
                                        <span key={cat} className="bg-white/10 px-3 py-1.5 rounded-lg text-[7px] font-black uppercase tracking-widest border border-white/10">
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                                <button
                                    onClick={() => navigate('/user/dashboard?all=true')}
                                    className="w-full bg-orange-500 text-white h-12 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
                                >
                                    EXPLORE DIRECTORY
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
                        {/* Journal Section */}
                        <div className="bg-white p-5 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-gray-50 space-y-6">
                            <div className="flex items-center justify-between px-1">
                                <h3 className="text-[#1E226A] font-black text-[10px] uppercase tracking-[0.3em] italic">Manual Entry</h3>
                                {isRecording && (
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-red-50 text-red-500 rounded-lg animate-pulse border border-red-100">
                                        <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                                        <span className="text-[7px] font-black uppercase tracking-widest">Listening</span>
                                    </div>
                                )}
                            </div>

                            <div className="relative bg-gray-50 rounded-[1.8rem] p-2 border border-blue-50/50">
                                <textarea
                                    ref={textareaRef}
                                    className="w-full bg-transparent p-4 text-[11px] font-bold text-[#1E226A] min-h-[160px] outline-none no-scrollbar resize-none placeholder:text-gray-300 placeholder:italic leading-relaxed italic"
                                    placeholder="Speak or type your event thoughts..."
                                    value={note}
                                    onChange={handleManualType}
                                ></textarea>

                                <div className="flex items-center justify-between p-2 bg-white rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => { setNote(''); localStorage.removeItem('user_planner_draft'); }}
                                            className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-200 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        <div className="w-[1px] h-4 bg-gray-100 self-center mx-1"></div>
                                        <button
                                            className="px-3 py-2 text-[8px] font-black text-[#2D328C] active:bg-blue-50 rounded-xl uppercase tracking-widest italic"
                                            onClick={() => {
                                                const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                                setNote(prev => prev + `\n[Log ${timeStr}]: `);
                                            }}
                                        >
                                            + Time
                                        </button>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={toggleRecording}
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all active:scale-90 ${isRecording ? 'bg-red-500 text-white shadow-lg shadow-red-200' : 'bg-[#2D328C]/5 text-[#2D328C]'}`}
                                        >
                                            {isRecording ? <MicOff size={18} strokeWidth={3} /> : <Mic size={18} strokeWidth={3} />}
                                        </button>
                                        <button
                                            onClick={handleSaveNote}
                                            disabled={!note.trim()}
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-all ${note.trim() ? 'bg-[#2D328C] text-white shadow-blue-200' : 'bg-gray-100 text-gray-300'}`}
                                        >
                                            {showSuccess ? <Check size={18} strokeWidth={4} /> : <Save size={18} strokeWidth={3} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* History Log */}
                        <div className="mt-10 space-y-4 pb-20">
                            <div className="flex items-center justify-between px-1">
                                <h3 className="text-[#1E226A] font-black text-[10px] uppercase tracking-[0.3em] italic">Archive Log</h3>
                                <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">{notes.length} Records</span>
                            </div>

                            {notes.length === 0 ? (
                                <div className="bg-gray-50/50 rounded-[2.5rem] py-16 flex flex-col items-center justify-center text-gray-200 border border-dashed border-gray-100">
                                    <StickyNote size={32} strokeWidth={1} />
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] mt-4 italic">No archive data</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {notes.map((n) => (
                                        <div key={n.id} className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-50 relative group active:border-[#2D328C]/20 transition-all">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1 bg-orange-400 h-2 rounded-full"></div>
                                                    <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">{n.date}</span>
                                                </div>
                                                <button onClick={() => deleteNote(n.id)} className="text-gray-200 hover:text-red-500 transition-colors">
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                            <p className="text-[11px] font-bold text-[#1E226A] leading-relaxed whitespace-pre-wrap italic opacity-80">{n.text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Notification Toast */}
            {showSuccess && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[300] bg-white border border-[#2D328C]/10 text-[#2D328C] px-6 py-3 rounded-2xl shadow-2xl flex items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 whitespace-nowrap">
                    <Check size={14} strokeWidth={4} className="text-emerald-500" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] italic">Record Archived Successfully</span>
                </div>
            )}

            <MobileNav />
        </div>
    );
};

export default UserPlanner;
