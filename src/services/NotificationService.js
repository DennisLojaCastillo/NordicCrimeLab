import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export const NOTIFICATION_TYPES = {
    COMMENT: 'COMMENT',
    FORUM_JOIN: 'FORUM_JOIN',
    RESEARCH_LIKE: 'RESEARCH_LIKE',
    NEW_POST: 'NEW_POST'
};

export const saveNotification = async (recipientId, type, data) => {
    try {
        await addDoc(collection(db, 'notifications'), {
            recipientId,
            type,
            data,
            read: false,
            createdAt: serverTimestamp()
        });
        console.log('Notification saved successfully');
    } catch (error) {
        console.error('Error saving notification:', error);
    }
}; 