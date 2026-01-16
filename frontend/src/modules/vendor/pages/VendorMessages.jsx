import React, { useState } from 'react';
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
    Sparkles
} from 'lucide-react';

const VendorMessages = () => {
    const navigate = useNavigate();
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState('');

    const chats = [
        {
            id: 1,
            name: 'Julliet Yirrah',
            lastMessage: 'Is the banquet hall available on June 15th?',
            time: '12:45 PM',
            unread: 2,
            avatar: 'https://i.pravatar.cc/150?u=julliet',
            status: 'online'
        },
        {
            id: 2,
            name: 'Rahul Sharma',
            lastMessage: 'Thank you for the quote. I will discuss with my family.',
            time: '10:30 AM',
            unread: 0,
            avatar: 'https://i.pravatar.cc/150?u=rahul',
            status: 'offline'
        },
        {
            id: 3,
            name: 'Priya Patel',
            lastMessage: 'Can we schedule a site visit tomorrow?',
            time: 'Yesterday',
            unread: 1,
            avatar: 'https://i.pravatar.cc/150?u=priya',
            status: 'online'
        },
        {
            id: 4,
            name: 'Ankit Verma',
            lastMessage: 'The decoration looks amazing!',
            time: 'Yesterday',
            unread: 0,
            avatar: 'https://i.pravatar.cc/150?u=ankit',
            status: 'offline'
        }
    ];

    const messages = [
        { id: 1, text: 'Hello! I saw your portfolio and loved the floral arrangements.', sender: 'customer', time: '10:00 AM' },
        { id: 2, text: 'Thank you so much! We specialize in premium destination weddings. How can I help you?', sender: 'vendor', time: '10:05 AM' },
        { id: 3, text: 'Are you available for a wedding on June 15th?', sender: 'customer', time: '10:10 AM' },
        { id: 4, text: 'Let me check my calendar... Yes, we have that date open!', sender: 'vendor', time: '10:12 AM' },
        { id: 5, text: 'Great! Can you send me a basic quote for 500 guests?', sender: 'customer', time: '10:15 AM' }
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans max-h-screen overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => selectedChat ? setSelectedChat(null) : navigate(-1)}
                        className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-800 active:scale-95 transition-all"
                    >
                        <ChevronLeft size={20} strokeWidth={2.5} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black text-gray-900 tracking-tight leading-none">
                            {selectedChat ? selectedChat.name : 'Customer Chat'}
                        </h1>
                        <p className="text-[10px] font-bold text-[#FF4D6D] uppercase tracking-widest mt-1">
                            {selectedChat ? (selectedChat.status === 'online' ? 'Online Now' : 'Last seen 2h ago') : 'Inbox (3)'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {selectedChat ? (
                        <>
                            <button className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                                <Phone size={18} />
                            </button>
                            <button className="w-10 h-10 rounded-2xl bg-pink-50 flex items-center justify-center text-[#FF4D6D]">
                                <Video size={18} />
                            </button>
                        </>
                    ) : (
                        <button className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                            <Search size={18} />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col">
                {!selectedChat ? (
                    /* Chat List View */
                    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 scrollbar-hide">
                        {chats.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => setSelectedChat(chat)}
                                className="flex items-center gap-4 p-4 rounded-[2rem] bg-gray-50/50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all border border-transparent hover:border-gray-100 group cursor-pointer"
                            >
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-sm">
                                        <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                                    </div>
                                    {chat.status === 'online' && (
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-0.5">
                                        <h3 className="text-sm font-black text-gray-900 truncate tracking-tight">{chat.name}</h3>
                                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{chat.time}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 truncate group-hover:text-gray-900 transition-colors">
                                        {chat.lastMessage}
                                    </p>
                                </div>
                                {chat.unread > 0 && (
                                    <div className="w-5 h-5 bg-[#FF4D6D] rounded-full flex items-center justify-center">
                                        <span className="text-[10px] font-bold text-white leading-none">{chat.unread}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Active Chat Message View */
                    <>
                        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 scrollbar-hide bg-gray-50/30">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'vendor' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] flex flex-col ${msg.sender === 'vendor' ? 'items-end' : 'items-start'}`}>
                                        <div className={`px-5 py-4 rounded-[1.5rem] text-sm font-medium shadow-sm leading-relaxed ${msg.sender === 'vendor'
                                                ? 'bg-[#FF4D6D] text-white rounded-tr-none'
                                                : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                            }`}>
                                            {msg.text}
                                        </div>
                                        <div className="flex items-center gap-1 mt-2 px-1">
                                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{msg.time}</span>
                                            {msg.sender === 'vendor' && <CheckCheck size={12} className="text-[#FF4D6D]" />}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Message Input Container */}
                        <div className="px-6 py-6 bg-white border-t border-gray-100 flex items-center gap-3">
                            <button className="w-11 h-11 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-pink-50 hover:text-[#FF4D6D] transition-all">
                                <Plus size={20} />
                            </button>
                            <div className="flex-1 bg-gray-50 rounded-2xl px-6 py-3 flex items-center gap-3 border border-transparent focus-within:border-[#FF4D6D]/20 focus-within:bg-white transition-all">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="bg-transparent border-none outline-none flex-1 text-sm font-bold text-gray-800 placeholder:text-gray-300"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <div className="flex items-center gap-2 text-gray-300">
                                    <Smile size={20} className="cursor-pointer hover:text-gray-600" />
                                    <Paperclip size={20} className="cursor-pointer hover:text-gray-600" />
                                </div>
                            </div>
                            <button className="w-11 h-11 rounded-2xl bg-[#FF4D6D] flex items-center justify-center text-white shadow-lg shadow-pink-100 active:scale-90 transition-all">
                                <Send size={18} />
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Quick Action Button */}
            {!selectedChat && (
                <div className="fixed bottom-24 right-6">
                    <button className="w-14 h-14 bg-[#FF4D6D] rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl shadow-pink-200 active:rotate-12 transition-all">
                        <Plus size={28} strokeWidth={3} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default VendorMessages;
