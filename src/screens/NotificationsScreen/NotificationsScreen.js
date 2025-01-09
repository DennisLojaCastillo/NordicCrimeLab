import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, TouchableOpacity } from 'react-native';
import { List, Text, ActivityIndicator } from 'react-native-paper';
import { collection, query, where, onSnapshot, orderBy, doc, updateDoc, writeBatch, getDocs } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { useFocusEffect } from '@react-navigation/native';
import Layout from '../../components/Layout/Layouts';
import { NOTIFICATION_TYPES } from '../../services/NotificationService';
import styles from './NotificationsScreen.styles';

export default function NotificationsScreen({ navigation }) {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const markAllAsRead = async () => {
        try {
            const batch = writeBatch(db);
            const unreadQuery = query(
                collection(db, 'notifications'),
                where('recipientId', '==', auth.currentUser.uid),
                where('read', '==', false)
            );
            
            const unreadDocs = await getDocs(unreadQuery);
            unreadDocs.forEach((doc) => {
                batch.update(doc.ref, { read: true });
            });

            await batch.commit();
        } catch (error) {
            console.error('Error marking notifications as read:', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            markAllAsRead();
        }, [])
    );

    useEffect(() => {
        if (!auth.currentUser) {
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, 'notifications'),
            where('recipientId', '==', auth.currentUser.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribeNotifications = onSnapshot(q, (snapshot) => {
            const notificationList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setNotifications(notificationList);
            setLoading(false);
        });

        const unreadQuery = query(
            collection(db, 'notifications'),
            where('recipientId', '==', auth.currentUser.uid),
            where('read', '==', false)
        );

        const unsubscribeUnread = onSnapshot(unreadQuery, (snapshot) => {
            console.log("Unread count in NotificationsScreen:", snapshot.size);
        });

        return () => {
            unsubscribeNotifications();
            unsubscribeUnread();
        };
    }, []);

    const getNotificationIcon = (type) => {
        switch (type) {
            case NOTIFICATION_TYPES.COMMENT:
                return 'comment';
            case NOTIFICATION_TYPES.FORUM_JOIN:
                return 'account-multiple';
            case NOTIFICATION_TYPES.RESEARCH_LIKE:
                return 'thumb-up';
            default:
                return 'bell';
        }
    };

    const getNotificationTitle = (type) => {
        switch (type) {
            case NOTIFICATION_TYPES.COMMENT:
                return 'New Comment';
            case NOTIFICATION_TYPES.FORUM_JOIN:
                return 'New Forum Member';
            case NOTIFICATION_TYPES.RESEARCH_LIKE:
                return 'New Like';
            default:
                return 'Notification';
        }
    };

    const getNotificationMessage = (notification) => {
        switch (notification.type) {
            case NOTIFICATION_TYPES.COMMENT:
                return `${notification.data.senderName} commented on your post "${notification.data.postTitle}"`;
            case NOTIFICATION_TYPES.FORUM_JOIN:
                return `${notification.data.joiningUserName} joined your forum "${notification.data.forumTitle}"`;
            case NOTIFICATION_TYPES.RESEARCH_LIKE:
                return `${notification.data.likerName} liked your research paper "${notification.data.researchTitle}"`;
            default:
                return 'You have a new notification';
        }
    };

    const getTimeAgo = (timestamp) => {
        if (!timestamp) return '';

        const now = new Date();
        const date = timestamp.toDate();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) {
            return 'Just now';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
        } else {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} ${days === 1 ? 'day' : 'days'} ago`;
        }
    };

    const handleNotificationPress = async (notification) => {
        try {
            const notificationRef = doc(db, 'notifications', notification.id);
            await updateDoc(notificationRef, { read: true });

            switch (notification.type) {
                case NOTIFICATION_TYPES.COMMENT:
                    navigation.navigate('Forums', {
                        screen: 'PostDetailScreen',
                        params: { 
                            postId: notification.data.postId,
                            forumId: notification.data.forumId,
                            postTitle: notification.data.postTitle,
                            fromNotification: true
                        }
                    });
                    break;
                case NOTIFICATION_TYPES.FORUM_JOIN:
                    navigation.navigate('Forums', {
                        screen: 'ForumDetailScreen',
                        params: { 
                            forumId: notification.data.forumId
                        }
                    });
                    break;
                case NOTIFICATION_TYPES.RESEARCH_LIKE:
                    navigation.navigate('Research', {
                        screen: 'ResearchDetail',
                        params: { 
                            researchId: notification.data.researchId
                        }
                    });
                    break;
            }
        } catch (error) {
            console.error('Error handling notification:', error);
            Alert.alert('Error', 'Could not process notification');
        }
    };

    if (loading) {
        return (
            <Layout>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" />
                </View>
            </Layout>
        );
    }

    return (
        <Layout>
            <View style={styles.container}>
                {notifications.length > 0 ? (
                    <FlatList
                        data={notifications}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleNotificationPress(item)}>
                                <List.Item
                                    title={getNotificationTitle(item.type)}
                                    description={getNotificationMessage(item)}
                                    left={props => <List.Icon {...props} icon={getNotificationIcon(item.type)} />}
                                    right={props => <Text style={styles.timeText}>{getTimeAgo(item.createdAt)}</Text>}
                                    style={[
                                        styles.notificationItem,
                                        !item.read && styles.unreadNotification
                                    ]}
                                />
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                    <Text style={styles.noNotifications}>No notifications</Text>
                )}
            </View>
        </Layout>
    );
} 