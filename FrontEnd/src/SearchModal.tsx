import React, { useState } from 'react';
import { Modal, TextInput, Text, Group} from '@mantine/core';
import axios from 'axios';
import "./index.css"

// Interface for props
interface SearchModalProps {
  modalOpened: boolean;
  setModalOpened: (opened: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

interface Text {
    value: string;
    type: string; // You might want to use a more specific type if there are only a limited number of valid strings
  }
  
  interface Highlight {
    score: number;
    path: string;
    texts: Text[];
  }
  
  interface SearchResult {
    id: string;
    first: string;
    last: string;
    patient: string;
    highlights: Highlight[];
  }

function SearchModal({ modalOpened, setModalOpened, searchQuery, setSearchQuery }: SearchModalProps) {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
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

        console.log(searchResults);
    };
    
    const handleResultClick = (patientId: string) => {
        console.log("handleResultClick", patientId);
        setModalOpened(false); 
        window.location.href = `/patient/${patientId}`;
    };

    function renderHighlightedName(name: string, highlights: Highlight[]): React.ReactNode {
        // Find the highlight that applies to the name
        const highlight = highlights.find(h => h.texts.some(t => t.value.includes(name)));
        if (!highlight) return name; // Return the name as is if no highlight is found
      
        // Combine all text segments (both hits and non-hits) into a single string
        return highlight.texts.map((text, index) => {
          return text.type === "hit" ? (
            <b key={`${name}-highlight-${index}`}>{text.value}</b>
          ) : (
            <span key={`${name}-highlight-${index}`}>{text.value}</span>
          );
        });
      }
      
    

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
        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'  }}>
            {searchResults.map((result) => (
            <Group key={result.patient} style={{ cursor: 'pointer' }} onClick={() => handleResultClick(result.patient)}>
                <div style={{marginTop:'15'}}>
                <Text id="result">
                    {renderHighlightedName(result.first, result.highlights)}
                    {' '}
                    {renderHighlightedName(result.last, result.highlights)}
                </Text>
                </div>
            </Group>
            ))}
        </div>
        )}

      </Modal>
    </div>
  );
}

export default SearchModal;
