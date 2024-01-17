import "./App.css";
import { MantineProvider, Grid } from "@mantine/core";
import DocucareLogo from "./assets/docucare.png";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import "@mantine/core/styles.css";
import PatientInfo from "./PatientInfo";
import PatientChart from "./PatientChart";
import PatientSummary from "./PatientSummary";
import DoctorNotes from "./DoctorNotes";
import SearchModal from "./SearchModal";

function PatientRouteWrapper() {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState(null); // State to hold patient data
  const [isLoaded, setIsLoaded] = useState(false); // state to track data loading

  useEffect(() => {
    postPatientData();
  }, []); // The empty array ensures this effect runs once on mount

  const postPatientData = async () => {
    const url =
      "https://us-east-1.aws.data.mongodb-api.com/app/docucare-rubsv/endpoint/basicinfo";

    try {
      const response = await axios.post(url, { patient: patientId });
      setPatientData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error during POST request with axios:", error);
    } finally {
      setIsLoaded(true);
    }
  };

  if (!isLoaded) {
    return <div className="box">Loading...</div>;
  }

  if (isLoaded && (!patientData || (patientData as any[]).length === 0)) {
    return (
      <div className="box">Unable to find patient with id: {patientId}</div>
    );
  }

  return (
    <>
      <Grid>
        <Grid.Col span={6}>
          <PatientInfo patientId={patientId} patientData={patientData} />
        </Grid.Col>
        <Grid.Col span={6}>
          <PatientSummary patientId={patientId} patientData={patientData} />
        </Grid.Col>
        <Grid.Col span={6}>
          <PatientChart patientId={patientId} patientData={patientData} />
        </Grid.Col>
        <Grid.Col span={6}>
          <DoctorNotes patientId={patientId} />
        </Grid.Col>
      </Grid>
    </>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    setIsModalOpen(false); // Automatically open the modal when the app starts
  }, []);

  return (
    <Router>
      <MantineProvider>
        <SearchModal
          modalOpened={isModalOpen}
          setModalOpened={setIsModalOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <div>
          <div className="header">
            <Grid>
              <Grid.Col span={2}>
                <img src={DocucareLogo} alt="DocuCare Logo" />
              </Grid.Col>
              <Grid.Col span={8}>
                <h1 className="title">DocuCare</h1>
                <h2>Enhancing Doctor-Patient Relationships</h2>
              </Grid.Col>
            </Grid>
          </div>

          <Grid>
            <Grid.Col span={12}>
              <Routes>
                <Route path="/" element={<PatientRouteWrapper />} />
                <Route
                  path="/patient/:patientId"
                  element={<PatientRouteWrapper />}
                />
              </Routes>
            </Grid.Col>
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
