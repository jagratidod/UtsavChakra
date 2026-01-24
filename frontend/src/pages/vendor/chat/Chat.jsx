import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVendor } from '../../../context/VendorContext';
import {
    ArrowLeft, Phone, Video, MoreVertical,
    Smile, Paperclip, Mic, Send, Search,
    Camera, Menu, Check
} from 'lucide-react';

const VendorChat = () => {
    const { chatId } = useParams();
    const navigate = useNavigate();
    const { vendor } = useVendor();
    const [message, setMessage] = useState('');

    // Mock Chats Data (Clients)
    const chats = [
        {
            id: 1,
            name: "Priya Sharma",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
            lastMessage: "Is the date still available?",
            time: "2:15 PM",
            unread: 1,
            online: true,
            isTyping: false
        },
        {
            id: 2,
            name: "Rahul Verma",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
            lastMessage: "Thanks for the quote!",
            time: "11:25 AM",
            unread: 0,
            online: false,
            isTyping: false
        },
        {
            id: 3,
            name: "Anjali Gupta",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
            lastMessage: "We loved the portfolio photos.",
            time: "Yesterday",
            unread: 0,
            online: true,
            isTyping: true
        }
    ];

    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! We are interested in your wedding decoration services.",
            sender: "other",
            time: "1:40 PM",
            read: true
        },
        {
            id: 2,
            text: "Hi Priya! Thanks for reaching out. What is the date of the event?",
            sender: "me",
            time: "1:42 PM",
            read: true
        },
        {
            id: 3,
            text: "It is on December 15th at The Grand Hotel.",
            sender: "other",
            time: "1:44 PM",
            read: true
        },
        {
            id: 4,
            text: "Great! We are available on that date. Would you like to schedule a call?",
            sender: "me",
            time: "2:10 PM",
            read: true
        },
        {
            id: 5,
            text: "Is the date still available?",
            sender: "other",
            time: "2:15 PM",
            read: false
        }
    ]);

    const activeChat = chats.find(c => c.id === Number(chatId)) || chats[0];

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMsg = {
                id: messages.length + 1,
                text: message,
                sender: "me",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                read: false
            };
            setMessages([...messages, newMsg]);
            setMessage('');
        }
    };

    return (
        <div className="h-screen w-full bg-slate-50 font-sans flex flex-col">
            {chatId ? (
                // Chat Interface
                <>
                    {/* Header */}
                    <header className="bg-white shadow-sm px-4 py-3 z-20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/vendor/chat')}
                                className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img
                                        src={activeChat.avatar}
                                        alt={activeChat.name}
                                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                                    />
                                    {activeChat.online && (
                                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-sm">{activeChat.name}</h3>
                                    <p className="text-xs text-slate-500 leading-none">
                                        {activeChat.online ? 'Online' : 'Offline'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
                                <Phone className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </div>
                    </header>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex w-full ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex flex-col max-w-[75%] ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                                    <div
                                        className={`px-4 py-2 text-sm leading-relaxed rounded-2xl shadow-sm ${msg.sender === 'me'
                                                ? 'bg-brand-pink text-white rounded-tr-none'
                                                : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                                            }`}
                                    >
                                        <p>{msg.text}</p>
                                    </div>
                                    <div className="flex items-center gap-1 mt-1 px-1">
                                        <span className="text-[10px] text-slate-400 font-medium">
                                            {msg.time}
                                        </span>
                                        {msg.sender === 'me' && (
                                            <Check className={`w-3 h-3 ${msg.read ? 'text-brand-pink' : 'text-slate-300'}`} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="bg-white p-3 border-t border-slate-100">
                        <div className="flex items-end gap-2 bg-slate-50 rounded-2xl p-2 border border-slate-200">
                            <button className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-brand-pink hover:bg-brand-pink/10 transition-colors">
                                <Smile className="w-5 h-5" />
                            </button>
                            <textarea
                                placeholder="Message..."
                                className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 text-sm resize-none py-1.5 max-h-24"
                                rows={1}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                            />
                            <button
                                onClick={handleSendMessage}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${message.trim()
                                        ? 'bg-brand-pink text-white shadow-md'
                                        : 'bg-slate-200 text-slate-400'
                                    }`}
                            >
                                <Send className="w-4 h-4 ml-0.5" />
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                // Chat List
                <>
                    <header className="sticky top-0 z-30 bg-white shadow-sm px-6 py-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/vendor/dashboard')}
                                className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-xl font-serif font-bold text-slate-800">Messages</h1>
                                <p className="text-xs text-slate-400">Connect with your clients</p>
                            </div>
                        </div>
                    </header>

                    <main className="p-4">
                        {/* Search */}
                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search messages..."
                                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-200 shadow-sm focus:border-brand-pink outline-none text-sm transition-all"
                            />
                        </div>

                        {/* Chat List */}
                        <div className="space-y-3">
                            {chats.map((chat) => (
                                <div
                                    key={chat.id}
                                    onClick={() => navigate(`/vendor/chat/${chat.id}`)}
                                    className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer flex gap-4"
                                >
                                    <div className="relative">
                                        <img
                                            src={chat.avatar}
                                            alt={chat.name}
                                            className="w-12 h-12 rounded-full object-cover border border-slate-100"
                                        />
                                        {chat.online && (
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-slate-800 text-sm truncate">{chat.name}</h3>
                                            <span className={`text-xs font-medium ${chat.unread > 0 ? 'text-brand-pink' : 'text-slate-400'}`}>
                                                {chat.time}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className={`text-xs truncate max-w-[80%] ${chat.isTyping ? 'text-brand-pink italic' : 'text-slate-500'}`}>
                                                {chat.isTyping ? 'Typing...' : chat.lastMessage}
                                            </p>
                                            {chat.unread > 0 && (
                                                <div className="min-w-[18px] h-[18px] rounded-full bg-brand-pink text-white text-[10px] font-bold flex items-center justify-center px-1">
                                                    {chat.unread}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </main>
                </>
            )}
        </div>
    );
};

export default VendorChat;
