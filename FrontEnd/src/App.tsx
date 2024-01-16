import './App.css'
import { MantineProvider, Grid} from '@mantine/core';
import DocucareLogo from './assets/docucare.png';
// import { Container, TextInput, Button, Title, Box, Space } from '@mantine/core';
// import { MantineProvider, Container, Group, Text, Grid} from '@mantine/core';
import '@mantine/core/styles.css';
// import DoctorNotes from './DoctorNotes';

// import TextInputExample from './TextInputExample';
// import TextAreaExample from './TextAreaExample';

// import React from 'react';

const PatientInfo = () => <div className="box">Patient Info</div>;
const DoctorNotes = () => <div className="box">Doctor Notes</div>;
const PatientChart = () => <div className="box">Patient Chart</div>;
const PatientAnalysis = () => <div className="box">Patient Analysis</div>;



function App() {
  return (
    <MantineProvider>
      <div>
        <div className='header'>
          <Grid>
            <Grid.Col span={2}><img src={DocucareLogo} alt='DocuCare Logo' /></Grid.Col>
            <Grid.Col span={8}>
              <h1>DocuCare</h1>
              <h2>Enhancing Doctor-Patient Relationships</h2></Grid.Col>
          </Grid>
          
        </div>
        {/* <div style={{ padding: '20px' }}>
          <TextInputExample />
        </div>
        <TextAreaExample /> */}

        <Grid>
          <Grid.Col span={6}><PatientInfo /></Grid.Col>
          <Grid.Col span={6}><DoctorNotes /></Grid.Col>
          <Grid.Col span={6}><PatientChart /></Grid.Col>
          <Grid.Col span={6}><PatientAnalysis /></Grid.Col>
        </Grid>

        <footer className="footer">
          Built on MongoDB by the NA Acq SA team
        </footer>
      </div>
      
    </MantineProvider>
  );
}

export default App;
