import React, { useState } from 'react';
import { X, Phone, Check } from 'lucide-react';

const VendorSubscriptionModal = ({ isOpen, onClose }) => {
    const [selectedPlan, setSelectedPlan] = useState('12');

    if (!isOpen) return null;

    const plans = [
        { id: '1', duration: '1 Month', price: '499', popular: false },
        { id: '3', duration: '3 Month', price: '1497', popular: false },
        { id: '6', duration: '6 Months', price: '2994', popular: false },
        { id: '12', duration: '12 Months', price: '1999', popular: true, discount: '67% Off' },
    ];

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 overflow-y-auto overflow-x-hidden backdrop-blur-sm bg-black/40">
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 md:p-8">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold font-serif text-brand-pink mb-1">Wedding CRM Tool</h2>
                    <p className="text-sm text-slate-500">All-in-one CRM for wedding professionals</p>
                </div>

                {/* Hero Image */}
                <div className="mb-8 flex justify-center">
                    <div className="relative w-full h-48 md:h-56">
                        <img
                            src="/illustrations/wedding_crm_mockup.png"
                            alt="CRM App Preview"
                            className="w-full h-full object-contain drop-shadow-xl"
                        />
                    </div>
                </div>

                {/* Plans */}
                <div className="space-y-4 mb-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan.id)}
                            className={`relative cursor-pointer transition-all duration-300 rounded-2xl p-4 border-2 flex items-center justify-between group
                                ${plan.popular ? 'mt-6' : ''}
                                ${selectedPlan === plan.id
                                    ? 'border-brand-pink bg-pink-50/50 shadow-lg shadow-pink-100'
                                    : 'border-slate-100 hover:border-pink-100 bg-white'
                                }
                            `}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-pink text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-md">
                                    Popular Plan
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                                    ${selectedPlan === plan.id ? 'border-brand-pink bg-brand-pink' : 'border-slate-300 group-hover:border-brand-pink'}
                                `}>
                                    {selectedPlan === plan.id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm text-slate-500 font-medium">{plan.duration}</span>
                                    <span className="text-xl font-bold text-slate-800">₹ {plan.price}</span>
                                </div>
                            </div>

                            {plan.popular && plan.discount && (
                                <div className="text-brand-pink font-bold text-lg">
                                    {plan.discount}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <button className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-pink to-brand-dark-pink text-white font-bold text-lg shadow-lg shadow-brand-pink/30 hover:shadow-brand-pink/50 hover:scale-[1.02] transition-all active:scale-[0.98]">
                        Pay Now
                    </button>
                    <button className="w-full py-4 rounded-xl border-2 border-brand-pink text-brand-pink font-bold text-lg hover:bg-pink-50 transition-colors flex items-center justify-center gap-2">
                        <Phone className="w-5 h-5" />
                        Call For Enquiry & Demo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VendorSubscriptionModal;
