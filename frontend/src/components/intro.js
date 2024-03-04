import React from 'react';
import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import image from "../image146.png";
import { useNavigate } from 'react-router-dom';

const IntroPage = () => {
    const navigate = useNavigate(); // Initialize useHistory

    const handleUpload = () => {
        // Handle login logic here
        navigate('Upload');
      };
  return (
    <div className='flex justify-center items-center mt-10 w-auto'>
    <Flex
      direction="column"
      align="center"
      textAlign="center"
      justify="center"
      height="80vh"
      backgroundImage={image}
      backgroundSize="cover"
      backgroundPosition="center"
      color="black"
      opacity={0.8}
      borderRadius="lg"
      w={1700}
    >
      <Heading as="h1" size="3xl" textColor="white" mb={6}>
        From words to Code, Transforming <br/> Ideas into Excecution.
      </Heading>
      <Text textColor="white" fontSize="xl" fontWeight="bold" mb={8}>
        Our tool helps you effortlessly convert BPMN diagrams into code snippets, streamlining your development process.
      </Text>
      <Text textColor="white" fontSize="xl" fontWeight="bold" mb={8}>
        We prioritize the protection of your data. Your diagrams and code snippets are securely stored and never shared with third parties.
      </Text>
      <Button onClick={() => window.location.href="/Upload"} className='bg-white hover:bg-white' textColor="black" colorScheme="black" size="lg">
        Get Started
      </Button>
    </Flex>
    </div>
  );
}

export default IntroPage;
