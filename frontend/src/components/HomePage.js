// App.js
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../App.css";
import ReactMarkdown from "react-markdown";
import {
  Button,
  VStack,
  Text,
  Spinner,
  Skeleton,
  Stack,
  Alert,
  AlertIcon,
  Input,
  chakra,
  border,
  Box,
  Select,
  Heading,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import "../App.css";
import { CopyBlock } from "react-code-blocks";
import Highlighter from "react-highlight-words";

const fileTypeIcons = {
  "text/plain": "📄",
  "application/pdf": "📄",
  "application/msword": "📄",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "📄",
};

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [fileMessage, setFileMessage] = useState("");
  const [story, setStory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedModel, setModelLanguage] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [TopP, setTopPValue] = React.useState(1);
  const [tempurature, settempuratureValue] = React.useState(0.7);
  const [token, settokenValue] = React.useState(2311);

  const [showTopPTooltip, setShowTopPTooltip] = React.useState(false);
  const [showtempuratureTooltip, setShowtempuratureTooltip] = React.useState(false);
  const [showtokenTooltip, setShowtokenTooltip] = React.useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    const getCurrentDateTime = () => {
      const now = new Date();
      const date = `${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}/${now.getFullYear()}`;
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      setCurrentDateTime(`${date} ${time}`);
    };

    getCurrentDateTime();
  }, []);
  console.log(fileMessage);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleModelChange = (event) => {
    setModelLanguage(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      await setLoading(true);
      await setFileMessage("sasd");

      console.log(TopP)
      console.log(tempurature)
      console.log(token)
      
      const formData = new FormData();

      formData.append("file", file);
      formData.append("language", selectedLanguage);
      formData.append("model", selectedModel);
      formData.append("TopP", TopP);
      formData.append("tempurature", tempurature);
      formData.append("token", token);


      console.log("formData", formData);
      const response = await axios.post(
        "https://infinity-experiment.onrender.com/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        console.log("enter");
        console.log(response);
        const filePath = response.data;
        // Fetch or display the content of the generated JSON file as needed
        // For example, you might want to fetch the content and log it

        const flattenedArray = filePath.data_list.flat();
        await setFileMessage(filePath.generated_code);
        await setStory(filePath.generated_story);
        await setKeyword(flattenedArray);

        let filesname = file.name.replace(/\.xml$/, ""); // Removes the ".xml" extension
        console.log(filesname); // Output: "some"
        let somes = [
          {
            id: 1,
            keywords: flattenedArray,
            story: filePath.generated_story,
            response: filePath.generated_code,
            date: currentDateTime,
            language: selectedLanguage,
            model : selectedModel,
            filename : filesname,

          },
        ];

        const saveResponse = await axios.post(
          "https://infinity-experiment.onrender.com/api/addUserStories",
          somes,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem('token'),
            },
          }
        );

        if (saveResponse.data) {
          console.log("data is saved");
        }

        await setLoading(false);
        console.log(`Story generated successfully.`);
      } else {
        console.error("Failed to generate story.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const CodeSnippets = () => {
    const markdownContent = `${fileMessage}`;

    console.log(markdownContent);
    return (
      <div className="demo">
        <CopyBlock
          text={fileMessage}
          language={selectedLanguage}
          wrapLines
          codeBlock
        />
      </div>
    );
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleDelete = () => {
    setFile(null);
    setFileMessage("");
  };

  return (
    <div className=" mx-auto flex px-5 py-16 items-center justify-center flex-col">
      <div className="mx-auto flex px-5 py-16 items-center justify-center flex-col">
        <div className="flex flex-col justify-center items-center text-center w-full">
          <Text
            w={500}
            className="my-4 text-2xl font-bold leading-tight"
            mb={20}
          >
            Code Generation Made Easy: Start by Uploading Your BPMN Diagrams
          </Text>
          <div className="flex justify-center mx-auto">
            <VStack spacing={4} align="stretch">
              <input
                type="file"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <div class="flex items-center justify-center flex-col gap-4  w-fit ">
                <Button
                  onClick={handleButtonClick}
                  className="bg-white border border-dashed border-orange-500 rounded hover:bg-white"
                  colorScheme="white"
                  w={600}
                  h={200}
                >
                  <div className="">
                    <AttachmentIcon w={8} h={8} color="red.500" />
                    <Text className="text-xl" textColor="grey" mt={10}>
                      Click to upload
                    </Text>
                  </div>
                </Button>
                {/* <Button
                  className=" text-white font-bold py-2 px-4 rounded"
                  onClick={handleButtonClick}
                >
                  Select File
                </Button> */}
                <Select
                  placeholder="Select model"
                  onChange={handleModelChange}
                  value={selectedModel}
                >
                  <option value="gpt4">GPT 4</option>
                  <option value="operhermes">Operhermes 2.5</option>
                </Select>
                <Select
                  placeholder="Select language"
                  onChange={handleLanguageChange}
                  value={selectedLanguage}
                >
                  <option value="Python">Python</option>
                  <option value="Javascript">Javascript</option>
                  <option value="Reactjs">Reactjs</option>
                </Select>
                <Accordion defaultIndex={[0]} allowMultiple>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left' color="black" w={540}>
          Custom
        </Box>
        <AccordionIcon color="black"/>
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    <Box className="" w={540} mb={10}>
                <Text className="mt-10 ml-2 mb-5 text-md text-left">Creative</Text>
                  <Slider
                    step={0.01}
                    w={550}
                    aria-label="slider-ex-4"
                    defaultValue={1}
                    min={0}
                    max={1}
                    onChange={(v) => setTopPValue(v)}
                    onMouseEnter={() => setShowTopPTooltip(true)}
                    onMouseLeave={() => setShowTopPTooltip(false)}
                  >
                    <SliderMark value={25} mt="1" ml="-2.5" fontSize="sm">
                      25%
                    </SliderMark>
                    <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
                      50%
                    </SliderMark>
                    <SliderMark value={75} mt="1" ml="-2.5" fontSize="sm">
                      75%
                    </SliderMark>
                    <SliderTrack bg="red.100">
                      <SliderFilledTrack bg="tomato" />
                    </SliderTrack>
                    <Tooltip
                      hasArrow
                      bg="teal.500"
                      color="white"
                      placement="top"
                      isOpen={showTopPTooltip}
                      label={`${TopP}%`}
                    >
                      <SliderThumb boxSize={6}>
                        <Box color="tomato" />
                      </SliderThumb>
                    </Tooltip>
                  </Slider>
                  <Text className="mt-10 ml-2 mb-5 text-md text-left">Randomness</Text>
                  <Slider
                    step={0.01}
                    w={550}
                    aria-label="slider-ex-4"
                    defaultValue={0.1}
                    min={0.0}
                    max={1.0}
                    onChange={(v) => settempuratureValue(v)}
                    onMouseEnter={() => setShowtempuratureTooltip(true)}
                    onMouseLeave={() => setShowtempuratureTooltip(false)}
                  >
                    <SliderMark value={25} mt="1" ml="-2.5" fontSize="sm">
                      25%
                    </SliderMark>
                    <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
                      50%
                    </SliderMark>
                    <SliderMark value={75} mt="1" ml="-2.5" fontSize="sm">
                      75%
                    </SliderMark>
                    <SliderTrack bg="red.100">
                      <SliderFilledTrack bg="tomato" />
                    </SliderTrack>
                    <Tooltip
                      hasArrow
                      bg="teal.500"
                      color="white"
                      placement="top"
                      isOpen={showtempuratureTooltip}
                      label={`${tempurature}%`}
                    >
                      <SliderThumb boxSize={6}>
                        <Box color="tomato" />
                      </SliderThumb>
                    </Tooltip>
                  </Slider>
                  <Text className="mt-10 ml-2 mb-5 text-md text-left">Maximum Output Length</Text>
                  <Slider
                    w={550}
                    aria-label="slider-ex-4"
                    defaultValue={2311}
                    min={0}
                    max={3000}
                    onChange={(v) => settokenValue(v)}
                    onMouseEnter={() => setShowtokenTooltip(true)}
                    onMouseLeave={() => setShowtokenTooltip(false)}
                  >
                    
                    <SliderTrack bg="red.100">
                      <SliderFilledTrack bg="tomato" />
                    </SliderTrack>
                    <Tooltip
                      hasArrow
                      bg="teal.500"
                      color="white"
                      placement="top"
                      isOpen={showtokenTooltip}
                      label={`${token}%`}
                    >
                      <SliderThumb boxSize={6}>
                        <Box color="tomato" />
                      </SliderThumb>
                    </Tooltip>
                  </Slider>
                </Box>
    </AccordionPanel>
  </AccordionItem>

</Accordion>

                <Button
                    w={600}
                  className=" text-white font-bold py-2 px-4 rounded"
                  onClick={handleUpload}
                  disabled={!file}
                  bg="#f15f40"
                  textColor="white"
                >
                  Upload
                </Button>
              </div>
              {file && (
                <Text className="mt-10 text-xl ">
                  Selected File: {file.name} ({file.size} bytes)
                </Text>
              )}
              <div className="py-4">
                {fileMessage !== "" ? (
                  loading ? (
                    <Spinner color="red.500" />
                  ) : (
                    <Alert status="success">
                      <AlertIcon />
                      The output is saved in your history.
                    </Alert>
                  )
                ) : null}
              </div>
            </VStack>
          </div>
        </div>
      </div>
      {fileMessage !== "" ? (
        loading ? (
          <Stack className="flex mx-auto px-5 py-24 h-full w-5/6 ">
            {/* Skeleton component for loading effect */}
            <Skeleton height="20px" width="100%" />
            <Skeleton height="20px" width="100%" />
            <Skeleton height="20px" width="100%" />
          </Stack>
        ) : (
          <div className="flex flex-col w-4/5 justify-center items-center text-left ">
            <Text className="mb-10 text-xl text-left">Summary</Text>
            <Box className="w-4/5 text-center  text-xl" w={1300} mb={10}>
              <Highlighter
                highlightClassName="demos"
                searchWords={keyword}
                autoEscape={true}
                textToHighlight={story}
              />
            </Box>
            <Text className="mb-10 text-xl text-left">Code</Text>
            <div className="w-4/5 text-left border border-dashed border-orange-500 rounded">
              <CodeSnippets />
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};

export default HomePage;
