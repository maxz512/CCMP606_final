import React, { useState } from 'react';
import { addPatient } from './src/services/api';

const PatientForm = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const patientData = { name, age: parseInt(age) };

        try {
            const response = await addPatient(patientData);
            setMessage(`Patient data for ${response.patientId} saved successfully!`);
        } catch (error) {
            setMessage('Error saving patient data');
        }
    };

    return (
        <div>
            <h1>Patient Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="age">Age: </label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Save Patient Data</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PatientForm;

