import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVendor } from '../../../context/VendorContext';
import {
    ArrowLeft, Star, MessageSquare, Reply, User,
    MoreVertical, ThumbsUp, X
} from 'lucide-react';

const VendorReviews = () => {
    const navigate = useNavigate();
    const { reviews, replyToReview, getStats } = useVendor();
    const stats = getStats();

    const [replyModal, setReplyModal] = useState({ open: false, reviewId: null, reviewText: '', clientName: '' });
    const [replyText, setReplyText] = useState('');

    const openReplyModal = (review) => {
        setReplyModal({
            open: true,
            reviewId: review.id,
            reviewText: review.review,
            clientName: review.userName
        });
        setReplyText('');
    };

    const handleSendReply = () => {
        if (replyText.trim()) {
            replyToReview(replyModal.reviewId, replyText);
            setReplyModal({ open: false, reviewId: null, reviewText: '', clientName: '' });
        }
    };

    // Calculate rating distribution
    const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
        star,
        count: reviews.filter(r => r.rating === star).length,
        percentage: reviews.length ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100 : 0
    }));

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
                        <p className="text-xs text-slate-400">See what clients are saying</p>
                    </div>
                </div>
            </header>

            <main className="p-6">
                {/* Rating Overview */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="text-center md:text-left">
                            <h2 className="text-5xl font-bold text-slate-800 mb-2">{stats.avgRating}</h2>
                            <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-5 h-5 ${star <= Math.round(parseFloat(stats.avgRating)) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-slate-500">Based on {reviews.length} reviews</p>
                        </div>

                        <div className="space-y-2">
                            {ratingDistribution.map((item) => (
                                <div key={item.star} className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 w-12 flex-shrink-0">
                                        <span className="text-sm font-medium text-slate-600">{item.star}</span>
                                        <Star className="w-3 h-3 text-slate-400" />
                                    </div>
                                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-amber-400 rounded-full"
                                            style={{ width: `${item.percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-slate-400 w-8 text-right">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                    {reviews.length > 0 ? reviews.map((review) => (
                        <div key={review.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                        {review.userImage ? (
                                            <img src={review.userImage} alt={review.userName} className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            <User className="w-5 h-5 text-slate-400" />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800 text-sm">{review.userName}</h4>
                                        <div className="flex items-center gap-2 text-xs text-slate-400">
                                            <span>{review.eventType}</span>
                                            <span>•</span>
                                            <span>{new Date(review.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center bg-amber-50 px-2 py-1 rounded-lg">
                                    <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-1" />
                                    <span className="text-xs font-bold text-amber-700">{review.rating}.0</span>
                                </div>
                            </div>

                            <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                {review.review}
                            </p>

                            {review.reply ? (
                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 ml-4 relative">
                                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-brand-pink rounded-l-xl"></div>
                                    <p className="text-xs font-bold text-brand-pink mb-1">Your Reply</p>
                                    <p className="text-sm text-slate-600">{review.reply}</p>
                                </div>
                            ) : (
                                <button
                                    onClick={() => openReplyModal(review)}
                                    className="text-sm font-medium text-brand-pink flex items-center gap-2 hover:underline"
                                >
                                    <Reply className="w-4 h-4" />
                                    Reply to review
                                </button>
                            )}
                        </div>
                    )) : (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                                <MessageSquare className="w-8 h-8 text-slate-300" />
                            </div>
                            <h3 className="font-semibold text-slate-600 mb-1">No reviews yet</h3>
                            <p className="text-sm text-slate-400">Reviews will appear here once clients rate your service</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Reply Modal */}
            {replyModal.open && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
                    <div className="bg-white w-full max-w-lg rounded-2xl p-6 animate-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-serif font-bold text-slate-800">Reply to {replyModal.clientName}</h3>
                            <button onClick={() => setReplyModal({ ...replyModal, open: false })}>
                                <X className="w-5 h-5 text-slate-400 hover:text-red-500" />
                            </button>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl mb-4 text-sm text-slate-600 italic border-l-4 border-brand-pink">
                            "{replyModal.reviewText}"
                        </div>

                        <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write your reply here..."
                            rows="4"
                            className="w-full p-4 rounded-xl bg-white border border-slate-200 focus:border-brand-pink outline-none resize-none text-sm mb-4"
                            autoFocus
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={() => setReplyModal({ ...replyModal, open: false })}
                                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 font-bold text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSendReply}
                                className="flex-1 py-3 rounded-xl bg-brand-pink text-white font-bold text-sm"
                            >
                                Post Reply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VendorReviews;
