import React from "react";
import "./App.css";
import "@mantine/core/styles.css";
import { Avatar, Flex, Group, Paper, Text } from "@mantine/core";

/* Sample PatientID : aaa4c718-2f48-4c13-9ad0-d287cf280824 */

interface PatientInfoProps {
  patientId: string | undefined;
  patientData: any;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ patientData }) => {
  //   const patient = patientData[0];

  return (
    <Paper withBorder p={20} mt={20} style={{ border: "1px solid #ccc" }}>
      {patientData && (
        <Group justify="center">
          <Avatar color="cyan" radius="xl" size="xl">{`${
            String(patientData[0].first)[0]
          }${String(patientData[0].last)[0]}`}</Avatar>
          <Flex direction="column">
            <Text fw={700}>
              {`${patientData[0].prefix}
            ${patientData[0].first} ${patientData[0].last}`}
            </Text>
            <Text>DOB: {patientData[0].birthdate}</Text>
          </Flex>
          <Flex direction="column" align="flex-start">
            <Text>{`Allergies: ${patientData[0].allergies.length}`}</Text>
            <Text>{`Medications: ${patientData[0].medications.length}`}</Text>
          </Flex>
          <Flex direction="column" align="flex-start">
            <Text>{`Pre-existing Conditions: ${patientData[0].conditions.length}`}</Text>
            <Text>{`Past Procedures: ${patientData[0].procedures.length}`}</Text>
          </Flex>
        </Group>
      )}
      {/* {patientData && (
        <div>
          {patientData.map(
            (
              patient: {
                _id: any;
                prefix:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
                first:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
                last:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
                gender:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
                birthdate:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
                address:
                  | string
                  | number
                  | boolean
                  | React.ReactElement<
                      any,
                      string | React.JSXElementConstructor<any>
                    >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | null
                  | undefined;
              },
              index: any
            ) => (
              <Grid key={patient._id || index}>
                <Grid.Col span={12}>
                  <div>
                    <Text fw={700}>
                      {patient.prefix} {patient.first} {patient.last}
                    </Text>
                  </div>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Avatar color="cyan" radius="xl" size="xl">{`${
                    String(patient.first)[0]
                  }${String(patient.last)[0]}`}</Avatar>
                  <div>Gender: {patient.gender}</div>
                </Grid.Col>
                <Grid.Col span={6}>
                  <div>{patient.birthdate}</div>
                </Grid.Col>
                <Grid.Col span={12}>
                  <div>{patient.address}</div>
                </Grid.Col>
              </Grid>
            )
          )}
        </div>
      )} */}
    </Paper>
  );
};

export default PatientInfo;
