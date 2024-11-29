import React, { useState, useEffect } from 'react';
import { getPatients } from './src/services/api';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const data = await getPatients();
                setPatients(data);
            } catch (error) {
                setMessage('Error fetching patient data');
            }
        };

        fetchPatients();
    }, []);

    return (
        <div>
            <h1>Patients List</h1>
            {message && <p>{message}</p>}
            <ul>
                {patients.length === 0 ? (
                    <p>No patients found</p>
                ) : (
                    patients.map((patient) => (
                        <li key={patient.patientId}>
                            {patient.name} - {patient.age} years old
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default PatientList;

