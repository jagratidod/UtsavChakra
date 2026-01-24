import React, { createContext, useContext, useState, useEffect } from 'react';

const VendorContext = createContext();

// Initial vendor data structure
const initialVendorData = {
    id: 'vendor_001',
    businessName: "Royal Events & Decorations",
    category: "Wedding Decoration",
    tagline: "Creating Magical Moments Since 2015",
    about: "We specialize in luxury wedding decorations and event styling. Our team of creative designers transforms venues into dreamlike settings.",
    experience: 8,
    teamSize: 15,
    eventsCompleted: 520,
    priceStarting: 50000,
    serviceAreas: ["Mumbai", "Pune", "Nashik", "Goa"],
    phone: "+91 9876543210",
    email: "royal@events.com",
    instagram: "https://instagram.com/royalevents",
    website: "https://royalevents.com",
    address: "Shop 12, Event Plaza, Andheri West, Mumbai - 400053",
    profileImage: null,
    isLoggedIn: false
};

// Initial requests data
const initialRequests = [
    {
        id: 1,
        eventName: "Sharma Wedding Reception",
        eventType: "Wedding",
        date: "2026-02-15",
        time: "6:00 PM",
        location: "Mumbai, Maharashtra",
        venue: "Grand Palace Banquet Hall",
        category: "Decoration",
        budget: { min: 200000, max: 300000 },
        status: "pending",
        userName: "Priya Sharma",
        userPhone: "98XXXXXX10",
        userEmail: "priya.s***@gmail.com",
        guestCount: 500,
        specialRequirements: "Traditional Indian theme with marigold flowers. Need stage decoration, entrance mandap, and photo booth setup.",
        eventDescription: "Our daughter's wedding reception. Looking for elegant and traditional decorations.",
        createdAt: "2026-01-22",
        finalPrice: null,
        advancePercent: null,
        vendorNotes: null,
        rejectReason: null,
        counterPrice: null,
        counterMessage: null
    },
    {
        id: 2,
        eventName: "Rahul's 25th Birthday",
        eventType: "Birthday Party",
        date: "2026-02-10",
        time: "7:00 PM",
        location: "Pune, Maharashtra",
        venue: "Sky Lounge, FC Road",
        category: "Photography",
        budget: { min: 50000, max: 80000 },
        status: "accepted",
        userName: "Rahul Verma",
        userPhone: "+91 9876543210",
        userEmail: "rahul@email.com",
        guestCount: 100,
        specialRequirements: "Modern theme with balloons and LED lights",
        eventDescription: "Birthday celebration with friends and family",
        createdAt: "2026-01-20",
        finalPrice: 65000,
        advancePercent: 50,
        vendorNotes: "Looking forward to creating amazing memories!",
        rejectReason: null,
        counterPrice: null,
        counterMessage: null
    },
    {
        id: 3,
        eventName: "Gupta Golden Anniversary",
        eventType: "Anniversary",
        date: "2026-02-20",
        time: "12:00 PM",
        location: "Delhi NCR",
        venue: "The Grand Hotel",
        category: "Catering",
        budget: { min: 100000, max: 150000 },
        status: "pending",
        userName: "Ankit Gupta",
        userPhone: "98XXXXXX20",
        userEmail: "ankit.g***@gmail.com",
        guestCount: 200,
        specialRequirements: "Golden theme decorations, photo wall with 50 years memories",
        eventDescription: "Parents' 50th wedding anniversary celebration",
        createdAt: "2026-01-23",
        finalPrice: null,
        advancePercent: null,
        vendorNotes: null,
        rejectReason: null,
        counterPrice: null,
        counterMessage: null
    },
    {
        id: 4,
        eventName: "Mehta Engagement",
        eventType: "Engagement",
        date: "2026-02-05",
        time: "5:00 PM",
        location: "Ahmedabad, Gujarat",
        venue: "Royal Garden",
        category: "Decoration",
        budget: { min: 75000, max: 100000 },
        status: "rejected",
        userName: "Sneha Mehta",
        userPhone: "98XXXXXX30",
        userEmail: "sneha.m***@gmail.com",
        guestCount: 150,
        specialRequirements: "Pastel theme with floral arrangements",
        eventDescription: "Our engagement ceremony",
        createdAt: "2026-01-18",
        finalPrice: null,
        advancePercent: null,
        vendorNotes: null,
        rejectReason: "Date not available due to prior commitment",
        counterPrice: null,
        counterMessage: null
    },
    {
        id: 5,
        eventName: "Singh Sangeet Night",
        eventType: "Sangeet",
        date: "2026-02-12",
        time: "8:00 PM",
        location: "Jaipur, Rajasthan",
        venue: "Rambagh Palace",
        category: "DJ & Music",
        budget: { min: 40000, max: 60000 },
        status: "counter_offer",
        userName: "Karan Singh",
        userPhone: "98XXXXXX40",
        userEmail: "karan.s***@gmail.com",
        guestCount: 300,
        specialRequirements: "Bollywood theme with dance floor setup",
        eventDescription: "Pre-wedding sangeet celebration",
        createdAt: "2026-01-21",
        finalPrice: null,
        advancePercent: null,
        vendorNotes: null,
        rejectReason: null,
        counterPrice: 75000,
        counterMessage: "Due to the large venue and premium sound system required, we need to adjust the pricing."
    },
];

