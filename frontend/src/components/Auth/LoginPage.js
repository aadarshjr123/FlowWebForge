import React, { useState } from "react";
import { Container, Heading,Input, Button, Flex, Text, Box,FormLabel,Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Import useHistory
import image from "../../image146.png";

const LoginPage = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useHistory

  const handleLogin = () => {
    // Handle login logic here
    console.log("Username:", typeof email);
    console.log("Password:", typeof password);

    const data = {
      email: email,
      password: password,
    };

    let some = fetch('https://infinity-experiment.onrender.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      console.log("enter")
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      navigate('/About');
      console.log(data)
      localStorage.setItem('token', data.message);
      window.location.reload();
    })
    .catch(error => {
      console.error('Error:', error);

      // Handle error response from the backend here
    });
  };
  const handleSignUp = () => {
    // Handle login logic here
    navigate('/Register');
  };

  return (
    <div className="flex  justify-center bg-gray-50 w-full h-screen" >
    <Box className="bg-white" maxW="2xl"  w="4xl" h="3xl" mx="2" mt={8}  borderWidth="1px" borderRadius="lg">
    <Container className=""  maxW="container.sm" textAlign="center" mt={10} >
    <Flex className=""  align="end" maxW="lg" justify="end" mb={20}>
        <Text>Not a user ? </Text>&nbsp;
        <Button className="hover:bg-transparent" textColor="#f15f40" colorScheme="blue" variant="link" onClick={handleSignUp}>
           Sign up
        </Button>
      </Flex>
      <Heading className=""  ml={12} maxW="lg" textAlign="start" as="h1" size="md" mb={2}>
        Welcome
      </Heading>
      <Text className=""  ml={12} maxW="lg" textAlign="start" as="p" size="xs" mb={8}>
        Login to continue
      </Text>
      <FormLabel className=""  ml={12} maxW="lg">Email</FormLabel>
      <Input
        maxW="lg"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        mb={9}
      />
      <FormLabel className=""  maxW="lg" ml={12} >Password</FormLabel>
      <Input
      className="" 
        maxW="lg"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        mb={4}
      />
      <Button className=""  bg="#f15f40" textColor="white" maxW="lg" onClick={handleLogin} w={500} mb={4} mt={10}>
        Login
      </Button>  
    </Container>
    </Box>
    </div>
  );
};

export default LoginPage;
