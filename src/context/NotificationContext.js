import React, { createContext, useState, useContext, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../config/firebase';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // Lyt til auth state changes
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (!user) {
                setUnreadCount(0);
                return;
            }

            // Opsæt notification listener når bruger er logget ind
            const unreadQuery = query(
                collection(db, 'notifications'),
                where('recipientId', '==', user.uid),
                where('read', '==', false)
            );

            const unsubscribeNotifications = onSnapshot(unreadQuery, (snapshot) => {
                setUnreadCount(snapshot.size);
            }, (error) => {
                console.error('Error listening to notifications:', error);
                setUnreadCount(0);
            });

            // Cleanup function
            return () => {
                unsubscribeNotifications();
            };
        });

        // Cleanup auth listener
        return () => unsubscribeAuth();
    }, []); // Tom dependency array da vi kun vil sætte dette op én gang

    const value = {
        unreadCount,
        setUnreadCount, // Eksporter denne hvis du har brug for at manipulere count andre steder
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
}; 