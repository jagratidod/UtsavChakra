import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Bookmark, Calendar, User } from 'lucide-react';
import { newsData } from '../../../data/newsData';

const NewsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [news, setNews] = useState(null);

    useEffect(() => {
        const foundNews = newsData.find(n => n.id === parseInt(id));
        if (foundNews) {
            setNews(foundNews);
        } else {
            navigate('/user/news'); // Fallback if invalid ID
        }
    }, [id, navigate]);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: news.title,
                    text: news.title,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    if (!news) return null;

    return (
        <div className="min-h-screen bg-brand-light-pink pb-24">
            {/* Header Image */}
            <div className="relative h-72">
                <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-6 left-6 right-6 flex justify-end items-center">
                    <div className="flex gap-3">
                        <button
                            onClick={handleShare}
                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="relative -mt-10 bg-white rounded-t-[40px] px-6 py-8 min-h-screen animate-in slide-in-from-bottom-4 duration-500">
                <div className="mx-auto max-w-lg">
                    <span className="inline-block px-3 py-1 rounded-full bg-brand-pink/10 text-brand-pink text-xs font-bold uppercase tracking-wider mb-4">
                        Wedding News
                    </span>

                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 leading-tight mb-4">
                        {news.title}
                    </h1>

                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-8 border-b border-slate-100 pb-6">
                        <div className="flex items-center gap-1.5">
                            <User className="w-4 h-4 text-brand-pink" />
                            {news.source}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-brand-pink" />
                            {news.date}
                        </div>
                    </div>

                    <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed font-sans">
                        <p>{news.content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsDetail;
