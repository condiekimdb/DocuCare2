import React, { useState } from 'react';
import { Modal, Button, TextInput, Text, Group, Anchor } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Interface for props
interface SearchModalProps {
  modalOpened: boolean;
  setModalOpened: (opened: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

interface SearchResult {
    id: string;
    first: string;
    last: string;
    patient: string;
  }

function SearchModal({ modalOpened, setModalOpened, searchQuery, setSearchQuery }: SearchModalProps) {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const navigate = useNavigate();
    console.log('search modal' + modalOpened);
  
    const handleSearch = async () => {
        console.log('Searching for:', searchQuery);
      
        const url = "https://us-east-1.aws.data.mongodb-api.com/app/docucare-rubsv/endpoint/patientsearch";
        try {
          const response = await axios.post<{ message: SearchResult[] }>(url, { text: searchQuery });
          if (Array.isArray(response.data.message)) {
            setSearchResults(response.data.message);
          } else {
            throw new Error("Response is not in the expected format");
          }
          console.log('Search Results:', response.data.message);
        } catch (error) {
          console.error('Error during POST request with axios:', error);
          setSearchResults([]);
        }
    };
    
    const handleResultClick = (patientId: string) => {
        console.log("handleResultClick", patientId);
        setModalOpened(false); 
        window.location.href = `/patient/${patientId}`;
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
          onChange={(event) => {setSearchQuery(event.currentTarget.value); if (searchQuery.length > 3) {handleSearch();}}}
          placeholder="Type to search..."
          autoFocus
        />
        {searchResults && (
          <div style={{ marginTop: '10px' }}>
            {searchResults.map((result) => (
              <Group key={result.patient} style={{ cursor: 'pointer' }} onClick={() => handleResultClick(result.patient)}>
                <Text>{`${result.first} ${result.last}`}</Text>
              </Group>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default SearchModal;
