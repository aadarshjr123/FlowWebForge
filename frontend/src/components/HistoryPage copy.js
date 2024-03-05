
import BpmnDiagram from "./bpmnXmlCode";
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
  },
});

const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://infinity-experiment.onrender.com/api/retriveRecords/1"
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const HistoryPage = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  console.log(navigate)
  let some;
  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      if (result) {
        setData(result);
      }
    };

    getData();
    some = data;
  }, []);

  // Extract CodeSnippet component to reuse
  const CodeSnippet = (response) => {
    const markdownContent = `${response}`;

    console.log(markdownContent);
    return (
      <ReactMarkdown className="markdown-container">
        {markdownContent}
      </ReactMarkdown>
    );
  };

  return (
    <>
      <div className="w-3/4 mt-10">
        {data ? (
          <Accordion defaultIndex={[0]} allowMultiple>
            {data.data.map((item, index) => (
              
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      textColor={"black"}
                    >
                      {item.name}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} textAlign="left">
                <Text fontSize='xl'>Response :</Text>
                  <div className="flex justify-center mx-auto h-full w-5/6 ">
                    <ReactMarkdown className="markdown-container">
                      {item.response}
                    </ReactMarkdown>
                  </div>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};

export default HistoryPage;
