import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Star, MessageSquare, ThumbsUp, Calendar,
    ChevronDown, Reply
} from 'lucide-react';

const VendorReviews = () => {
    const navigate = useNavigate();
    const [showReplyModal, setShowReplyModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [replyText, setReplyText] = useState('');

    // Mock data
    const stats = {
        averageRating: 4.8,
        totalReviews: 156,
        fiveStars: 120,
        fourStars: 28,
        threeStars: 6,
        twoStars: 2,
        oneStars: 0
    };

    const reviews = [
        {
            id: 1,
            userName: "Priya Sharma",
            eventType: "Wedding",
            rating: 5,
            date: "2026-01-18",
            review: "Absolutely amazing decoration! The team was professional and the setup was beyond our expectations. Every detail was perfect. Highly recommend!",
            reply: null
        },
        {
            id: 2,
            userName: "Rahul Verma",
            eventType: "Birthday Party",
            rating: 4,
            date: "2026-01-12",
            review: "Great work on the decoration. The team arrived on time and the setup looked beautiful. Minor delay in final touches but overall satisfied.",
            reply: "Thank you Rahul! We appreciate your feedback and will work on improving our timing."
        },
        {
            id: 3,
            userName: "Anita Gupta",
            eventType: "Anniversary",
            rating: 5,
            date: "2026-01-05",
            review: "Made our 25th anniversary so special! The floral arrangements were stunning and the stage decoration was exactly what we wanted.",
            reply: null
        },
        {
            id: 4,
            userName: "Karan Singh",
            eventType: "Engagement",
            rating: 5,
            date: "2025-12-28",
            review: "Best decision we made for our engagement! The ambiance created was magical. Worth every penny!",
            reply: "Thank you so much Karan! It was our pleasure to be part of your special day."
        },
    ];

    const handleReply = (review) => {
        setSelectedReview(review);
        setReplyText('');
        setShowReplyModal(true);
    };

    const submitReply = () => {
        console.log("Reply to review", selectedReview.id, ":", replyText);
        setShowReplyModal(false);
    };

    const renderStars = (rating, size = 'w-4 h-4') => {
        return [...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`${size} ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
            />
        ));
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
                        <h1 className="text-xl font-serif font-bold text-slate-800">Reviews & Ratings</h1>
                        <p className="text-xs text-slate-400">See what clients say about you</p>
                    </div>
                </div>
            </header>

            <main className="p-6">
                {/* Rating Overview Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <p className="text-5xl font-bold text-slate-800 mb-1">{stats.averageRating}</p>
                            <div className="flex justify-center mb-1">
                                {renderStars(Math.round(stats.averageRating), 'w-5 h-5')}
                            </div>
                            <p className="text-xs text-slate-400">{stats.totalReviews} reviews</p>
                        </div>
                        <div className="flex-1 space-y-2">
                            {[5, 4, 3, 2, 1].map((stars) => {
                                const count = stats[`${['one', 'two', 'three', 'four', 'five'][stars - 1]}Stars`];
                                const percentage = (count / stats.totalReviews) * 100;
                                return (
                                    <div key={stars} className="flex items-center gap-2">
                                        <span className="text-xs text-slate-500 w-3">{stars}</span>
                                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-amber-400 rounded-full"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-slate-400 w-8">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-serif font-bold text-slate-800">All Reviews</h3>
                        <button className="flex items-center gap-1 text-sm text-slate-600 bg-white px-3 py-2 rounded-xl border border-slate-200">
                            Most Recent
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>

                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-pink to-brand-dark-pink flex items-center justify-center text-white font-bold">
                                        {review.userName.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800">{review.userName}</h4>
                                        <div className="flex items-center gap-2">
                                            <div className="flex">{renderStars(review.rating)}</div>
                                            <span className="text-xs text-slate-400">• {review.eventType}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-400">
                                    {new Date(review.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                </p>
                            </div>

                            <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                {review.review}
                            </p>

                            {review.reply ? (
                                <div className="bg-slate-50 rounded-xl p-4 border-l-4 border-brand-pink">
                                    <p className="text-xs text-brand-pink font-bold uppercase tracking-wider mb-1">Your Reply</p>
                                    <p className="text-sm text-slate-600">{review.reply}</p>
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleReply(review)}
                                    className="flex items-center gap-2 text-sm text-brand-pink font-medium hover:underline"
                                >
                                    <Reply className="w-4 h-4" />
                                    Reply to review
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </main>

            {/* Reply Modal */}
            {showReplyModal && selectedReview && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
                    <div className="bg-white w-full max-w-lg rounded-t-[32px] p-6 animate-in slide-in-from-bottom duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-serif font-bold text-slate-800">Reply to {selectedReview.userName}</h3>
                            <button
                                onClick={() => setShowReplyModal(false)}
                                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-4 mb-4">
                            <div className="flex mb-2">{renderStars(selectedReview.rating)}</div>
                            <p className="text-sm text-slate-600">{selectedReview.review}</p>
                        </div>

                        <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write your reply..."
                            rows="4"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-pink outline-none resize-none text-sm mb-4"
                        />

                        <button
                            onClick={submitReply}
                            disabled={!replyText.trim()}
                            className="w-full py-4 rounded-xl bg-brand-pink text-white font-bold text-sm shadow-lg shadow-brand-pink/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Post Reply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VendorReviews;
