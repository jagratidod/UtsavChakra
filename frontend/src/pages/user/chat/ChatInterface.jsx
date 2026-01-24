import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ChevronLeft, Phone, Video, MoreVertical,
    Smile, Paperclip, Mic, Send, Search,
    Camera, Menu
} from 'lucide-react';

const ChatInterface = () => {
    const { vendorId } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    // Dummy Data
    const chats = [
        {
            id: 1,
            name: "Royal Decorators",
            avatar: "https://images.unsplash.com/photo-1519225468359-2996bc01c34c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            lastMessage: "Thank you for contacting us!",
            time: "2:15 PM",
            unread: 0,
            online: true,
            isTyping: true
        },
        {
            id: 2,
            name: "Dream Events",
            avatar: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            lastMessage: "No problem, take care!",
            time: "11:25 AM",
            unread: 2,
            online: false,
            isTyping: false
        },
        {
            id: 10,
            name: "Glam Studio",
            avatar: "https://images.unsplash.com/photo-1571781948742-0ec7b5518a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            lastMessage: "Where are you located?",
            time: "5:30 PM",
            unread: 4,
            online: true,
            isTyping: false
        }
    ];

    const messages = [
        {
            id: 1,
            text: "Can you tell me if the venue is available for the 10th?",
            sender: "me",
            time: "1:40 PM",
            read: true
        },
        {
            id: 2,
            text: "Of course, let me check our calendar.",
            sender: "other",
            time: "1:44 PM",
            read: true
        },
        {
            id: 3,
            text: "We have a slot open in the evening.",
            sender: "other",
            time: "1:44 PM",
            read: true
        },
        {
            id: 4,
            text: "Perfect! Can we schedule a visit?",
            sender: "me",
            time: "2:15 PM",
            read: true
        }
    ];

    const activeChat = chats.find(c => c.id === Number(vendorId)) || chats[0];

    return (
        <div className="h-screen w-full bg-slate-50 font-sans">
            <div className="w-full h-full bg-white relative flex flex-col">

                {vendorId ? (
                    // Chat Interface
                    <>
                        {/* Premium Header */}
                        <div className="bg-gradient-to-r from-brand-pink to-[#E05275] p-6 pb-8 shadow-xl z-20 relative overflow-hidden">
                            {/* Decorative circles */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                            <div className="absolute top-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>

                            <div className="flex justify-between items-center text-white relative z-10">
                                <div className="flex items-center gap-4">

                                    <div className="flex items-center gap-3">
                                        <div className="relative group cursor-pointer" onClick={() => navigate(`/user/vendor/${activeChat.id}`)}>
                                            <img
                                                src={activeChat.avatar}
                                                alt={activeChat.name}
                                                className="w-11 h-11 rounded-full object-cover border-[3px] border-white/30 shadow-md group-hover:scale-105 transition-transform duration-300"
                                                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${activeChat.name.replace(' ', '+')}&background=random` }}
                                            />
                                            {activeChat.online && (
                                                <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-emerald-400 border-2 border-brand-pink rounded-full shadow-sm animate-pulse"></div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg leading-tight drop-shadow-sm cursor-pointer hover:underline decoration-white/50 underline-offset-4" onClick={() => navigate(`/user/vendor/${activeChat.id}`)}>{activeChat.name}</h3>
                                            <span className="inline-flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded-full text-[10px] backdrop-blur-sm border border-white/10 text-white/90 font-medium">
                                                {activeChat.online ? (
                                                    <><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online</>
                                                ) : 'Offline'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="hover:bg-white/20 p-2.5 rounded-full transition-all duration-300 hover:rotate-12 active:scale-95">
                                        <Video className="w-5 h-5 fill-current" />
                                    </button>
                                    <button className="hover:bg-white/20 p-2.5 rounded-full transition-all duration-300 hover:-rotate-12 active:scale-95">
                                        <Phone className="w-5 h-5 fill-current" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area - Glassmorphism Background */}
                        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 scroll-smooth bg-slate-50 relative">
                            {/* Subtle Background Pattern */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#E81B69 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>

                            <div className="flex justify-center mb-6">
                                <span className="bg-slate-200/60 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm backdrop-blur-sm">Today</span>
                            </div>

                            {messages.map((msg, index) => (
                                <div
                                    key={msg.id}
                                    className={`flex w-full items-end gap-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-500 fade-in`}
                                >
                                    {msg.sender === 'other' && (
                                        <img
                                            src={activeChat.avatar}
                                            alt="avatar"
                                            className="w-6 h-6 rounded-full object-cover mb-1 shadow-sm border border-white"
                                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${activeChat.name.replace(' ', '+')}&background=random` }}
                                        />
                                    )}
                                    <div className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'} max-w-[75%]`}>
                                        <div
                                            className={`px-5 py-3.5 shadow-md text-[15px] leading-relaxed relative group transition-all duration-200 hover:shadow-lg ${msg.sender === 'me'
                                                ? 'bg-gradient-to-br from-brand-pink to-[#E05275] text-white rounded-2xl rounded-tr-[2px]'
                                                : 'bg-white text-slate-700 rounded-2xl rounded-tl-[2px] border border-slate-100/50'
                                                }`}
                                        >
                                            <p>{msg.text}</p>
                                        </div>
                                        <span className={`text-[10px] font-medium mt-1.5 px-1 ${msg.sender === 'me' ? 'text-slate-400' : 'text-slate-400'
                                            }`}>
                                            {msg.time} {msg.read && msg.sender === 'me' && <span className="ml-1 text-brand-pink">✓✓</span>}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Premium Input Area */}
                        <div className="px-5 pb-6 pt-2 bg-slate-50 relative z-20">
                            <div className="flex items-end gap-3 transition-all duration-300">
                                <div className="flex-1 bg-white rounded-[24px] shadow-lg shadow-slate-200/50 flex items-center p-1.5 gap-2 border border-slate-100 transition-shadow focus-within:shadow-xl focus-within:ring-2 focus-within:ring-brand-pink/10">
                                    <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:text-yellow-500 hover:bg-yellow-50 transition-colors duration-300">
                                        <Smile className="w-5 h-5 transition-transform hover:scale-110" />
                                    </button>
                                    <textarea
                                        placeholder="Type a message..."
                                        className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 text-sm font-medium resize-none py-2.5 max-h-24 scrollbar-hide"
                                        rows={1}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                setMessage('');
                                            }
                                        }}
                                    />
                                    <button className="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:text-brand-pink hover:bg-brand-pink/5 transition-colors duration-300">
                                        <Paperclip className="w-5 h-5 transition-transform hover:rotate-45" />
                                    </button>
                                </div>
                                <button className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${message.trim()
                                    ? 'bg-gradient-to-r from-brand-pink to-[#E05275] text-white shadow-brand-pink/30'
                                    : 'bg-white text-brand-pink border border-brand-pink/10 shadow-slate-200'
                                    }`}>
                                    {message.trim() ? <Send className="w-5 h-5 pl-0.5" /> : <Mic className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    // Chat List Interface with Premium UI
                    <>
                        <div className="bg-gradient-to-r from-brand-pink to-[#E05275] p-6 pb-6 shadow-xl z-20 relative overflow-hidden">
                            {/* Decorative circles */}
                            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                            <div className="absolute top-12 -left-12 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

                            <div className="flex justify-between items-center text-white mb-6 relative z-10">
                                <button className="hover:bg-white/20 p-2 rounded-full transition-colors"><Menu className="w-6 h-6" /></button>
                                <h1 className="font-serif font-bold text-2xl tracking-wide drop-shadow-sm">Chattie</h1>
                                <button className="hover:bg-white/20 p-2 rounded-full transition-colors"><Camera className="w-6 h-6" /></button>
                            </div>


                        </div>

                        <div className="flex-1 overflow-y-auto bg-slate-50 pt-2 px-2 relative -mt-4 rounded-t-[32px] z-10 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                            <div className="px-4 pt-6 pb-2">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                                        Recent Chats <span className="text-xs bg-brand-pink/10 text-brand-pink px-2 py-0.5 rounded-full">3</span>
                                    </h2>
                                    <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Search className="w-5 h-5 text-slate-400" /></button>
                                </div>

                                <div className="space-y-3">
                                    {chats.map((chat, idx) => (
                                        <div
                                            key={chat.id}
                                            onClick={() => navigate(`/user/chat/${chat.id}`)}
                                            className="group flex items-center gap-4 cursor-pointer p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-brand-pink/20 transition-all duration-300 hover:-translate-y-0.5"
                                        >
                                            <div className="relative">
                                                <img
                                                    src={chat.avatar}
                                                    alt={chat.name}
                                                    className="w-14 h-14 rounded-full object-cover group-hover:scale-105 transition-transform duration-300 shadow-sm"
                                                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${chat.name.replace(' ', '+')}&background=random` }}
                                                />
                                                {chat.online && (
                                                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-[2.5px] border-white rounded-full shadow-sm"></div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start mb-1.5">
                                                    <h3 className="font-bold text-slate-800 truncate group-hover:text-brand-pink transition-colors">{chat.name}</h3>
                                                    <span className={`text-[11px] font-bold ${chat.unread > 0 ? 'text-brand-pink bg-brand-pink/5 px-2 py-0.5 rounded-full' : 'text-slate-400'}`}>{chat.time}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <p className={`text-sm truncate leading-relaxed max-w-[80%] ${chat.isTyping ? 'text-brand-pink font-semibold italic' : 'text-slate-500'}`}>
                                                        {chat.isTyping ? 'Typing...' : chat.lastMessage}
                                                    </p>
                                                    {chat.unread > 0 && (
                                                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-brand-pink to-[#E05275] text-white text-[10px] font-bold flex items-center justify-center shadow-sm shadow-brand-pink/30">
                                                            {chat.unread}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8">
                                    <h2 className="font-bold text-slate-800 text-lg mb-4 px-2">All Chats</h2>
                                    <div className="p-8 text-center bg-white border border-dashed border-slate-200 rounded-3xl">
                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Search className="w-8 h-8 text-slate-300" />
                                        </div>
                                        <p className="text-slate-400 font-medium text-sm">Start a new conversation with a vendor!</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Action Button */}
                        <div className="absolute bottom-6 right-6 z-30">
                            <button className="w-16 h-16 bg-gradient-to-tr from-brand-pink to-[#E05275] text-white rounded-[20px] shadow-xl shadow-brand-pink/40 flex items-center justify-center hover:scale-105 hover:rotate-6 transition-all duration-300 border-2 border-white/20">
                                <Search className="w-7 h-7 fill-current" />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ChatInterface;
