import React from 'react';
import { Modal, Button, TextInput } from '@mantine/core';

// Interface for props
interface SearchModalProps {
  modalOpened: boolean;
  setModalOpened: (opened: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

function SearchModal({ modalOpened, setModalOpened, searchQuery, setSearchQuery }: SearchModalProps) {
  console.log('search modal' + modalOpened);
  
    const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    // Here you can call an API with the search query
  };

  return (
    <div>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Search"
        centered={true}
        size={500}
        withinPortal={false}
      >
        <TextInput
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          placeholder="Type to search..."
          autoFocus
        />
        <Button onClick={handleSearch} style={{ marginTop: '10px' }}>
          Search
        </Button>
      </Modal>
    </div>
  );
}

export default SearchModal;
