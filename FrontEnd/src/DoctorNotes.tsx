import {
  Chip,
  //   Container,
  Flex,
  Group,
  Loader,
  Textarea,
  Text,
  Button,
  Paper,
  Center,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { IconSparkles } from "@tabler/icons-react";
import axios from "axios";

type chip_keyword = {
  keyword: string;
};

interface DoctorNotesProps {
  patientId: string | undefined;
}

const DoctorNotes = ({ patientId }: DoctorNotesProps) => {
  const [doctorNotes, setDoctorNotes] = useState("");
  const [debounced] = useDebouncedValue(doctorNotes, 1000);
  const [isLoading, setIsLoading] = useState(false);

  const [keywords, setKeywords] = useState<chip_keyword[]>([]);
  const [symptoms, setSymptoms] = useState<chip_keyword[]>([]);

  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");

  function processString(inputString: string) {
    // Remove trailing period
    const stringWithoutPeriod = inputString.replace(/\.$/, "");

    // Convert comma-separated values into an array
    const resultArray = stringWithoutPeriod.split(", ");

    return resultArray;
  }

  const postPatientData = async () => {
    const url =
      "https://us-east-1.aws.data.mongodb-api.com/app/docucare-rubsv/endpoint/generatesymptoms";

    try {
      const response = await axios.post(url, {
        message: debounced,
      });
      // setResponseData(response.data);
      console.log(response.data);
      const ai_symptoms = processString(response.data.message);
      const ai_symptoms_map = ai_symptoms.map((i) => {
        return { keyword: i };
      });
      setSymptoms(ai_symptoms_map);
    } catch (error) {
      console.error("Error during POST request with axios:", error);
    } finally {
      // setIsLoaded(true);
    }
  };

  useEffect(() => {
    if (debounced) {
      console.log("Debounced!");
      setIsLoading(true);
      // Get updated symptoms here

      postPatientData();

      setTimeout(() => {
        setKeywords([
          { keyword: "Dizzyness" },
          { keyword: "Nausea" },
          { keyword: "Night Sweats" },
        ]);
        setIsLoading(false);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  useEffect(() => {
    if (isDiagnosing) {
      console.log("isDiagnosing");
      setTimeout(() => {
        setDiagnosis(
          "Patient is likely experiencing seasonal Flu. Recommendation is over the counter flu medicine"
        );
        setIsDiagnosing(false);
      }, 1000);
    }
  }, [isDiagnosing]);

  const chip_props = {
    color: "green",
    checked: true,
    variant: "outline",
  };

  return (
    <Paper withBorder p={20} mt={20} style={{ border: "1px solid #ccc" }}>
      <Group w={600}>
        <Flex
          gap="xxs"
          justify="flex-start"
          align="center"
          direction="column"
          wrap="wrap"
          w={400}
        >
          <Text fw={700}>Patient Notes</Text>
          <Textarea
            placeholder="Enter notes here..."
            value={doctorNotes}
            onChange={(event) => setDoctorNotes(event.currentTarget.value)}
            autosize
            minRows={10}
            mb={10}
            w={400}
          />
          {isLoading ? (
            <Loader color="green" type="bars" />
          ) : (
            <Group justify="center">
              {keywords.map((item, i) => {
                return (
                  <Chip key={"keyword_" + i} value="1" {...chip_props}>
                    {item.keyword}
                  </Chip>
                );
              })}
            </Group>
          )}
        </Flex>

        <Flex
          mih={50}
          gap="xxs"
          justify="center"
          align="flex-start"
          direction="column"
          wrap="wrap"
          w={150}
        >
          <Group justify="center">
            {isLoading ? (
              <Loader color="orange" type="bars" />
            ) : (
              <>
                {symptoms.length > 0 && (
                  <>
                    <Text>Symptoms</Text>
                    {symptoms.map((item, i) => {
                      return (
                        <Chip
                          key={"symptom_" + i}
                          value="1"
                          {...chip_props}
                          color="orange"
                        >
                          {item.keyword}
                        </Chip>
                      );
                    })}
                    {/* <Button disabled={symptoms.length < 4}>Diagnose</Button> */}
                  </>
                )}
              </>
            )}
          </Group>
        </Flex>
      </Group>
      {symptoms.length > 3 && (
        <Paper mt="xs" p="sm" withBorder w={600}>
          <Center>
            {isDiagnosing ? (
              <Loader color="green" type="bars" />
            ) : (
              <Text>{diagnosis}</Text>
            )}
            {diagnosis === "" && !isDiagnosing && (
              <Button onClick={() => setIsDiagnosing(true)} color="green">
                <IconSparkles />
                Diagnose
              </Button>
            )}
          </Center>
        </Paper>
      )}
    </Paper>
  );
};

export default DoctorNotes;
