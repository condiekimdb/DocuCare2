import { Paper, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";

interface PatientSummaryProps {
  patientId: string | undefined;
  patientData: any;
}

const PatientSummary: React.FC<PatientSummaryProps> = ({ patientId }) => {
  const [summary, setSummary] = useState(
    "Angelo is an 81-year-old black male patient who has a history of various acute and viral conditions such as sinusitis, acute bronchitis, and acute viral pharyngitis. He also has osteoarthritis of the hip and prediabetes, and has experienced a stroke in the past. Angelo is currently being medicated for his hip osteoarthritis, bronchitis, and multiple instances of stroke. The reason for his most recent visit is not noted."
  );

  //   useEffect(() => {
  //     postPatientSummary(patientId);
  //   }, []);

  const postPatientSummary = async (patientId: string) => {
    const url =
      "https://us-east-1.aws.data.mongodb-api.com/app/docucare-rubsv/endpoint/patientsummary";

    try {
      const response = await axios.post(url, {
        patient: patientId,
      });
      console.log("Patient Summary:", response.data);
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error during POST request with axios:", error);
    } finally {
      // setIsLoaded(true);
    }
  };

  return (
    <Paper withBorder p={20} mt={20} style={{ border: "1px solid #ccc" }}>
      <Text fw={700}>Patient Summary</Text>
      <Text>{summary}</Text>
    </Paper>
  );
};

export default PatientSummary;
