import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({ name: 'Surbhi & Aryan' }); // Mock user
    const [event, setEvent] = useState(null); // null means no event created yet

    const createEvent = (eventData) => {
        setEvent(eventData);
    };

    return (
        <UserContext.Provider value={{ user, event, createEvent }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

