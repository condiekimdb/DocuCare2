import {
  Chip,
  Container,
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

type chip_keyword = {
  keyword: string;
};

interface DoctorNotesProps {
  patientId: string | undefined;
}

const DoctorNotes = ({ patientId }: DoctorNotesProps) => {
  const [value, setValue] = useState("");
  const [debounced] = useDebouncedValue(value, 1000);
  const [isLoading, setIsLoading] = useState(false);

  const [keywords, setKeywords] = useState<chip_keyword[]>([]);
  const [symptoms, setSymptoms] = useState<chip_keyword[]>([]);

  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");

  useEffect(() => {
    if (debounced) {
      console.log("Debounced!");
      setIsLoading(true);
      setTimeout(() => {
        setKeywords([
          { keyword: "Dizzyness" },
          { keyword: "Nausea" },
          { keyword: "Night Sweats" },
        ]);
        setSymptoms([
          { keyword: "Short Breath" },
          { keyword: "Itchy Throat" },
          { keyword: "Fever" },
          { keyword: "Insomnia" },
        ]);
        setIsLoading(false);
      }, 1000);
    }
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
    <Container>
      <Group w={600}>
        <Flex
          gap="xxs"
          justify="flex-start"
          align="center"
          direction="column"
          wrap="wrap"
          w={400}
        >
          <Text>Patient Notes: {patientId}</Text>
          <Textarea
            placeholder="Enter notes here..."
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
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
    </Container>
  );
};

export default DoctorNotes;