// Initial bookings (accepted requests with payment info)
const initialBookings = [
    {
        id: 101,
        requestId: 2,
        eventName: "Rahul's 25th Birthday",
        eventType: "Birthday Party",
        date: "2026-02-10",
        time: "7:00 PM",
        venue: "Sky Lounge, FC Road, Pune",
        clientName: "Rahul Verma",
        clientPhone: "+91 9876543210",
        clientEmail: "rahul@email.com",
        guestCount: 100,
        category: "Photography",
        totalAmount: 65000,
        paidAmount: 32500,
        paymentStatus: "partially_paid",
        status: "upcoming"
    },
    {
        id: 102,
        requestId: null,
        eventName: "Patel Wedding Reception",
        eventType: "Wedding",
        date: "2026-01-28",
        time: "6:00 PM",
        venue: "Grand Palace, Mumbai",
        clientName: "Rahul Patel",
        clientPhone: "+91 9876543210",
        clientEmail: "rahul.patel@email.com",
        guestCount: 400,
        category: "Decoration",
        totalAmount: 250000,
        paidAmount: 250000,
        paymentStatus: "paid",
        status: "upcoming"
    },
    {
        id: 103,
        requestId: null,
        eventName: "Singh Engagement",
        eventType: "Engagement",
        date: "2026-01-24",
        time: "5:00 PM",
        venue: "Royal Garden, Jaipur",
        clientName: "Karan Singh",
        clientPhone: "+91 9123456789",
        clientEmail: "karan@email.com",
        guestCount: 150,
        category: "Decoration",
        totalAmount: 80000,
        paidAmount: 80000,
        paymentStatus: "paid",
        status: "today"
    },
    {
        id: 104,
        requestId: null,
        eventName: "Sharma Anniversary",
        eventType: "Anniversary",
        date: "2026-01-15",
        time: "7:00 PM",
        venue: "The Oberoi, Delhi",
        clientName: "Mr. & Mrs. Sharma",
        clientPhone: "+91 9876501234",
        clientEmail: "sharma@email.com",
        guestCount: 100,
        category: "Catering",
        totalAmount: 120000,
        paidAmount: 120000,
        paymentStatus: "paid",
        status: "completed"
    },
];

