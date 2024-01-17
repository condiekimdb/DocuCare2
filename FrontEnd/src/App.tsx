import './App.css'
import { MantineProvider, Grid} from '@mantine/core';
import DocucareLogo from './assets/docucare.png';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import { Container, TextInput, Button, Title, Box, Space } from '@mantine/core';
// import { MantineProvider, Container, Group, Text, Grid} from '@mantine/core';
import '@mantine/core/styles.css';
import PatientInfo from './PatientInfo'
// import DoctorNotes from './DoctorNotes';

// import TextInputExample from './TextInputExample';
// import TextAreaExample from './TextAreaExample';

// import React from 'react';

const PatientSummary = () => <div className="box">Patient Summary</div>;
const PatientChart = () => <div className="box">Patient Chart</div>;
const PatientAnalysis = () => <div className="box">Doctor Notes</div>;



function App() {
  return (
    <Router>
      
      <MantineProvider>
        <div>
          <div className='header'>
            <Grid>
              <Grid.Col span={2}><img src={DocucareLogo} alt='DocuCare Logo' /></Grid.Col>
              <Grid.Col span={8}>
                <h1 className='title'>DocuCare</h1>
                <h2>Enhancing Doctor-Patient Relationships</h2></Grid.Col>
            </Grid>
            
          </div>
          {/* <div style={{ padding: '20px' }}>
            <TextInputExample />
          </div>
          <TextAreaExample /> */}

          <Grid>
            <Grid.Col span={6}>
              <Routes>
                <Route path="/patient/:patientId" element={<PatientInfo />} />
              </Routes>
            </Grid.Col>
            <Grid.Col span={6}><PatientSummary /></Grid.Col>
            <Grid.Col span={6}><PatientChart /></Grid.Col>
            <Grid.Col span={6}><PatientAnalysis /></Grid.Col>
          </Grid>

          <footer className="footer">
            Built on MongoDB by the NA Acq SA team
          </footer>
        </div>
        
      </MantineProvider>
    </Router>
  );
}

export default App;
