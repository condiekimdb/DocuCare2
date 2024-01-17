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
  Grid,
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
    const stringWithoutPeriod = inputString.replace(/\.$/, "");
    const resultArray = stringWithoutPeriod.split(", ");
    return resultArray;
  }

  const postSymptoms = async () => {
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

  const postKeywords = async () => {
    const url =
      "https://us-east-1.aws.data.mongodb-api.com/app/docucare-rubsv/endpoint/keywords";

    try {
      const response = await axios.post(url, {
        text: debounced,
      });
      // setResponseData(response.data);
      console.log(response.data);
      const ai_keywords = processString(response.data.message);
      const ai_keywords_map = ai_keywords.map((i) => {
        return { keyword: i };
      });
      setKeywords(ai_keywords_map);
    } catch (error) {
      console.error("Error during POST request with axios:", error);
    } finally {
      // setIsLoaded(true);
    }
  };

  const postDiagnosis = async () => {
    const url =
      "https://us-east-1.aws.data.mongodb-api.com/app/docucare-rubsv/endpoint/vectordiagnosis";

    setIsDiagnosing(true);
    const symptoms_string = symptoms.map((item) => item.keyword);
    const input = `Doctor Notes:\n${debounced}\n\nSymptoms:\n${symptoms_string.join(
      "\n"
    )}`;
    console.log("Diagnosis Input", input);
    try {
      const response = await axios.post(url, {
        text: input,
      });
      console.log("Diagnosis:", response.data);
      setDiagnosis(response.data.message);
    } catch (error) {
      console.error("Error during POST request with axios:", error);
    } finally {
      setIsDiagnosing(false);
    }
  };

  useEffect(() => {
    if (debounced) {
      console.log("Debounced!", patientId);
      setIsLoading(true);

      Promise.all([postSymptoms(), postKeywords()]).then(() =>
        setIsLoading(false)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const chip_props = {
    color: "green",
    checked: true,
    variant: "outline",
  };

  return (
    <Paper withBorder p={20} style={{ border: "1px solid #ccc" }}>
      <Grid>
        <Grid.Col span={9}>
          <Flex
            gap="xxs"
            justify="flex-start"
            align="center"
            direction="column"
            wrap="wrap"
            // w={560}
          >
            <Text fw={700}>Patient Notes</Text>
            <Textarea
              placeholder="Enter notes here..."
              value={doctorNotes}
              onChange={(event) => setDoctorNotes(event.currentTarget.value)}
              autosize
              minRows={10}
              mb={10}
              w="100%"
            />
            {isLoading ? (
              <Loader color="green" type="bars" />
            ) : (
              <>
                {keywords.length > 0 && (
                  <Text fw={500} size="sm">
                    Other Potential Topics
                  </Text>
                )}
                <Group justify="center">
                  {keywords.map((item, i) => {
                    return (
                      <Chip key={"keyword_" + i} value="1" {...chip_props}>
                        {item.keyword}
                      </Chip>
                    );
                  })}
                </Group>
              </>
            )}
          </Flex>
        </Grid.Col>
        <Flex
          gap="md"
          justify="flex-start"
          align="center"
          direction="column"
          wrap="wrap"
          // w={150}
        >
          {/* <Flex gap="md" justify="flex-start" align="center" direction="column"> */}
          {isLoading ? (
            <Loader color="orange" type="bars" />
          ) : (
            <>
              {symptoms.length > 0 && (
                <>
                  <Text fw={700}>Symptoms</Text>
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
                </>
              )}
            </>
          )}
          {/* </Flex> */}
        </Flex>
      </Grid>
      {symptoms.length > 3 && (
        <Paper mt="xs" p="sm" withBorder w="100%">
          <Center>
            {isDiagnosing ? (
              <Loader color="green" type="bars" />
            ) : (
              <Text>{diagnosis}</Text>
            )}
            {diagnosis === "" && !isDiagnosing && (
              <Button onClick={() => postDiagnosis()} color="green">
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
