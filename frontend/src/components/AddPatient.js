import React, { useState } from 'react';
import { addPatient } from '../services/api';

const AddPatient = () => {
    const [patientId, setPatientId] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addPatient(patientId, { name, age });
        alert('Patient added successfully!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Patient</h2>
            <input
                type="text"
                placeholder="Patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default AddPatient;

