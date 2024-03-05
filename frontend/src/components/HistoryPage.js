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
  Flex,
  VStack,
  List,
  ListItem,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { CopyBlock } from "react-code-blocks";
import "../App.css";
import Highlighter from "react-highlight-words";

const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
  },
});

const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://infinity-experiment.onrender.com/api/retriveRecords",
      {
        headers: {
          Authorization : localStorage.getItem('token')
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const HistoryPage = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState(null);
  const [token, setToken] = useState(false);
  const navigate = useNavigate(); // Initialize useHistory


  let some;
  useEffect(() => {
    const getData = async () => {
      
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(true);
        const result = await fetchData();
        if (result) {
          setData(result);
        }
      }

    };

    getData();
  }, []);

  const handleClick = (item) => {
    setSelectedItem(item);
  };




  return (
    <>
    <div className="flex justify-center items-center ">
    {token ? (      <div className="flex justify-center items-center mt-10">
        {data ? (
          <Flex className="justify-center" mt={10}>
            <VStack
              spacing="4"
              w={400}
              h={600}
              align="stretch"
              className="border text-center border-dashed border-orange-600 rounded max-h-auto"
            >
              <Text fontSize="xl" mt={10} mb={10} fontWeight="bold">
                Recent
              </Text>
              <List spacing="3">
                {data.map((item) => (
                  <ListItem
                    key={item._id}
                    cursor="pointer"
                    onClick={() => handleClick(item)}
                    bg={selectedItem === item ? "orange.400" : "transparent"}
                    rounded="md"
                    px="4"
                    py="2"
                    mx={10}
                    transition="background 0.3s"
                    _hover={{ bg: "orange.300" }}
                  >
                    {item.filename}
                  </ListItem>
                ))}
              </List>
            </VStack>

            <Divider orientation="vertical" />

            <Box
              ml="4"
              w={1300}
              className="flex border border-dashed border-orange-600 max-h-auto rounded justify-center items-center"
            >
              <VStack align="stretch">
                {selectedItem ? (
                  <Box borderRadius="md" p="4">
                    <Text
                      className=""
                      mt={10}
                      mb={10}
                      fontSize="xl"
                      fontWeight="bold"
                    >
                      {selectedItem.filename} - {selectedItem.model} -{" "}
                      {selectedItem.date}
                    </Text>

                    <Accordion
                      w={940}
                      minHeight={500}
                      defaultIndex={[0]}
                      allowMultiple
                    >
                      <AccordionItem>
                        <h2>
                          <AccordionButton mb={5}>
                            <Box
                              as="span"
                              color="black"
                              flex="1"
                              textAlign="left"
                            >
                              Summary
                            </Box>
                            <AccordionIcon color="black" />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <Box className="text-left text-md" w={900} mb={12}>
                            <Highlighter
                              highlightClassName="demos"
                              searchWords={selectedItem.keywords}
                              autoEscape={true}
                              textToHighlight={selectedItem.story}
                            />
                          </Box>
                        </AccordionPanel>
                      </AccordionItem>
                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <Box
                              as="span"
                              color="black"
                              flex="1"
                              textAlign="left"
                            >
                              Code
                            </Box>
                            <AccordionIcon color="black" />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <Box w={1000} className="w-4/5 text-left text-md">
                            <div className="demo">
                              <CopyBlock
                                text={selectedItem.response}
                                language={selectedItem.language}
                                wrapLines
                                codeBlock
                              />
                            </div>
                          </Box>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Box>
                ) : (
                  <Box className="justify-center items-center">
                    <Text>No item selected</Text>
                  </Box>
                )}
              </VStack>
            </Box>
          </Flex>
        ) : (
          <div>Loading...</div>
        )}
      </div>) : (
        <Box className="border border-dashed border-orange-500 rounded flex justify-center items-center" h={200} w={500} mt={250}>
          <Text>You are not signed in. Please sign in.</Text>
        </Box>
      )}
    </div>

    </>
  );
};

export default HistoryPage;
