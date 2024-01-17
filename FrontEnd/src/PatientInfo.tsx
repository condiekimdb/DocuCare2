import React, { useState, useEffect } from 'react';
import './App.css'
import '@mantine/core/styles.css';
import axios from 'axios';
import { Grid} from '@mantine/core';

/* Sample PatientID : aaa4c718-2f48-4c13-9ad0-d287cf280824 */

interface PatientInfoProps {
    patientId: string | undefined;
    patientData: any;
  }

const PatientInfo: React.FC<PatientInfoProps> = ({ patientData}) => {
    return (
        <div className="box">
            {patientData && (
                <div>
                {patientData.map((patient: { _id: any; prefix: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; first: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; last: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; gender: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; birthdate: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; address: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: any) => (
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
