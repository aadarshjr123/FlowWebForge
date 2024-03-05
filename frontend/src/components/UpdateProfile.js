import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Container,
  useToast,
} from "@chakra-ui/react";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});

  //   const getUserData = async () => {
  //     const userdata = await getUser();
  //     setName(userdata.name);
  //     setEmail(userdata.email);
  //     setUser(userdata);
  //     return userdata;
  //   };

  let navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      //   getUserData();
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // updateProfile(user._id, name, email, password);
    toast({
      title: "User updated Successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDelete = () => {
  };

  return (
    <Container maxW="lg" centerContent>
      <Heading as="h2" size="lg" mb="4">
        Update Profile
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel htmlFor="name">Name:</FormLabel>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel htmlFor="email">Email:</FormLabel>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel htmlFor="password">Password:</FormLabel>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" mr="4">
          Update Profile
        </Button>
        <Button colorScheme="red" onClick={handleDelete}>
          Delete Profile
        </Button>
      </form>
    </Container>
  );
};

export default UpdateProfile;
