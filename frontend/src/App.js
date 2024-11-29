import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Import the CSS file

function App() {
    const [patientId, setPatientId] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [conditions, setConditions] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    // For retrieving patient data
    const [retrievedData, setRetrievedData] = useState(null);

    const handleSave = async () => {
        const patientData = { name, age, conditions };
        try {
            const response = await axios.post(`http://34.203.243.233:3000/patients/${patientId}`, patientData);
            setMessage(response.data.message);
            setIsError(false);
        } catch (error) {
            setMessage('Error saving patient data');
            setIsError(true);
        }
    };

    const handleRetrieve = async () => {
        try {
            const response = await axios.get(`http://34.203.243.233:3000/patients/${patientId}`);
            setRetrievedData(response.data);
            setMessage('');
            setIsError(false);
        } catch (error) {
            setRetrievedData(null);
            setMessage('Error retrieving patient data');
            setIsError(true);
        }
    };

    return (
        <div className="container">
            <h1>Patient Data Form</h1>
            <label htmlFor="patientId">Patient ID</label>
            <input
                id="patientId"
                type="text"
                placeholder="Enter Patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
            />

            <label htmlFor="name">Name</label>
            <input
                id="name"
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="age">Age</label>
            <input
                id="age"
                type="text"
                placeholder="Enter Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />

            <label htmlFor="conditions">Conditions</label>
            <input
                id="conditions"
                type="text"
                placeholder="Enter Conditions"
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
            />

            <button onClick={handleSave}>Save Patient</button>

            {/* Button for retrieving patient data */}
            <button onClick={handleRetrieve}>Retrieve Patient Data</button>

            {message && (
                <p className={isError ? 'error' : 'success'}>{message}</p>
            )}

            {/* Display retrieved patient data */}
            {retrievedData && (
                <div className="retrieved-data">
                    <h2>Patient Data</h2>
                    <p><strong>Patient ID:</strong> {retrievedData.id}</p>
                    <p><strong>Name:</strong> {retrievedData.name}</p>
                    <p><strong>Age:</strong> {retrievedData.age}</p>
                    <p><strong>Conditions:</strong> {retrievedData.conditions}</p>
                </div>
            )}
        </div>
    );
}

export default App;

