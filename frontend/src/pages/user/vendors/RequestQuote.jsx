import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock, MapPin, DollarSign, Upload, Send, X, Image as ImageIcon } from 'lucide-react';
import { useUser } from '../../../context/UserContext';

const RequestQuote = () => {
    const { vendorId } = useParams();
    const navigate = useNavigate();
    const { user } = useUser();
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [vendorName, setVendorName] = useState("Vendor"); // Fallback name until fetched

    // Form State
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        venue: '',
        budget: '',
        notes: ''
    });

    // Header Slideshow State
    const [currentHeaderImage, setCurrentHeaderImage] = useState(0);
    const headerImages = [
        '/illustrations/request.jpg',
        '/illustrations/request2.jpg',
        '/illustrations/request3.jpg',
        '/illustrations/requestform1.jpg'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeaderImage((prev) => (prev + 1) % headerImages.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Clean up object URLs to avoid memory leaks
    useEffect(() => {
        return () => {
            previews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [previews]);

    // Handle Image Selection
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setImages(prev => [...prev, ...files]);

            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    // Remove Image
    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => {
            const newPreviews = [...prev];
            URL.revokeObjectURL(newPreviews[index]); // Free memory
            return newPreviews.filter((_, i) => i !== index);
        });
    };

    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Construct the payload
        const payload = {
            vendorId,
            ...formData,
            userDetails: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                hasAadhar: !!user.aadharCard
            },
            images: images // In a real app, these would be uploaded URLs
        };

        console.log("Submitting Quote Request:", payload);

        // Simulate Success
        alert("Quote request sent successfully! The vendor will contact you shortly.");
        navigate(-1); // Go back
    };

    return (
        <div className="min-h-screen bg-brand-light-pink/30 pb-24">

            {/* Header */}
            <header className="bg-white sticky top-0 z-40 px-6 py-6 md:py-8 shadow-sm rounded-b-[48px] mb-8 overflow-hidden relative">
                <div className="container mx-auto max-w-4xl relative z-10 flex items-center justify-between gap-4">

                    {/* Left Side: Heading */}
                    <div className="flex flex-col flex-1 z-20">
                        <div>
                            <h1 className="text-2xl md:text-5xl font-serif font-bold text-slate-800 leading-tight">
                                Planning something <br />
                                <span className="text-brand-pink">Special?</span>
                            </h1>
                            <p className="text-xs md:text-base text-slate-500 font-medium mt-2 md:mt-3">Request a quote from {vendorName}</p>
                        </div>
                    </div>

                    {/* Right Side: Image Slideshow */}
                    <div className="w-40 h-32 md:w-96 md:h-64 relative shrink-0">
                        {headerImages.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt="Request Illustration"
                                className={`absolute inset-0 w-full h-full object-cover rounded-xl md:rounded-2xl transition-opacity duration-1000 ease-in-out ${index === currentHeaderImage ? 'opacity-100' : 'opacity-0'}`}
                                style={{
                                    maskImage: 'linear-gradient(to left, black 85%, transparent 100%)',
                                    WebkitMaskImage: 'linear-gradient(to left, black 85%, transparent 100%)'
                                }}
                            />
                        ))}
                        {/* Soft overlay to further blend edges if needed */}
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/10 to-white/60 rounded-xl md:rounded-2xl pointer-events-none"></div>
                    </div>
                </div>


            </header>

            <div className="container mx-auto px-6 max-w-3xl">
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-6 md:p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">

                    {/* Section: Event Details */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Event Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Date */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Event Date</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Calendar className="h-5 w-5 text-slate-400 group-focus-within:text-brand-pink transition-colors" />
                                    </div>
                                    <input
                                        required
                                        type="date"
                                        className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-brand-pink/20 transition-all cursor-pointer"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Time */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Event Time</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Clock className="h-5 w-5 text-slate-400 group-focus-within:text-brand-pink transition-colors" />
                                    </div>
                                    <input
                                        required
                                        type="time"
                                        className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-brand-pink/20 transition-all cursor-pointer"
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Venue */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Venue / Location</label>
                            <div className="relative group">
                                <div className="absolute top-3.5 left-4 pointer-events-none">
                                    <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-brand-pink transition-colors" />
                                </div>
                                <textarea
                                    required
                                    rows="1"
                                    placeholder="Enter full address or city..."
                                    className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-brand-pink/20 transition-all resize-none min-h-[56px]"
                                    value={formData.venue}
                                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Budget */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Budget Estimate</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <DollarSign className="h-5 w-5 text-slate-400 group-focus-within:text-brand-pink transition-colors" />
                                </div>
                                <select
                                    required
                                    className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-brand-pink/20 transition-all appearance-none cursor-pointer"
                                    value={formData.budget}
                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                >
                                    <option value="" disabled>Select your budget range</option>
                                    <option value="<50k">Under ₹50,000</option>
                                    <option value="50k-1L">₹50,000 - ₹1 Lakh</option>
                                    <option value="1L-3L">₹1 Lakh - ₹3 Lakhs</option>
                                    <option value="3L-5L">₹3 Lakhs - ₹5 Lakhs</option>
                                    <option value="5L+">Above ₹5 Lakhs</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section: Moodboard / Images */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Inspiration & Notes</h2>

                        <div className="space-y-4">
                            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                                <span>Reference Images</span>
                                <span className="text-brand-pink text-xs normal-case">{images.length} selected</span>
                            </label>

                            {/* Image Grid */}
                            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                                {/* Upload Button */}
                                <label className="aspect-square flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100 hover:border-brand-pink/50 transition-all group">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-2 group-hover:scale-110 transition-transform">
                                        <Upload className="w-5 h-5 text-brand-pink" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Add Photos</span>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </label>

                                {/* Previews */}
                                {previews.map((src, index) => (
                                    <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm bg-slate-100">
                                        <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 w-6 h-6 bg-black/50 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-slate-400">Add as many photos as you like to convey your idea.</p>
                        </div>

                        {/* Notes */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Additional Notes</label>
                            <textarea
                                rows="4"
                                placeholder="Tell us more about your requirements, specific themes, or questions..."
                                className="block w-full p-4 bg-slate-50 border-none rounded-2xl text-slate-800 font-medium focus:ring-2 focus:ring-brand-pink/20 transition-all resize-none"
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-8">
                        {/* Decorative Image above Button */}
                        <div className="flex justify-center -mb-6 relative z-10 w-full overflow-hidden">
                            <img
                                src="/illustrations/request2.jpg"
                                alt="Send Request"
                                className="w-48 object-cover opacity-90 hover:opacity-100 transition-opacity"
                                style={{
                                    maskImage: 'linear-gradient(to top, black 80%, transparent 100%)',
                                    WebkitMaskImage: 'linear-gradient(to top, black 80%, transparent 100%)'
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="relative z-20 w-full bg-brand-pink hover:bg-brand-dark-pink text-white font-bold py-4 rounded-2xl shadow-lg shadow-brand-pink/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
                        >
                            <Send className="w-5 h-5" />
                            Send Quote Request
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default RequestQuote;