// Initial earnings/transactions
const initialTransactions = [
    { id: 1, eventName: "Patel Wedding", bookingId: 102, amount: 250000, date: "2026-01-20", status: "paid", type: "credit" },
    { id: 2, eventName: "Rahul's Birthday (Advance)", bookingId: 101, amount: 32500, date: "2026-01-18", status: "paid", type: "credit" },
    { id: 3, eventName: "Bank Payout - January", bookingId: null, amount: -200000, date: "2026-01-15", status: "completed", type: "payout" },
    { id: 4, eventName: "Sharma Anniversary", bookingId: 104, amount: 120000, date: "2026-01-12", status: "paid", type: "credit" },
    { id: 5, eventName: "Singh Engagement", bookingId: 103, amount: 80000, date: "2026-01-08", status: "paid", type: "credit" },
];

// Initial reviews
const initialReviews = [
    {
        id: 1,
        userName: "Priya Sharma",
        userImage: null,
        eventType: "Wedding",
        bookingId: null,
        rating: 5,
        date: "2026-01-18",
        review: "Absolutely amazing decoration! The team was professional and the setup was beyond our expectations. Every detail was perfect!",
        reply: null
    },
    {
        id: 2,
        userName: "Rahul Verma",
        userImage: null,
        eventType: "Birthday Party",
        bookingId: 101,
        rating: 4,
        date: "2026-01-12",
        review: "Great work on the decoration. The team arrived on time and the setup looked beautiful. Minor delay in final touches but overall satisfied.",
        reply: "Thank you Rahul! We appreciate your feedback and will work on improving our timing."
    },
    {
        id: 3,
        userName: "Anita Gupta",
        userImage: null,
        eventType: "Anniversary",
        bookingId: null,
        rating: 5,
        date: "2026-01-05",
        review: "Made our 25th anniversary so special! The floral arrangements were stunning.",
        reply: null
    },
];

// Initial notifications
const initialNotifications = [
    {
        id: 1,
        type: 'new_request',
        title: 'New Event Request',
        message: 'Priya Sharma sent a request for Wedding Decoration',
        time: new Date().toISOString(),
        read: false,
        actionUrl: '/vendor/requests/1'
    },
    {
        id: 2,
        type: 'payment',
        title: 'Payment Received',
        message: 'You received ₹2,50,000 for Patel Wedding',
        time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false,
        actionUrl: '/vendor/earnings'
    },
    {
        id: 3,
        type: 'reminder',
        title: 'Event Tomorrow',
        message: 'Patel Wedding Reception at Grand Palace, Mumbai - 6:00 PM',
        time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        read: true,
        actionUrl: '/vendor/bookings'
    },
];

// Initial availability
const generateDefaultAvailability = () => {
    const available = [];
    const blocked = [];
    const booked = [];

    // Generate some default available dates for next 2 months
    const today = new Date();
    for (let i = 1; i <= 60; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];

        if (i % 7 === 0) {
            blocked.push(dateStr); // Block every 7th day
        } else if ([5, 12, 19, 26, 33, 40].includes(i)) {
            booked.push(dateStr); // Some booked dates
        } else {
            available.push(dateStr);
        }
    }

    return { available, blocked, booked };
};

