import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    MoreVertical,
    CheckCheck,
    Phone,
    Send,
    Plus,
    Sparkles,
    ArrowLeft,
    Image as ImageIcon,
    Smile
} from 'lucide-react';
import MobileNav from '../components/MobileNav';

const UserMessages = () => {
    const navigate = useNavigate();
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState('');
    const [animatedPlaceholder, setAnimatedPlaceholder] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const placeholders = ["Search...", "Find vendors...", "Message..."];

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
            let typeSpeed = isDeleting ? 30 : 60;
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
        { id: 1, name: 'Sri Balaji Events', lastMessage: 'Yes, we have that date open!', time: '12:45 PM', unread: 1, avatar: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=150', status: 'online', category: 'Planner' },
        { id: 2, name: 'Rose Garden Banquet', lastMessage: 'Quote sent for 500 guests.', time: '10:30 AM', unread: 0, avatar: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=150', status: 'offline', category: 'Venue' },
        { id: 3, name: 'Premium Decorators', lastMessage: 'Discussion for themes?', time: 'Yesterday', unread: 0, avatar: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=150', status: 'online', category: 'Decoration' }
    ];

    const messages = [
        { id: 1, text: 'Hello! Loved your portfolio.', sender: 'user', time: '10:00 AM' },
        { id: 2, text: 'Thank you! We specialize in destination weddings.', sender: 'vendor', time: '10:05 AM' },
        { id: 3, text: 'Available for June 15th?', sender: 'user', time: '10:10 AM' },
        { id: 4, text: 'Yes, we have that date open!', sender: 'vendor', time: '10:12 AM' }
    ];

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans max-h-screen overflow-hidden relative max-w-[440px] mx-auto shadow-[0_0_50px_rgba(0,0,0,0.05)]">
            {/* Minimal Compact Header */}
            <header className={`relative z-50 bg-[#2D328C] px-5 py-5 transition-all duration-300 rounded-b-[2rem] shadow-xl overflow-hidden shrink-0`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>

                <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {selectedChat ? (
                            <button onClick={() => setSelectedChat(null)} className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white active:scale-95 transition-all">
                                <ArrowLeft size={16} strokeWidth={3} />
                            </button>
                        ) : (
                            <div className="w-8 h-8 bg-orange-400/20 rounded-xl flex items-center justify-center text-orange-400">
                                <Sparkles size={18} />
                            </div>
                        )}

                        <div className="flex flex-col">
                            {!selectedChat ? (
                                <h1 className="text-sm font-black text-white tracking-widest uppercase italic">Messages</h1>
                            ) : (
                                <>
                                    <h1 className="text-xs font-black text-white uppercase tracking-tight truncate max-w-[120px]">{selectedChat.name}</h1>
                                    <span className="text-[8px] font-bold text-orange-400 uppercase tracking-widest leading-none mt-1">{selectedChat.category}</span>
                                </>
                            )}
                        </div>
                    </div>

                    {selectedChat && (
                        <div className="flex items-center gap-2">
                            <button className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white"><Phone size={14} /></button>
                            <button className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white"><MoreVertical size={14} /></button>
                        </div>
                    )}
                </div>
            </header>

            <main className="flex-1 relative z-10 flex flex-col overflow-hidden">
                {!selectedChat ? (
                    <div className="flex flex-col h-full">
                        {/* Compact Minimal Search */}
                        <div className="px-5 mt-4">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={animatedPlaceholder}
                                    className="w-full h-10 bg-gray-50 rounded-xl pl-10 pr-4 text-[11px] font-bold text-[#1E226A] outline-none border border-gray-100 transition-all focus:bg-white focus:border-blue-200"
                                />
                            </div>
                        </div>

                        {/* Minimal Stories */}
                        <div className="px-5 py-5 overflow-x-auto no-scrollbar flex gap-4 shrink-0 mt-2">
                            {chats.map(chat => (
                                <div key={chat.id} className="flex flex-col items-center gap-1.5 shrink-0">
                                    <div className={`p-0.5 rounded-[1rem] border ${chat.status === 'online' ? 'border-[#2D328C]' : 'border-gray-50'}`}>
                                        <div className="w-11 h-11 rounded-[0.8rem] overflow-hidden bg-gray-100 border border-white">
                                            <img src={chat.avatar} className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                    <span className="text-[8px] font-black text-[#1E226A] uppercase tracking-tighter w-11 text-center truncate">{chat.name.split(' ')[0]}</span>
                                </div>
                            ))}
                        </div>

                        {/* Refined Chat List */}
                        <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-2 no-scrollbar">
                            <h3 className="text-[#1E226A] font-black text-[8px] uppercase tracking-[0.2em] pl-1 opacity-30 mb-3">Recent Messages</h3>
                            {filteredChats.map((chat, idx) => (
                                <div
                                    key={chat.id}
                                    onClick={() => setSelectedChat(chat)}
                                    className="flex items-center gap-3 p-3 rounded-[1.5rem] bg-white border border-gray-50 active:bg-blue-50/30 transition-all duration-300 group"
                                >
                                    <div className="relative shrink-0">
                                        <div className="w-12 h-12 rounded-[1rem] overflow-hidden border border-gray-50">
                                            <img src={chat.avatar} className="w-full h-full object-cover" />
                                        </div>
                                        {chat.status === 'online' && (
                                            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-0.5">
                                            <h4 className="text-[12px] font-black text-[#1E226A] truncate uppercase tracking-tight">{chat.name}</h4>
                                            <span className="text-[7px] font-black text-gray-300 uppercase">{chat.time}</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-gray-400 truncate leading-none mb-1.5">{chat.lastMessage}</p>
                                        <span className="px-1.5 py-0.5 bg-gray-50 text-[7px] font-black text-[#2D328C] rounded uppercase tracking-wider">{chat.category}</span>
                                    </div>
                                    {chat.unread > 0 && (
                                        <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-[7px] font-black text-white shadow-lg">
                                            {chat.unread}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col h-full bg-[#FCFCFD]">
                        {/* Compact Chat Messages */}
                        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 no-scrollbar pb-32">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-end gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.sender === 'vendor' && (
                                        <div className="w-6 h-6 rounded-lg overflow-hidden border border-white shadow-sm shrink-0 mb-1">
                                            <img src={selectedChat.avatar} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className={`max-w-[80%]`}>
                                        <div className={`px-4 py-3 rounded-[1.2rem] text-[11px] font-bold leading-normal ${msg.sender === 'user'
                                            ? 'bg-[#2D328C] text-white rounded-br-none shadow-lg shadow-blue-900/10'
                                            : 'bg-white text-[#1E226A] border border-gray-100 rounded-bl-none shadow-sm'
                                            }`}>
                                            {msg.text}
                                        </div>
                                        <div className={`flex items-center gap-1 mt-1 px-1 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <span className="text-[7px] font-black text-gray-300 uppercase">{msg.time}</span>
                                            {msg.sender === 'user' && <CheckCheck size={10} className="text-orange-400" />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Minimal Compact Input Area */}
                        <div className="px-5 py-4 pb-8 bg-white border-t border-gray-50 flex items-center gap-2.5 fixed bottom-0 max-w-[440px] w-full z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
                            <button className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 active:scale-90 transition-all shrink-0">
                                <Plus size={18} />
                            </button>
                            <div className="flex-1 h-10 bg-gray-50 rounded-xl px-4 flex items-center gap-3 focus-within:bg-white border border-transparent focus-within:border-blue-100 transition-all">
                                <input
                                    className="bg-transparent border-none outline-none flex-1 text-[11px] font-bold text-[#1E226A] placeholder:text-gray-300"
                                    placeholder="Type..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <Smile size={16} className="text-gray-300 cursor-pointer" />
                            </div>
                            <button
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${message.trim() ? 'bg-[#2D328C] text-white shadow-blue-200' : 'bg-gray-100 text-gray-300'}`}
                                disabled={!message.trim()}
                            >
                                <Send size={16} className={message.trim() ? 'translate-x-[1px]' : ''} />
                            </button>
                        </div>
                    </div>
                )}
            </main>

            {!selectedChat && <MobileNav />}
        </div>
    );
};

export default UserMessages;
