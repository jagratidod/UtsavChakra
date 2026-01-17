import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    Search,
    MoreVertical,
    CheckCheck,
    Phone,
    Video,
    Send,
    Smile,
    Paperclip,
    Plus,
    User,
    Sparkles,
    Star,
    ArrowLeft,
    Image as ImageIcon,
    Users
} from 'lucide-react';

const VendorMessages = () => {
    const navigate = useNavigate();
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState('');
    const [animatedPlaceholder, setAnimatedPlaceholder] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const placeholders = [
        "Search customers...",
        "Find Julliet Yirrah...",
        "Search active leads...",
        "Filter unread messages..."
    ];

    useEffect(() => {
        let currentStringIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let timeout;

        const animate = () => {
            const currentString = placeholders[currentStringIndex];

            if (isDeleting) {
                setAnimatedPlaceholder(currentString.substring(0, currentCharIndex - 1));
                currentCharIndex--;
            } else {
                setAnimatedPlaceholder(currentString.substring(0, currentCharIndex + 1));
                currentCharIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && currentCharIndex === currentString.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentStringIndex = (currentStringIndex + 1) % placeholders.length;
                typeSpeed = 500;
            }

            timeout = setTimeout(animate, typeSpeed);
        };

        animate();
        return () => clearTimeout(timeout);
    }, []);

    const chats = [
        {
            id: 1,
            name: 'Julliet Yirrah',
            lastMessage: 'Is the banquet hall available on June 15th?',
            time: '12:45 PM',
            unread: 2,
            avatar: 'https://i.pravatar.cc/150?u=julliet',
            status: 'online',
            category: 'New Lead'
        },
        {
            id: 2,
            name: 'Rahul Sharma',
            lastMessage: 'Thank you for the quote. I will discuss with my family.',
            time: '10:30 AM',
            unread: 0,
            avatar: 'https://i.pravatar.cc/150?u=rahul',
            status: 'offline',
            category: 'Negotiation'
        },
        {
            id: 3,
            name: 'Priya Patel',
            lastMessage: 'Can we schedule a site visit tomorrow?',
            time: 'Yesterday',
            unread: 1,
            avatar: 'https://i.pravatar.cc/150?u=priya',
            status: 'online',
            category: 'Site Visit'
        },
        {
            id: 4,
            name: 'Ankit Verma',
            lastMessage: 'The decoration looks amazing!',
            time: 'Yesterday',
            unread: 0,
            avatar: 'https://i.pravatar.cc/150?u=ankit',
            status: 'offline',
            category: 'Review'
        }
    ];

    const messages = [
        { id: 1, text: 'Hello! I saw your portfolio and loved the floral arrangements.', sender: 'customer', time: '10:00 AM' },
        { id: 2, text: 'Thank you so much! We specialize in premium destination weddings. How can I help you?', sender: 'vendor', time: '10:05 AM' },
        { id: 3, text: 'Are you available for a wedding on June 15th?', sender: 'customer', time: '10:10 AM' },
        { id: 4, text: 'Let me check my calendar... Yes, we have that date open!', sender: 'vendor', time: '10:12 AM' },
        { id: 5, text: 'Great! Can you send me a basic quote for 500 guests?', sender: 'customer', time: '10:15 AM' }
    ];

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#FDFCFD] flex flex-col font-sans max-h-screen overflow-hidden relative max-w-[440px] mx-auto shadow-2xl shadow-gray-200/50 border-x border-gray-50">
            {/* Liquid Background Decorations */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FF4D6D]/5 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-50/50 rounded-full blur-[120px]"></div>
            </div>

            {/* Premium Header */}
            <header className="relative z-50 bg-white/80 backdrop-blur-2xl border-b border-gray-100/50 px-6 py-4 flex items-center gap-4 shrink-0 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
                {selectedChat ? (
                    <button
                        onClick={() => setSelectedChat(null)}
                        className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-800 active:scale-90 transition-all hover:bg-white hover:shadow-lg shadow-gray-200/50"
                    >
                        <ArrowLeft size={20} strokeWidth={2.5} />
                    </button>
                ) : (
                    <div className="w-10 h-10 flex items-center justify-center text-[#FF4D6D] bg-pink-50 rounded-2xl">
                        <Users size={22} />
                    </div>
                )}

                {!selectedChat ? (
                    <div className="flex-1 flex flex-col">
                        <h1 className="text-2xl font-script text-[#FF4D6D] tracking-tight leading-none">Customer Chat</h1>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Manage Your Leads</p>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-11 h-11 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                                    <img src={selectedChat.avatar} className="w-full h-full object-cover" alt={selectedChat.name} />
                                </div>
                                {selectedChat.status === 'online' && (
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm animate-pulse"></div>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-sm font-black text-gray-900 leading-none truncate max-w-[140px] tracking-tight">
                                    {selectedChat.name}
                                </h2>
                                <span className="text-[9px] font-bold text-[#FF4D6D] uppercase tracking-widest mt-1">
                                    {selectedChat.category} • {selectedChat.status === 'online' ? 'Online' : 'Yesterday'}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <button className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#FF4D6D] hover:bg-pink-50 transition-all active:scale-90">
                                <Phone size={18} />
                            </button>
                            <button className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#FF4D6D] hover:bg-pink-50 transition-all active:scale-90">
                                <Video size={18} />
                            </button>
                            <button className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all">
                                <MoreVertical size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </header>

            <main className="flex-1 relative z-10 flex flex-col overflow-hidden">
                {!selectedChat ? (
                    /* Search & List View */
                    <div className="flex flex-col h-full bg-transparent">
                        <div className="px-6 py-6 pb-2">
                            <div className="relative group">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#FF4D6D] transition-all duration-300">
                                    <Search size={20} />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={animatedPlaceholder}
                                    className="w-full h-16 bg-white/50 backdrop-blur-md border-2 border-transparent rounded-[2rem] pl-14 pr-6 text-sm font-bold text-gray-800 outline-none focus:bg-white focus:border-[#FF4D6D]/10 focus:ring-8 focus:ring-pink-500/5 transition-all shadow-sm placeholder:text-gray-300"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-hide">
                            {filteredChats.length > 0 ? (
                                filteredChats.map((chat, idx) => (
                                    <div
                                        key={chat.id}
                                        onClick={() => setSelectedChat(chat)}
                                        className="flex items-center gap-4 p-4 rounded-[2.8rem] bg-white border border-gray-50 hover:border-pink-100 hover:shadow-[0_20px_50px_rgba(255,77,109,0.08)] hover:-translate-y-1 transition-all duration-500 group cursor-pointer animate-in fade-in slide-in-from-bottom-5 relative overflow-hidden"
                                        style={{ animationDelay: `${idx * 100}ms` }}
                                    >
                                        {/* Pure Glass Highlight on Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-pink-50/0 via-pink-50/0 to-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                        <div className="relative shrink-0 z-10">
                                            <div className="w-16 h-16 rounded-[2rem] overflow-hidden border-2 border-white shadow-md ring-4 ring-gray-50 group-hover:ring-[#FF4D6D]/10 transition-all duration-500">
                                                <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            </div>
                                            {chat.status === 'online' && (
                                                <div className="absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 bg-emerald-500 rounded-full border-[3px] border-white shadow-sm ring-2 ring-emerald-50 animate-pulse"></div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0 z-10">
                                            <div className="flex justify-between items-center mb-1">
                                                <h3 className="text-[15px] font-black text-gray-900 truncate tracking-tight group-hover:text-[#FF4D6D] transition-colors pr-2">
                                                    {chat.name}
                                                </h3>
                                                <span className="text-[10px] font-black text-gray-300 group-hover:text-gray-400 transition-colors whitespace-nowrap">{chat.time}</span>
                                            </div>

                                            <div className="flex items-center gap-2 mb-1.5">
                                                <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest transition-colors ${chat.category === 'New Lead' ? 'bg-pink-50 text-[#FF4D6D]' : 'bg-gray-50 text-gray-400'}`}>
                                                    {chat.category}
                                                </span>
                                            </div>

                                            <p className="text-[13px] font-medium text-gray-500 truncate group-hover:text-gray-700 transition-colors leading-tight">
                                                {chat.lastMessage}
                                            </p>
                                        </div>

                                        {chat.unread > 0 && (
                                            <div className="shrink-0 z-10 ml-2">
                                                <div className="w-6 h-6 bg-gradient-to-r from-[#FF4D6D] to-[#FF8E53] rounded-2xl flex items-center justify-center shadow-lg shadow-pink-200 transform group-hover:scale-110 transition-transform font-black text-[10px] text-white">
                                                    {chat.unread}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in-95 duration-700">
                                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-gray-200 mb-8 shadow-inner border border-gray-100">
                                        <Search size={40} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-lg font-black text-gray-900 tracking-tight">No Customers Found</h3>
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-2 px-10 leading-relaxed max-w-sm">
                                        We couldn't find any customers matching "{searchQuery}"
                                    </p>
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="mt-10 px-8 py-3 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                                    >
                                        Global Search
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    /* Single Chat View */
                    <div className="flex flex-col h-full bg-gray-50/20 shadow-inner">
                        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8 scrollbar-hide">
                            <div className="flex justify-center">
                                <div className="px-5 py-2 rounded-2xl bg-white/60 backdrop-blur-md border border-gray-100 shadow-sm">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Inquiry Started</p>
                                </div>
                            </div>

                            {messages.map((msg, idx) => (
                                <div
                                    key={msg.id}
                                    className={`flex items-end gap-2 ${msg.sender === 'vendor' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-500`}
                                    style={{ animationDelay: `${idx * 150}ms` }}
                                >
                                    {msg.sender === 'customer' && (
                                        <div className="w-8 h-8 rounded-xl overflow-hidden border border-white shadow-sm shrink-0 mb-1">
                                            <img src={selectedChat.avatar} className="w-full h-full object-cover" alt="Avatar" />
                                        </div>
                                    )}
                                    <div className="max-w-[75%] group">
                                        <div className={`px-5 py-4 rounded-[2rem] text-sm font-semibold leading-relaxed shadow-sm transition-all duration-300 ${msg.sender === 'vendor'
                                            ? 'bg-gradient-to-br from-[#FF4D6D] to-[#FF8E53] text-white rounded-br-none shadow-pink-200/40'
                                            : 'bg-white text-gray-800 rounded-bl-none border border-gray-100 shadow-gray-200/20'
                                            }`}>
                                            {msg.text}
                                        </div>
                                        <div className={`flex items-center gap-1.5 mt-2 px-2 ${msg.sender === 'vendor' ? 'justify-end' : 'justify-start'}`}>
                                            <span className="text-[9px] font-black text-gray-300 uppercase tracking-tighter">{msg.time}</span>
                                            {msg.sender === 'vendor' && <CheckCheck size={14} className="text-[#FF4D6D]" />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Enhanced Message Input Container */}
                        <div className="px-6 py-6 pb-10 bg-white border-t border-gray-50 flex items-end gap-3 transition-all duration-300">
                            <div className="flex flex-col gap-2">
                                <button className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#FF4D6D] hover:bg-pink-50 transition-all border border-transparent hover:border-pink-100 shadow-sm active:scale-90 mb-1">
                                    <Plus size={20} />
                                </button>
                            </div>

                            <div className="flex-1 min-h-[56px] bg-gray-50/50 rounded-[1.8rem] px-6 py-3.5 flex items-center gap-3 border-2 border-transparent focus-within:border-pink-100 focus-within:bg-white focus-within:shadow-2xl focus-within:shadow-pink-500/5 transition-all">
                                <textarea
                                    rows="1"
                                    placeholder="Reply to customer..."
                                    className="bg-transparent border-none outline-none flex-1 text-[13px] font-bold text-gray-800 placeholder:text-gray-300 resize-none max-h-32"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onInput={(e) => {
                                        e.target.style.height = 'auto';
                                        e.target.style.height = e.target.scrollHeight + 'px';
                                    }}
                                />
                                <div className="flex items-center gap-3 text-gray-300 pr-1">
                                    <Smile size={22} className="cursor-pointer hover:text-[#FF4D6D] transition-colors" />
                                    <ImageIcon size={22} className="cursor-pointer hover:text-[#FF4D6D] transition-colors" />
                                </div>
                            </div>

                            <button
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${message.trim() ? 'bg-gradient-to-r from-[#FF4D6D] to-[#FF8E53] text-white shadow-xl shadow-pink-200 scale-100' : 'bg-gray-100 text-gray-300 scale-95 opacity-50'}`}
                                disabled={!message.trim()}
                            >
                                <Send size={24} className={message.trim() ? "translate-x-0.5 -translate-y-0.5" : ""} />
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default VendorMessages;
