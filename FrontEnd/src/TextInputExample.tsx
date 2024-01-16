import React, { useState } from 'react';
import { TextInput, Button, Box } from '@mantine/core';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

function TextInputExample() {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Input Value: ${value}`);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextInput
        label="Mantine Text Input Example"
        placeholder="blah blah blah"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        required
      />

      <Button type="submit" style={{ marginTop: '10px' }}>
        Submit
      </Button>
    </Box>
  );
}

export default TextInputExample;
