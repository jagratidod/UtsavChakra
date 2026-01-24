import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, MapPin, Phone, MessageCircle, Heart, Share2, Clock, IndianRupee, Award, FileText } from 'lucide-react';

const VendorDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [vendor, setVendor] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    // Dummy vendor data with all required details
    const dummyVendors = {
        1: {
            id: 1,
            name: "Royal Decorators",
            category: "Decoration",
            subCategory: "Mandap",
            rating: 4.8,
            reviewCount: 124,
            location: "Bandra, Mumbai",
            address: "123 Bandra West, Mumbai - 400050",
            price: 50000,
            image: "https://images.unsplash.com/photo-1519225468359-2996bc01c34c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true,
            contact: {
                phone: "+91 98765 43210",
                email: "info@royaldecorators.com",
                website: "www.royaldecorators.in"
            },
            about: "Royal Decorators is a premium event decoration company with over 15 years of experience in creating magical moments for weddings and other special occasions. We specialize in mandap decorations, stage setups, and thematic decor that reflects your unique style.",
            workingHours: {
                days: "Mon - Sun",
                hours: "10:00 AM - 8:00 PM"
            },
            portfolio: [
                "https://images.unsplash.com/photo-1519225468359-2996bc01c34c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1530103862676-de3c9a59af57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1478146059778-26028b07395a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1507504031981-523e3c6ef12f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            reviews: [
                {
                    id: 1,
                    name: "Priya Sharma",
                    rating: 5,
                    date: "2 weeks ago",
                    comment: "Absolutely stunning decorations for our wedding! The team was professional and brought our vision to life perfectly.",
                    image: "https://i.pravatar.cc/150?img=3"
                },
                {
                    id: 2,
                    name: "Rahul Mehta",
                    rating: 4,
                    date: "1 month ago",
                    comment: "Great work, but a bit expensive. The mandap looked beautiful though.",
                    image: "https://i.pravatar.cc/150?img=7"
                },
                {
                    id: 3,
                    name: "Anjali Verma",
                    rating: 5,
                    date: "3 months ago",
                    comment: "Royal Decorators made our engagement ceremony unforgettable. Highly recommended!",
                    image: "https://i.pravatar.cc/150?img=11"
                }
            ],
            packages: [
                {
                    id: 1,
                    name: "Basic Package",
                    price: 35000,
                    features: [
                        "Basic mandap setup",
                        "Floral arrangements",
                        "Lighting effects",
                        "Stage backdrop",
                        "2 decorators on-site"
                    ]
                },
                {
                    id: 2,
                    name: "Premium Package",
                    price: 50000,
                    features: [
                        "Premium mandap with crystal decorations",
                        "Extensive floral arrangements",
                        "LED lighting effects",
                        "Custom stage backdrop",
                        "4 decorators on-site",
                        "Pre-event consultation"
                    ]
                },
                {
                    id: 3,
                    name: "Deluxe Package",
                    price: 75000,
                    features: [
                        "Luxury mandap with imported materials",
                        "Premium floral arrangements",
                        "Advanced lighting effects with projections",
                        "Custom thematic backdrop",
                        "6 decorators on-site",
                        "Multiple pre-event consultations",
                        "Post-event cleanup"
                    ]
                }
            ]
        },
        2: {
            id: 2,
            name: "Dream Events",
            category: "Decoration",
            subCategory: "Birthday's",
            rating: 4.5,
            reviewCount: 89,
            location: "Andheri, Mumbai",
            address: "42 Andheri West, Mumbai - 400053",
            price: 25000,
            image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true,
            contact: {
                phone: "+91 98765 43214",
                email: "contact@dreamevents.com",
                website: "www.dreamevents.com"
            },
            about: "Dream Events specializes in making your birthday celebrations unforgettable. From themed decorations to balloon arches, we do it all.",
            workingHours: { days: "Mon - Sat", hours: "10:00 AM - 7:00 PM" },
            portfolio: [
                "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1530103862676-de3c9a59af57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            reviews: [],
            packages: [
                {
                    id: 1,
                    name: "Standard Birthday",
                    price: 25000,
                    features: ["Balloon decoration", "Cake table setup", "Music system"]
                }
            ]
        },
        3: {
            id: 3,
            name: "Elegant Touch",
            category: "Decoration",
            subCategory: "Engagement",
            rating: 4.9,
            reviewCount: 210,
            location: "Juhu, Mumbai",
            address: "88 Juhu Tara Road, Mumbai - 400049",
            price: 75000,
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: false,
            contact: {
                phone: "+91 98765 43215",
                email: "hello@eleganttouch.com",
                website: "www.eleganttouch.com"
            },
            about: "Elegant Touch brings sophistication to your engagement ceremony with floral and light decorations.",
            workingHours: { days: "Mon - Sun", hours: "9:00 AM - 9:00 PM" },
            portfolio: [
                "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            reviews: [],
            packages: [
                {
                    id: 1,
                    name: "Engagement Special",
                    price: 75000,
                    features: ["Ring ceremony decor", "Stage setup", "Entrance arch"]
                }
            ]
        },
        4: {
            id: 4,
            name: "Celebration Makers",
            category: "Decoration",
            subCategory: "Haldi / Mehndi",
            rating: 4.6,
            reviewCount: 150,
            location: "Dadar, Mumbai",
            address: "21 Dadar Central, Mumbai - 400028",
            price: 30000,
            image: "https://images.unsplash.com/photo-1530103862676-de3c9a59af57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true,
            contact: {
                phone: "+91 98765 43216",
                email: "info@celebrationmakers.com",
                website: "www.celebrationmakers.com"
            },
            about: "Vibrant and colorful decorations for your Haldi and Mehndi functions.",
            workingHours: { days: "Mon - Sun", hours: "8:00 AM - 8:00 PM" },
            portfolio: [
                "https://images.unsplash.com/photo-1530103862676-de3c9a59af57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            reviews: [],
            packages: [
                {
                    id: 1,
                    name: "Haldi Decor",
                    price: 30000,
                    features: ["Marigold florals", "Swing setup", "Photo booth"]
                }
            ]
        },
        5: {
            id: 5,
            name: "Vintage Vibes",
            category: "Decoration",
            subCategory: "Reception",
            rating: 4.7,
            reviewCount: 95,
            location: "Colaba, Mumbai",
            address: "15 Colaba Causeway, Mumbai - 400001",
            price: 60000,
            image: "https://images.unsplash.com/photo-1478146059778-26028b07395a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true,
            contact: {
                phone: "+91 98765 43217",
                email: "vintage@vibes.com",
                website: "www.vintagevibes.com"
            },
            about: "Classic and vintage themed reception decorations.",
            workingHours: { days: "Mon - Sun", hours: "10:00 AM - 10:00 PM" },
            portfolio: [
                "https://images.unsplash.com/photo-1478146059778-26028b07395a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            reviews: [],
            packages: [
                {
                    id: 1,
                    name: "Vintage Reception",
                    price: 60000,
                    features: ["Vintage props", "Fairy lights", "Classic seating"]
                }
            ]
        },
        6: {
            id: 6,
            name: "Floral Fantasy",
            category: "Decoration",
            subCategory: "Mandap",
            rating: 4.4,
            reviewCount: 76,
            location: "Powai, Mumbai",
            address: "Hiranandani Gardens, Powai, Mumbai - 400076",
            price: 45000,
            image: "https://images.unsplash.com/photo-1507504031981-523e3c6ef12f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: false,
            contact: {
                phone: "+91 98765 43218",
                email: "contact@floralfantasy.com",
                website: "www.floralfantasy.com"
            },
            about: "Exquisite floral arrangements for mandaps and stages.",
            workingHours: { days: "Mon - Sat", hours: "9:00 AM - 6:00 PM" },
            portfolio: [
                "https://images.unsplash.com/photo-1507504031981-523e3c6ef12f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            reviews: [],
            packages: [
                {
                    id: 1,
                    name: "Floral Mandap",
                    price: 45000,
                    features: ["Fresh flowers", "Drapes", "Carpet"]
                }
            ]
        },
        7: {
            id: 7,
            name: "Creative Shots",
            category: "Photography & Videography",
            subCategory: "Candid",
            rating: 4.8,
            reviewCount: 156,
            location: "Versova, Mumbai",
            address: "456 Versova Beach Road, Mumbai - 400061",
            price: 40000,
            image: "https://images.unsplash.com/photo-1516574187841-cb9cc364687c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true,
            contact: {
                phone: "+91 98765 43211",
                email: "info@creativeshots.in",
                website: "www.creativeshots.in"
            },
            about: "Creative Shots is a team of passionate photographers and videographers dedicated to capturing your special moments with creativity and professionalism.",
            workingHours: {
                days: "Mon - Sun",
                hours: "9:00 AM - 9:00 PM"
            },
            portfolio: [
                "https://images.unsplash.com/photo-1516574187841-cb9cc364687c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1508599834071-00e2930f7de3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            reviews: [
                {
                    id: 1,
                    name: "Sneha Patel",
                    rating: 5,
                    date: "1 week ago",
                    comment: "Absolutely amazing photography! They captured every emotion perfectly.",
                    image: "https://i.pravatar.cc/150?img=5"
                },
                {
                    id: 2,
                    name: "Vikram Singh",
                    rating: 5,
                    date: "2 months ago",
                    comment: "Professional team, great communication, and stunning results. Highly recommended!",
                    image: "https://i.pravatar.cc/150?img=9"
                },
                {
                    id: 3,
                    name: "Neha Sharma",
                    rating: 4,
                    date: "4 months ago",
                    comment: "Good work, but the delivery was a bit delayed. Overall satisfied.",
                    image: "https://i.pravatar.cc/150?img=13"
                }
            ],
            packages: [
                {
                    id: 1,
                    name: "Basic Photography",
                    price: 30000,
                    features: [
                        "2 photographers",
                        "500+ high-resolution photos",
                        "Online gallery",
                        "Digital copies"
                    ]
                },
                {
                    id: 2,
                    name: "Complete Package",
                    price: 40000,
                    features: [
                        "2 photographers + 1 videographer",
                        "800+ high-resolution photos",
                        "30-minute cinematic video",
                        "Online gallery",
                        "Digital copies",
                        "10×10 photo album"
                    ]
                },
                {
                    id: 3,
                    name: "Premium Package",
                    price: 60000,
                    features: [
                        "3 photographers + 2 videographers",
                        "1000+ high-resolution photos",
                        "60-minute cinematic video",
                        "Pre-wedding shoot",
                        "Online gallery",
                        "Digital copies",
                        "12×12 luxury photo album",
                        "Drone footage"
                    ]
                }
            ]
        },
        8: {
            id: 8,
            name: "Cinematic Dreams",
            category: "Photography & Videography",
            subCategory: "Cinematic",
            rating: 4.9,
            reviewCount: 203,
            location: "Bandra, Mumbai",
            address: "Carter Road, Bandra West, Mumbai - 400050",
            price: 60000,
            image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true,
            contact: {
                phone: "+91 98765 43219",
                email: "films@cinematicdreams.com",
                website: "www.cinematicdreams.com"
            },
            about: "We turn your wedding into a movie. High-quality cinematic wedding films.",
            workingHours: { days: "Mon - Sun", hours: "Flexible" },
            portfolio: [
                "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            reviews: [],
            packages: [
                {
                    id: 1,
                    name: "Short Film",
                    price: 60000,
                    features: ["Cinematic teaser", "Full wedding film", "Drone shots"]
                }
            ]
        },
        9: {
            id: 9,
            name: "Drone Vision",
            category: "Photography & Videography",
            subCategory: "Drone pilots",
            rating: 4.6,
            reviewCount: 112,
            location: "Navi Mumbai",
            address: "Vashi, Navi Mumbai - 400703",
            price: 25000,
            image: "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: false,
            contact: {
                phone: "+91 98765 43220",
                email: "sky@dronevision.com",
                website: "www.dronevision.com"
            },
            about: "Professional drone pilots for aerial photography and videography.",
            workingHours: { days: "Mon - Sun", hours: "Daylight Hours" },
            portfolio: [
                "https://images.unsplash.com/photo-1506260408121-e353d10b87c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            reviews: [],
            packages: [
                {
                    id: 1,
                    name: "Aerial Coverage",
                    price: 25000,
                    features: ["4k Drone video", "High-res aerial photos"]
                }
            ]
        },
        10: {
            id: 10,
            name: "Glam Studio",
            category: "Makeup Artist",
            subCategory: "Bride / Groom",
            rating: 4.7,
            reviewCount: 189,
            location: "Khar, Mumbai",
            address: "789 Khar Road, Mumbai - 400052",
            price: 35000,
            image: "https://images.unsplash.com/photo-1571781948742-0ec7b5518a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true,
            contact: {
                phone: "+91 98765 43212",
                email: "info@glamstudio.in",
                website: "www.glamstudio.in"
            },
            about: "Glam Studio is a team of professional makeup artists specializing in bridal and groom makeup. We use premium products and ensure you look your best on your special day.",
            workingHours: {
                days: "Mon - Sun",
                hours: "8:00 AM - 7:00 PM"
            },
            portfolio: [
                "https://images.unsplash.com/photo-1571781948742-0ec7b5518a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1518563655758-68c514f944d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            reviews: [
                {
                    id: 1,
                    name: "Aisha Khan",
                    rating: 5,
                    date: "3 days ago",
                    comment: "Best makeup artist ever! I looked stunning on my wedding day.",
                    image: "https://i.pravatar.cc/150?img=15"
                },
                {
                    id: 2,
                    name: "Karan Malhotra",
                    rating: 4,
                    date: "1 month ago",
                    comment: "Great makeup for my sister's wedding. Professional and on time.",
                    image: "https://i.pravatar.cc/150?img=17"
                },
                {
                    id: 3,
                    name: "Pooja Gupta",
                    rating: 5,
                    date: "2 months ago",
                    comment: "Loved their work! Will definitely recommend to friends.",
                    image: "https://i.pravatar.cc/150?img=19"
                }
            ],
            packages: [
                {
                    id: 1,
                    name: "Bridal Makeup",
                    price: 25000,
                    features: [
                        "Full bridal makeup",
                        "Hair styling",
                        "Draping",
                        "Touch-up kit"
                    ]
                },
                {
                    id: 2,
                    name: "Bride + Bridesmaids",
                    price: 35000,
                    features: [
                        "Bridal makeup + hair + draping",
                        "2 bridesmaids makeup + hair",
                        "Touch-up kit for bride",
                        "Pre-wedding trial"
                    ]
                },
                {
                    id: 3,
                    name: "Complete Package",
                    price: 50000,
                    features: [
                        "Bridal makeup + hair + draping",
                        "4 bridesmaids makeup + hair",
                        "Groom's makeup + hair",
                        "Touch-up kit for bride",
                        "2 pre-wedding trials",
                        "On-site touch-up artist"
                    ]
                }
            ]
        },
        11: {
            id: 11,
            name: "Bridal Glow",
            category: "Makeup Artist",
            subCategory: "Bride / Groom",
            rating: 4.8,
            reviewCount: 234,
            location: "Andheri, Mumbai",
            address: "Lokhandwala Complex, Andheri West, Mumbai - 400053",
            price: 45000,
            image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true,
            contact: {
                phone: "+91 98765 43221",
                email: "glow@bridalglow.com",
                website: "www.bridalglow.com"
            },
            about: "Enhancing your natural beauty for your big day. Specialists in HD and Airbrush makeup.",
            workingHours: { days: "Mon - Sun", hours: "7:00 AM - 9:00 PM" },
            portfolio: [
                "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            reviews: [],
            packages: [
                {
                    id: 1,
                    name: "HD Bridal Makeup",
                    price: 45000,
                    features: ["HD Makeup", "Hairstyling", "Lenses"]
                }
            ]
        },
        12: {
            id: 12,
            name: "Taste of India",
            category: "Catering",
            subCategory: "Veg / Non Veg",
            rating: 4.6,
            reviewCount: 167,
            location: "Dadar, Mumbai",
            address: "101 Dadar East, Mumbai - 400014",
            price: 80000,
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true,
            contact: {
                phone: "+91 98765 43213",
                email: "info@tasteofindia.in",
                website: "www.tasteofindia.in"
            },
            about: "Taste of India is a premium catering service offering a wide range of delicious vegetarian and non-vegetarian cuisines for weddings and other events.",
            workingHours: {
                days: "Mon - Sun",
                hours: "10:00 AM - 9:00 PM"
            },
            portfolio: [
                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            reviews: [
                {
                    id: 1,
                    name: "Rajiv Mehta",
                    rating: 5,
                    date: "5 days ago",
                    comment: "Amazing food! Our guests loved every dish. Professional service.",
                    image: "https://i.pravatar.cc/150?img=21"
                },
                {
                    id: 2,
                    name: "Sunita Desai",
                    rating: 4,
                    date: "2 weeks ago",
                    comment: "Good food and service. Would recommend.",
                    image: "https://i.pravatar.cc/150?img=23"
                },
                {
                    id: 3,
                    name: "Arjun Nair",
                    rating: 5,
                    date: "1 month ago",
                    comment: "Best catering service we've ever used. The biryani was exceptional!",
                    image: "https://i.pravatar.cc/150?img=25"
                }
            ],
            packages: [
                {
                    id: 1,
                    name: "Vegetarian Package",
                    price: 60000,
                    features: [
                        "15 vegetarian dishes",
                        "Starter, main course, dessert",
                        "Service staff",
                        "Basic crockery & cutlery"
                    ]
                },
                {
                    id: 2,
                    name: "Non-Vegetarian Package",
                    price: 80000,
                    features: [
                        "10 vegetarian + 8 non-vegetarian dishes",
                        "Starter, main course, dessert",
                        "Service staff",
                        "Premium crockery & cutlery",
                        "Live counter"
                    ]
                },
                {
                    id: 3,
                    name: "Premium Package",
                    price: 120000,
                    features: [
                        "12 vegetarian + 10 non-vegetarian dishes",
                        "Starter, main course, dessert, live counters",
                        "Service staff",
                        "Luxury crockery & cutlery",
                        "Custom menu planning",
                        "Chef on-site"
                    ]
                }
            ]
        },
        13: {
            id: 13,
            name: "Street Food Delights",
            category: "Catering",
            subCategory: "Live food stalls",
            rating: 4.5,
            reviewCount: 123,
            location: "Juhu, Mumbai",
            address: "Juhu Beach Chowpatty, Mumbai - 400049",
            price: 50000,
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: false,
            contact: {
                phone: "+91 98765 43222",
                email: "live@streetfood.com",
                website: "www.streetfood.com"
            },
            about: "Authentic Mumbai street food experience with live stalls for weddings and parties. Pani Puri, Pav Bhaji, and more.",
            workingHours: { days: "Mon - Sun", hours: "11:00 AM - 11:00 PM" },
            portfolio: [
                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ],
            reviews: [],
            packages: [
                {
                    id: 1,
                    name: "Live Chaat Counter",
                    price: 50000,
                    features: ["Pani Puri", "Sev Puri", "Dahi Puri", "Unlimited servings"]
                }
            ]
        }
    };

    // Related vendors dummy data
    const relatedVendors = [
        {
            id: 2,
            name: "Dream Events",
            category: "Decoration",
            subCategory: "Birthday's",
            rating: 4.5,
            reviewCount: 89,
            location: "Andheri, Mumbai",
            price: 25000,
            image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true
        },
        {
            id: 3,
            name: "Elegant Touch",
            category: "Decoration",
            subCategory: "Engagement",
            rating: 4.9,
            reviewCount: 210,
            location: "Juhu, Mumbai",
            price: 75000,
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: false
        },
        {
            id: 4,
            name: "Celebration Makers",
            category: "Decoration",
            subCategory: "Haldi / Mehndi",
            rating: 4.6,
            reviewCount: 150,
            location: "Dadar, Mumbai",
            price: 30000,
            image: "https://images.unsplash.com/photo-1530103862676-de3c9a59af57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            verified: true
        }
    ];

    useEffect(() => {
        // Simulate API call
        const timer = setTimeout(() => {
            setVendor(dummyVendors[id]);
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-brand-light-pink/30 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-brand-pink border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!vendor) {
        return (
            <div className="min-h-screen bg-brand-light-pink/30 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Vendor Not Found</h2>
                    <button
                        onClick={() => navigate('/user/vendors')}
                        className="px-6 py-3 bg-brand-pink text-white rounded-xl font-semibold hover:bg-brand-dark-pink transition-colors"
                    >
                        Go Back to Vendors
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-light-pink/30 pb-24">
            {/* Header */}
            <div className="relative">
                <div className="h-64 overflow-hidden">
                    <img
                        src={vendor.image}
                        alt={vendor.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute top-6 left-6">

                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <div className="container mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                            <div>
                                <h1 className="text-white text-2xl md:text-3xl font-bold mb-1">{vendor.name}</h1>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 text-white">
                                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                        <span className="font-semibold">{vendor.rating}</span>
                                        <span className="text-white/80">({vendor.reviewCount})</span>
                                    </div>
                                    <span className="text-white/80">•</span>
                                    <span className="text-white/90">{vendor.category} • {vendor.subCategory}</span>
                                    <span className="text-white/80">•</span>
                                    <div className="flex items-center gap-1 text-white/90">
                                        <MapPin className="w-4 h-4" />
                                        <span>{vendor.location}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                                    <Heart className="w-5 h-5 text-white" />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                                    <Share2 className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto -mt-12 relative">
                {/* Contact Buttons */}
                {/* Contact Buttons */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => navigate(`/user/request-quote/${id}`)}
                            className="flex-1 min-w-[160px] flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
                        >
                            <FileText className="w-5 h-5" />
                            Request Quote
                        </button>
                        <button className="flex-1 min-w-[160px] flex items-center justify-center gap-2 px-5 py-3 bg-brand-pink text-white rounded-xl text-sm font-semibold hover:bg-brand-dark-pink transition-colors shadow-lg shadow-brand-pink/20">
                            <Phone className="w-5 h-5" />
                            Call Now
                        </button>
                        <button
                            onClick={() => navigate(`/user/chat/${id}`)}
                            className="flex-1 min-w-[160px] flex items-center justify-center gap-2 px-5 py-3 bg-slate-50 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Chat
                        </button>
                        <button
                            onClick={() => {
                                const phone = vendor.contact.phone.replace(/[^0-9]/g, "");
                                window.open(`https://wa.me/${phone}`, '_blank');
                            }}
                            className="flex-1 min-w-[160px] flex items-center justify-center gap-2 px-5 py-3 bg-green-50 text-green-600 rounded-xl text-sm font-semibold hover:bg-green-100 transition-colors"
                        >
                            <MessageCircle className="w-5 h-5" />
                            WhatsApp
                        </button>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="flex border-b border-slate-200">
                        <button
                            className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'profile' ? 'text-brand-pink border-b-2 border-brand-pink' : 'text-slate-600 hover:text-brand-pink'}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            Profile
                        </button>
                        <button
                            className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'portfolio' ? 'text-brand-pink border-b-2 border-brand-pink' : 'text-slate-600 hover:text-brand-pink'}`}
                            onClick={() => setActiveTab('portfolio')}
                        >
                            Portfolio
                        </button>
                        <button
                            className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'reviews' ? 'text-brand-pink border-b-2 border-brand-pink' : 'text-slate-600 hover:text-brand-pink'}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Reviews ({vendor.reviewCount})
                        </button>
                        <button
                            className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === 'packages' ? 'text-brand-pink border-b-2 border-brand-pink' : 'text-slate-600 hover:text-brand-pink'}`}
                            onClick={() => setActiveTab('packages')}
                        >
                            Packages
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2">
                                    <h3 className="text-lg font-bold text-slate-800 mb-4">About</h3>
                                    <p className="text-slate-600 leading-relaxed mb-6">{vendor.about}</p>

                                    <h3 className="text-lg font-bold text-slate-800 mb-4">Working Hours</h3>
                                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl mb-6">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-pink/10 text-brand-pink">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-medium mb-1">Days</p>
                                            <p className="text-slate-800 font-semibold">{vendor.workingHours.days}</p>
                                        </div>
                                        <div className="ml-8">
                                            <p className="text-xs text-slate-400 font-medium mb-1">Hours</p>
                                            <p className="text-slate-800 font-semibold">{vendor.workingHours.hours}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="bg-slate-50 rounded-xl p-6">
                                        <h3 className="text-lg font-bold text-slate-800 mb-4">Contact Information</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-pink/10 text-brand-pink">
                                                    <Phone className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-400 font-medium mb-1">Phone</p>
                                                    <p className="text-slate-800 font-semibold">{vendor.contact.phone}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-pink/10 text-brand-pink">
                                                    <MapPin className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-400 font-medium mb-1">Address</p>
                                                    <p className="text-slate-800 font-semibold">{vendor.address}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Portfolio Tab */}
                        {activeTab === 'portfolio' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {vendor.portfolio.map((item, index) => (
                                    <div key={index} className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        <img
                                            src={item}
                                            alt={`Portfolio ${index + 1}`}
                                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Reviews Tab */}
                        {activeTab === 'reviews' && (
                            <div className="space-y-6">
                                {vendor.reviews.map(review => (
                                    <div key={review.id} className="border-b border-slate-200 pb-6">
                                        <div className="flex gap-4">
                                            <img
                                                src={review.image}
                                                alt={review.name}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-bold text-slate-800">{review.name}</h4>
                                                        <p className="text-xs text-slate-400 mt-1">{review.date}</p>
                                                    </div>
                                                    <div className="flex items-center">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-slate-600 mt-3">{review.comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Packages Tab */}
                        {activeTab === 'packages' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {vendor.packages.map(packageItem => (
                                    <div key={packageItem.id} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all">
                                        <div className="bg-brand-pink/5 p-4 border-b border-slate-200">
                                            <h4 className="font-bold text-slate-800">{packageItem.name}</h4>
                                            <div className="flex items-center gap-1 mt-2">
                                                <IndianRupee className="w-4 h-4 text-slate-700" />
                                                <span className="font-bold text-slate-800 text-lg">{packageItem.price.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <ul className="space-y-2">
                                                {packageItem.features.map((feature, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <div className="w-5 h-5 flex items-center justify-center rounded-full bg-brand-pink/20 text-brand-pink mt-0.5">
                                                            <span className="text-xs font-bold">✓</span>
                                                        </div>
                                                        <span className="text-slate-600">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <button className="w-full mt-5 py-3 bg-brand-pink text-white rounded-xl text-sm font-semibold hover:bg-brand-dark-pink transition-colors">
                                                Select Package
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Vendors */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Related Vendors</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedVendors.map(relatedVendor => (
                            <div
                                key={relatedVendor.id}
                                onClick={() => navigate(`/user/vendor/${relatedVendor.id}`)}
                                className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                            >
                                <img
                                    src={relatedVendor.image}
                                    alt={relatedVendor.name}
                                    className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                                />
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-slate-800">{relatedVendor.name}</h4>
                                        {relatedVendor.verified && (
                                            <div className="flex items-center bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                                <Award className="w-3 h-3 mr-1" /> Verified
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-brand-pink font-semibold mb-2">{relatedVendor.category} • {relatedVendor.subCategory}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                                            <span className="font-bold text-sm text-slate-700">{relatedVendor.rating}</span>
                                            <span className="text-xs text-slate-400 ml-1">({relatedVendor.reviewCount})</span>
                                        </div>
                                        <div className="flex items-center text-slate-800 font-bold">
                                            <IndianRupee className="w-3.5 h-3.5" />
                                            <span>{relatedVendor.price.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </div>
    );
};

export default VendorDetail;
