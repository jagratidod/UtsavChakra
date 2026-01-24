import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Bookmark } from 'lucide-react';
import { newsData } from '../../../data/newsData';

const NewsList = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-brand-light-pink pb-6">
            <header className="bg-white px-6 py-8 rounded-b-[40px] shadow-sm mb-6 sticky top-0 z-30">
                <div className="flex items-center gap-4">

                    <h1 className="text-2xl font-serif font-bold text-slate-800">Wedding News</h1>
                </div>
            </header>

            <div className="px-6 container mx-auto max-w-lg space-y-4">
                {newsData.map((news) => (
                    <div
                        key={news.id}
                        onClick={() => navigate(`/user/news/${news.id}`)}
                        className="bg-white rounded-[24px] p-4 flex gap-4 shadow-sm border border-slate-100 active:scale-95 transition-transform cursor-pointer"
                    >
                        <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden">
                            <img
                                src={news.image}
                                alt={news.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-between py-1">
                            <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-3">
                                {news.title}
                            </h3>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-brand-pink uppercase">{news.source}</span>
                                <span className="text-[10px] text-slate-400">Wedding News</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsList;
