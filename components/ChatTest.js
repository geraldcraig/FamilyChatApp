import React, { useState } from 'react';
import { TextInput, Button } from 'react-native';
import { useTasksDispatch } from './yourTasksDispatch'; // Import your custom hook if needed

export default function AddTask() {
    const [text, setText] = useState('');
    const dispatch = useTasksDispatch(); // Assuming you have a custom hook to dispatch actions

    const handleAddTask = () => {
        dispatch({
            type: 'added',
            id: nextId++, // Assuming you have nextId defined somewhere
            text: text,
        });
        setText('');
    };

    return (
        <>
            <TextInput
                placeholder="Add message"
                value={text}
                onChangeText={setText}
            />
            <Button title="Add" onPress={handleAddTask} />
        </>
    );
}
