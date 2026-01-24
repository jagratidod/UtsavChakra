import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Load from local storage if available
        const savedUser = localStorage.getItem('user_profile');
        return savedUser ? JSON.parse(savedUser) : {
            name: 'Surbhi & Aryan',
            email: 'user@example.com',
            phone: '+91 9876543210',
            address: '',
            aadharCard: null,
            profileImage: null
        };
    });

    // Also persist event if needed in future, keeping simple for now
    const [event, setEvent] = useState(null);

    const createEvent = (eventData) => {
        setEvent(eventData);
    };

    const updateUser = (userData) => {
        setUser(prev => {
            const updated = { ...prev, ...userData };
            // Save to local storage
            localStorage.setItem('user_profile', JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <UserContext.Provider value={{ user, event, createEvent, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

