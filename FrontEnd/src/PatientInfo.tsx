import React, { useState, useEffect } from 'react';
import './App.css'
import '@mantine/core/styles.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { List, Grid} from '@mantine/core';

/* Sample PatientID : aaa4c718-2f48-4c13-9ad0-d287cf280824 */

const PatientInfo = () => {
    const params = useParams();
    const [responseData, setResponseData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        postPatientData();
    }, []); // The empty array ensures this effect runs once on mount

    const postPatientData = async () => {
        const patientId = params.patientId; // Static ID as per your requirement
        const url = 'https://us-east-1.aws.data.mongodb-api.com/app/docucare-rubsv/endpoint/basicinfo';

        try {
            const response = await axios.post(url, { patient: patientId });
            setResponseData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error during POST request with axios:', error);
        } finally {
            setIsLoaded(true);
        }
    };
    

    if (!isLoaded) {
        return <div className="box">Loading...</div>;
    }

    if (isLoaded && !responseData) {
        return <div className="box">No response for patient ID: {params.patientId}</div>;
    }


    return (
        <div className="box">
            {responseData && (
                <div>
                {responseData.map((patient, index) => (
                    <Grid key={patient._id || index}>
                        <Grid.Col span={12}>
                            <div><h3>{patient.prefix} {patient.first} {patient.last}</h3></div>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <div>Gender: {patient.gender}</div>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <div>{patient.birthdate}</div>
                        </Grid.Col>
                        <Grid.Col span={12}>
                            <div>{patient.address}</div>
                        </Grid.Col>
                    </Grid>
                ))}
                </div>
            )}
        </div>
    );
};

export default PatientInfo;
