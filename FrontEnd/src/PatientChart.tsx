import React, { useEffect, useState } from "react";
import { Paper, Select } from "@mantine/core";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import "./App.css";

interface PatientChartProps {
  patientId: string | undefined;
  patientData: any;
}

const PatientChart: React.FC<PatientChartProps> = ({
  patientId,
  patientData,
}) => {
  const [selectedDescription, setSelectedDescription] = useState<string | null>(
    null
  );

  function extractUniqueDescriptions(data: any[]) {
    const uniqueDescriptions = new Set<string>();
    data.forEach((item) => {
      if (item.observations && Array.isArray(item.observations)) {
        item.observations.forEach((observation: { DESCRIPTION: any }) => {
          if (typeof observation.DESCRIPTION === "string") {
            uniqueDescriptions.add(observation.DESCRIPTION);
          }
        });
      }
    });
    return Array.from(uniqueDescriptions);
  }

  const observations = extractUniqueDescriptions(patientData);
  const dropdownOptions = observations.map((description) => ({
    value: description,
    label: description,
  }));

  useEffect(() => {
    const sdk = new ChartsEmbedSDK({
      baseUrl: "https://charts.mongodb.com/charts-clarence_training-nwffr",
    });

    const chart = sdk.createChart({
      chartId: "65a71b5b-ea68-4d4b-8956-0f8f0a2c55c4",
      filter: {
        PATIENT: patientId,
        ...(selectedDescription && { DESCRIPTION: selectedDescription }),
      },
    });

    const chartContainer = document.getElementById("chart");
    try {
      if (chartContainer) {
        chart.render(chartContainer);
      }
    } catch (error) {
      window.alert("Chart failed to initialise");
    }
  }, [patientId, selectedDescription]); // Re-run the effect if patientId or selectedDescription changes

  return (
    <Paper withBorder p={20} style={{ border: "1px solid #ccc" }}>
      <Select
        label="Select Observation to Chart"
        placeholder="Choose..."
        data={dropdownOptions}
        value={selectedDescription}
        onChange={setSelectedDescription}
      />
      <div id="chart"></div>
    </Paper>
  );
};

export default PatientChart;
