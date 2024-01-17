import React, { useState, useEffect } from 'react';
import './App.css'
import '@mantine/core/styles.css';
import axios from 'axios';
import { Grid} from '@mantine/core';

/* Sample PatientID : aaa4c718-2f48-4c13-9ad0-d287cf280824 */

interface PatientInfoProps {
    patientId: string | undefined;
  }

const PatientInfo: React.FC<PatientInfoProps> = ({ patientId }) => {
    const [responseData, setResponseData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        postPatientData();
    }, []); // The empty array ensures this effect runs once on mount

    const postPatientData = async () => {
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

    if (isLoaded && (!responseData || (responseData as any[]).length === 0)) {
        return <div className="box">Unable to find patient with id: {patientId}</div>;
    }


    return (
        <div className="box">
            {responseData && (
                <div>
                {((responseData as any[]) || []).map((patient: { _id: any; prefix: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; first: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; last: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; gender: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; birthdate: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; address: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: any) => (
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
