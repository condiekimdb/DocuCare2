import React, { useEffect, useState } from "react";
import { Paper, Select, Tabs } from "@mantine/core";
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
  const [activeTab, setActiveTab] = useState<string>("historical"); // State to track the active tab

  // Wrapper function for setActiveTab to handle potential null values
  const handleTabChange = (value: string | null) => {
    if (value !== null) {
      setActiveTab(value);
    }
  };

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

  /* Set default selectedDescription */
  useEffect(() => {
    if (
      !selectedDescription &&
      observations.includes("Systolic Blood Pressure")
    ) {
      setSelectedDescription("Systolic Blood Pressure");
    }
  }, [observations]);

  /* Historical Chart */
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

    const chartContainer = document.getElementById("historical-chart");
    try {
      if (chartContainer) {
        chart.render(chartContainer);
      }
    } catch (error) {
      window.alert("Chart failed to initialise");
    }
  }, [patientId, selectedDescription]); // Re-run the effect if patientId or selectedDescription changes

  /* Live Chart */
  useEffect(() => {
    const sdk = new ChartsEmbedSDK({
      baseUrl: "https://charts.mongodb.com/charts-clarence_training-nwffr",
    });

    console.log(patientId);
    const chart = sdk.createChart({
      chartId: "65a7ea2a-1d1f-436b-8cf2-c8b862cea49f",
      filter: {
        "metadata.sensorId": patientId,
      },
      maxDataAge: 5,
      autoRefresh: true,
    });

    const chartContainer = document.getElementById("live-chart");
    try {
      if (chartContainer) {
        chart.render(chartContainer);
      }
    } catch (error) {
      window.alert("Chart failed to initialise");
    }
  }, []);

  return (
    <Paper withBorder p={20} style={{ border: "1px solid #ccc" }}>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tabs.List>
          <Tabs.Tab value="historical">Historical Data</Tabs.Tab>
          <Tabs.Tab value="live">Live Data</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="historical">
          <Select
            label="Select Observation to Chart"
            placeholder="Choose..."
            data={dropdownOptions}
            value={selectedDescription}
            onChange={setSelectedDescription}
          />
          <div className="chart" id="historical-chart"></div>
        </Tabs.Panel>

        <Tabs.Panel value="live">
          <div className="chart" id="live-chart"></div>
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
};

export default PatientChart;
