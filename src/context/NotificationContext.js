import React, { createContext, useState, useContext, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../config/firebase';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (!auth.currentUser) return;

        const unreadQuery = query(
            collection(db, 'notifications'),
            where('recipientId', '==', auth.currentUser.uid),
            where('read', '==', false)
        );

        const unsubscribe = onSnapshot(unreadQuery, (snapshot) => {
            setUnreadCount(snapshot.size);
        }, (error) => {
            console.error('Error listening to notifications:', error);
        });

        return () => unsubscribe();
    }, []);

    return (
        <NotificationContext.Provider value={{ unreadCount }}>
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotifications = () => useContext(NotificationContext); 