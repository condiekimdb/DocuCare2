import './App.css'
// import { Container, TextInput, Button, Title, Box, Space } from '@mantine/core';
import { MantineProvider, Container, Group, Text, Grid} from '@mantine/core';
import '@mantine/core/styles.css';
// import DoctorNotes from './DoctorNotes';

// import TextInputExample from './TextInputExample';
// import TextAreaExample from './TextAreaExample';

// import React from 'react';

function App() {
  return (
    <MantineProvider>
      <div>
        <div className='header'>
          <h1>DocuCare</h1>
          <h2>Enhance the doctor-patient relationship through intelligent data utilization</h2>
        </div>
        {/* <div style={{ padding: '20px' }}>
          <TextInputExample />
        </div>
        <TextAreaExample /> */}

        <Grid>
          <Grid.Col span={6}>PatientInfo </Grid.Col>
          <Grid.Col span={6}>DoctorNotes</Grid.Col>
          <Grid.Col span={6}>PatientChart</Grid.Col>
          <Grid.Col span={6}>PatientAnalysis</Grid.Col>
        </Grid>

        <footer className="footer">
          Built with MongoDB
        </footer>
      </div>
      
    </MantineProvider>
  );
}

export default App;
