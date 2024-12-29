import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { db, auth } from '../../config/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import styles from './CreateForumScreen.styles';

export default function CreateForumScreen({ navigation }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(null);
    const [categoriesOpen, setCategoriesOpen] = useState(false);

    const categories = [
        { label: 'Crime Analysis', value: 'crime-analysis' },
        { label: 'Forensic Techniques', value: 'forensic-techniques' },
        { label: 'Mystery Solvers', value: 'mystery-solvers' },
        { label: 'Cyber Forensics', value: 'cyber-forensics' },
        { label: 'Evidence Collection', value: 'evidence-collection' },
    ];

    const handleCreateForum = async () => {
        if (!title || !description || !category) {
            Alert.alert('Error', 'Please fill in all fields, including category.');
            return;
        }

        try {
            const userId = auth.currentUser.uid;
            await addDoc(collection(db, 'forums'), {
                title,
                description,
                category,
                createdBy: userId,
                members: [userId], // Tilføj brugeren automatisk til medlemmer
                createdAt: serverTimestamp(),
            });

            Alert.alert('Success', 'Forum created successfully!');
            setTitle('');
            setDescription('');
            setCategory(null);
            setCategoriesOpen(false);
            navigation.goBack();
        } catch (error) {
            console.error('Error creating forum:', error.message);
            Alert.alert('Error', 'Could not create forum.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create a Forum</Text>
            <TextInput
                style={styles.input}
                placeholder="Forum Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Forum Description"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <DropDownPicker
                open={categoriesOpen}
                value={category}
                items={categories}
                setOpen={setCategoriesOpen}
                setValue={setCategory}
                placeholder="Select a Category"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
            />
            <TouchableOpacity style={styles.createButton} onPress={handleCreateForum}>
                <Text style={styles.createButtonText}>Create Forum</Text>
            </TouchableOpacity>
        </View>
    );
}
