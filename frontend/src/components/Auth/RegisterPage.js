import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom"; // Import useHistory
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Text,
  Flex
} from "@chakra-ui/react";
import image from "../../bg_img1.jpg";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Initialize useHistory

  const handleRegister = () => {
    // Handle registration logic here



    const data = {
      fname: firstName,
      lname: lastName,
      username: username,
      password: password,
      email:email
    };

  
    // Send a POST request to the backend
    let some = fetch('https://infinity-experiment.onrender.com/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Handle success response from the backend here
      navigate('/login');
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle error response from the backend here
    });



  };

  const handleSignIn = () => {
    // Handle login logic here
    navigate('/login');
  };

  return (
    <div className="flex  justify-center bg-gray-100 w-full h-screen" >
    <Box className="bg-white" maxW="2xl"  w="4xl" h="3xl" mx="2" mt={8}  borderWidth="1px" borderRadius="lg">
      <Stack spacing={4}>
        <Container maxW="container.sm" textAlign="center" mt={16} mb={10}>
      <Heading className=""  ml={2} maxW="lg" textAlign="start" as="h1" size="md" mb={2}>
        Register your account
      </Heading>
      <Text  maxW="lg" ml={2} textAlign="start" as="p" size="xs" mb={8}>
        Fill the details below to submit register account.
      </Text>
        </Container>
      <Stack maxW="xl" ml={10} justify="start" spacing={4} direction="row">
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
            maxW="lg"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
          </FormControl>
        </Stack>
        <FormControl maxW="xl" ml={10}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl maxW="xl" ml={10}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl maxW="xl" ml={10}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Flex className="" ml="6"  align="center" maxW="xl" justify="center" mb={2}>
        <Text>By signing in, you are aggree to our Terms & Conditions and Privacy Policy.</Text>
      </Flex>
        <Button maxW="xl"bg="#f15f40" textColor="white" ml={10} onClick={handleRegister}  className="hover:bg-orange-500" >
          Register
        </Button>

        <Flex className="" ml="16"  align="center" maxW="lg" justify="center" mb={20}>
        <Text>Already have an account ? </Text>&nbsp;
        <Button className="hover:bg-transparent" textColor="#f15f40" variant="link" onClick={handleSignIn}>
           Login
        </Button>
      </Flex>
      </Stack>
    </Box>
    </div>
  );
};

export default RegisterPage;
