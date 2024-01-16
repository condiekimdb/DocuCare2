import { useState } from 'react';
import { Textarea, Button, Box } from '@mantine/core';

function TextAreaExample() {
  const [value, setValue] = useState('');

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    alert(`Textarea Value: ${value}`);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} style={{ maxWidth: 300 }}>
      <Textarea
        label="Mantine Text Area Example"
        placeholder="so much blah you need more space"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        required
        autosize
        minRows={3}
      />

      <Button type="submit" style={{ marginTop: '10px' }}>
        Submit
      </Button>
    </Box>
  );
}

export default TextAreaExample;