// Portfolio images
const initialPortfolio = [
    { id: 1, url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400", category: "Wedding" },
    { id: 2, url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400", category: "Reception" },
    { id: 3, url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400", category: "Outdoor" },
    { id: 4, url: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400", category: "Mandap" },
    { id: 5, url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400", category: "Stage" },
    { id: 6, url: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=400", category: "Floral" },
];

// Bank details
const initialBankDetails = {
    accountNumber: "1234567890",
    ifscCode: "HDFC0001234",
    accountHolder: "Royal Events Pvt Ltd",
    upiId: "royalevents@upi",
    bankName: "HDFC Bank"
};

// Settings
const initialSettings = {
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    newRequestAlerts: true,
    paymentAlerts: true,
    reviewAlerts: true,
    marketingEmails: false
};

export const VendorProvider = ({ children }) => {
    // Load from localStorage or use initial data
    const loadFromStorage = (key, defaultValue) => {
        try {
            const saved = localStorage.getItem(`vendor_${key}`);
            return saved ? JSON.parse(saved) : defaultValue;
        } catch {
            return defaultValue;
        }
    };

    const [vendor, setVendor] = useState(() => loadFromStorage('profile', initialVendorData));
    const [requests, setRequests] = useState(() => loadFromStorage('requests', initialRequests));
    const [bookings, setBookings] = useState(() => loadFromStorage('bookings', initialBookings));
    const [transactions, setTransactions] = useState(() => loadFromStorage('transactions', initialTransactions));
    const [reviews, setReviews] = useState(() => loadFromStorage('reviews', initialReviews));
    const [notifications, setNotifications] = useState(() => loadFromStorage('notifications', initialNotifications));
    const [availability, setAvailability] = useState(() => loadFromStorage('availability', generateDefaultAvailability()));
    const [portfolio, setPortfolio] = useState(() => loadFromStorage('portfolio', initialPortfolio));
    const [bankDetails, setBankDetails] = useState(() => loadFromStorage('bankDetails', initialBankDetails));
    const [settings, setSettings] = useState(() => loadFromStorage('settings', initialSettings));

    // Toast state for notifications
    const [toast, setToast] = useState(null);

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('vendor_profile', JSON.stringify(vendor));
    }, [vendor]);

    useEffect(() => {
        localStorage.setItem('vendor_requests', JSON.stringify(requests));
    }, [requests]);

    useEffect(() => {
        localStorage.setItem('vendor_bookings', JSON.stringify(bookings));
    }, [bookings]);

    useEffect(() => {
        localStorage.setItem('vendor_transactions', JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem('vendor_reviews', JSON.stringify(reviews));
    }, [reviews]);

    useEffect(() => {
        localStorage.setItem('vendor_notifications', JSON.stringify(notifications));
    }, [notifications]);

    useEffect(() => {
        localStorage.setItem('vendor_availability', JSON.stringify(availability));
    }, [availability]);

    useEffect(() => {
        localStorage.setItem('vendor_portfolio', JSON.stringify(portfolio));
    }, [portfolio]);

    useEffect(() => {
        localStorage.setItem('vendor_bankDetails', JSON.stringify(bankDetails));
    }, [bankDetails]);

    useEffect(() => {
        localStorage.setItem('vendor_settings', JSON.stringify(settings));
    }, [settings]);

    // Toast helper
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // ============ VENDOR PROFILE ACTIONS ============
    const updateVendorProfile = (updates) => {
        setVendor(prev => ({ ...prev, ...updates }));
        showToast('Profile updated successfully!');
    };

    const loginVendor = (phone) => {
        setVendor(prev => ({ ...prev, isLoggedIn: true, phone }));
        showToast('Welcome back!');
    };

    const logoutVendor = () => {
        setVendor(prev => ({ ...prev, isLoggedIn: false }));
        showToast('Logged out successfully');
    };

    // ============ REQUEST ACTIONS ============
    const getRequestById = (id) => {
        return requests.find(r => r.id === parseInt(id));
    };

    const acceptRequest = (requestId, finalPrice, advancePercent, notes) => {
        setRequests(prev => prev.map(r => {
            if (r.id === parseInt(requestId)) {
                return {
                    ...r,
                    status: 'accepted',
                    finalPrice: parseInt(finalPrice),
                    advancePercent: parseInt(advancePercent),
                    vendorNotes: notes,
                    userPhone: r.userPhone.replace(/X/g, Math.floor(Math.random() * 10)) // Reveal phone
                };
            }
            return r;
        }));

        // Create a booking from this request
        const request = requests.find(r => r.id === parseInt(requestId));
        if (request) {
            const newBooking = {
                id: Date.now(),
                requestId: request.id,
                eventName: request.eventName,
                eventType: request.eventType,
                date: request.date,
                time: request.time,
                venue: `${request.venue}, ${request.location}`,
                clientName: request.userName,
                clientPhone: request.userPhone.replace(/X/g, Math.floor(Math.random() * 10)),
                clientEmail: request.userEmail.replace(/\*/g, 'a'),
                guestCount: request.guestCount,
                category: request.category,
                totalAmount: parseInt(finalPrice),
                paidAmount: 0,
                paymentStatus: "unpaid",
                status: "upcoming"
            };
            setBookings(prev => [...prev, newBooking]);
        }

        // Add notification
        addNotification({
            type: 'accepted',
            title: 'Request Accepted',
            message: `You accepted ${request?.eventName}. Waiting for client payment.`,
            actionUrl: '/vendor/bookings'
        });

        showToast('Request accepted successfully!');
    };

    const rejectRequest = (requestId, reason) => {
        setRequests(prev => prev.map(r => {
            if (r.id === parseInt(requestId)) {
                return { ...r, status: 'rejected', rejectReason: reason };
            }
            return r;
        }));
        showToast('Request rejected');
    };

    const sendCounterOffer = (requestId, newPrice, message) => {
        setRequests(prev => prev.map(r => {
            if (r.id === parseInt(requestId)) {
                return {
                    ...r,
                    status: 'counter_offer',
                    counterPrice: parseInt(newPrice),
                    counterMessage: message
                };
            }
            return r;
        }));
        showToast('Counter offer sent!');
    };

    // ============ BOOKING ACTIONS ============
    const updateBookingPayment = (bookingId, amount) => {
        setBookings(prev => prev.map(b => {
            if (b.id === bookingId) {
                const newPaidAmount = b.paidAmount + amount;
                return {
                    ...b,
                    paidAmount: newPaidAmount,
                    paymentStatus: newPaidAmount >= b.totalAmount ? 'paid' : 'partially_paid'
                };
            }
            return b;
        }));
    };

    const completeBooking = (bookingId) => {
        setBookings(prev => prev.map(b => {
            if (b.id === bookingId) {
                return { ...b, status: 'completed' };
            }
            return b;
        }));
        showToast('Event marked as completed!');
    };

    // ============ NOTIFICATION ACTIONS ============
    const addNotification = (notification) => {
        const newNotification = {
            id: Date.now(),
            ...notification,
            time: new Date().toISOString(),
            read: false
        };
        setNotifications(prev => [newNotification, ...prev]);
    };

    const markNotificationRead = (id) => {
        setNotifications(prev => prev.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllNotificationsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    // ============ REVIEW ACTIONS ============
    const replyToReview = (reviewId, replyText) => {
        setReviews(prev => prev.map(r => {
            if (r.id === reviewId) {
                return { ...r, reply: replyText };
            }
            return r;
        }));
        showToast('Reply posted!');
    };

    // ============ AVAILABILITY ACTIONS ============
    const updateAvailability = (newAvailability) => {
        setAvailability(newAvailability);
    };

    const toggleDateStatus = (dateStr) => {
        const currentStatus = getDateStatus(dateStr);
        if (currentStatus === 'booked') return;

        const newAvailability = { ...availability };

        if (currentStatus === 'available') {
            newAvailability.available = newAvailability.available.filter(d => d !== dateStr);
            newAvailability.blocked.push(dateStr);
        } else if (currentStatus === 'blocked') {
            newAvailability.blocked = newAvailability.blocked.filter(d => d !== dateStr);
        } else {
            newAvailability.available.push(dateStr);
        }

        setAvailability(newAvailability);
    };

    const getDateStatus = (dateStr) => {
        if (availability.booked.includes(dateStr)) return 'booked';
        if (availability.blocked.includes(dateStr)) return 'blocked';
        if (availability.available.includes(dateStr)) return 'available';
        return 'unset';
    };

    const markMonthAvailable = (year, month, daysInMonth) => {
        const newAvailable = [...availability.available];
        for (let i = 1; i <= daysInMonth; i++) {
            const m = String(month + 1).padStart(2, '0');
            const d = String(i).padStart(2, '0');
            const dateStr = `${year}-${m}-${d}`;
            if (!availability.available.includes(dateStr) &&
                !availability.blocked.includes(dateStr) &&
                !availability.booked.includes(dateStr)) {
                newAvailable.push(dateStr);
            }
        }
        setAvailability({ ...availability, available: newAvailable });
        showToast('Month marked as available!');
    };

    // ============ PORTFOLIO ACTIONS ============
    const addPortfolioImage = (url, category) => {
        const newImage = { id: Date.now(), url, category };
        setPortfolio(prev => [...prev, newImage]);
        showToast('Image added to portfolio!');
    };

    const removePortfolioImage = (id) => {
        setPortfolio(prev => prev.filter(p => p.id !== id));
        showToast('Image removed');
    };

    // ============ BANK DETAILS ACTIONS ============
    const updateBankDetails = (details) => {
        setBankDetails(prev => ({ ...prev, ...details }));
        showToast('Bank details updated!');
    };

    // ============ SETTINGS ACTIONS ============
    const updateSettings = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    // ============ STATS CALCULATIONS ============
    const getStats = () => {
        const totalRequests = requests.length;
        const pendingRequests = requests.filter(r => r.status === 'pending').length;
        const acceptedOrders = requests.filter(r => r.status === 'accepted').length;
        const completedEvents = bookings.filter(b => b.status === 'completed').length;
        const totalEarnings = transactions
            .filter(t => t.type === 'credit' && t.status === 'paid')
            .reduce((sum, t) => sum + t.amount, 0);
        const pendingPayout = transactions
            .filter(t => t.type === 'credit' && t.status === 'pending')
            .reduce((sum, t) => sum + t.amount, 0);
        const paidOut = Math.abs(transactions
            .filter(t => t.type === 'payout' && t.status === 'completed')
            .reduce((sum, t) => sum + t.amount, 0));

        const avgRating = reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : 0;

        return {
            totalRequests,
            pendingRequests,
            acceptedOrders,
            completedEvents,
            totalEarnings,
            pendingPayout,
            paidOut,
            avgRating,
            totalReviews: reviews.length
        };
    };

    const value = {
        // State
        vendor,
        requests,
        bookings,
        transactions,
        reviews,
        notifications,
        availability,
        portfolio,
        bankDetails,
        settings,
        toast,

        // Profile Actions
        updateVendorProfile,
        loginVendor,
        logoutVendor,

        // Request Actions
        getRequestById,
        acceptRequest,
        rejectRequest,
        sendCounterOffer,

        // Booking Actions
        updateBookingPayment,
        completeBooking,

        // Notification Actions
        addNotification,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification,

        // Review Actions
        replyToReview,

        // Availability Actions
        updateAvailability,
        toggleDateStatus,
        getDateStatus,
        markMonthAvailable,

        // Portfolio Actions
        addPortfolioImage,
        removePortfolioImage,

        // Bank Actions
        updateBankDetails,

        // Settings Actions
        updateSettings,

        // Stats
        getStats,

        // Toast
        showToast
    };

    return (
        <VendorContext.Provider value={value}>
            {children}
            {/* Toast Component */}
            {toast && (
                <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-2xl z-[100] animate-in slide-in-from-bottom fade-in duration-300 ${toast.type === 'success' ? 'bg-emerald-500 text-white' :
                        toast.type === 'error' ? 'bg-red-500 text-white' :
                            'bg-slate-800 text-white'
                    }`}>
                    <p className="text-sm font-medium">{toast.message}</p>
                </div>
            )}
        </VendorContext.Provider>
    );
};

export const useVendor = () => {
    const context = useContext(VendorContext);
    if (!context) {
        throw new Error('useVendor must be used within a VendorProvider');
    }
    return context;
};

export default VendorContext;
