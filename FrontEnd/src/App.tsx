import './App.css'
import { Container, TextInput, Button, Title, Box, Space } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import TextInputExample from './TextInputExample';
import TextAreaExample from './TextAreaExample';
import React from 'react';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div>
        <h1>sa hackathon</h1>
        <div style={{ padding: '20px' }}>
          <TextInputExample />
        </div>
        <TextAreaExample />
      </div>
    </MantineProvider>
  );
}

export default App;
