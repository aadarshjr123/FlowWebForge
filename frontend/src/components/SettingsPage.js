import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Button,
  Text,
  Heading,useToast
} from "@chakra-ui/react";
import axios from "axios";

const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://infinity-experiment.onrender.com/api/user/1"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};


const SettingsPage = () => {
  const [userData, setUserData] = useState();

  const [username, setUserNameData] = useState("");
  const [email, setEmailData] = useState("");
  const [password, setPasswordData] = useState("");
  const [saveEnabled, setSaveData] = useState(false);
  const [token, setToken] = useState(false);

  const toast = useToast()


  

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    const getData = async () => { 

      if (storedToken) {
        setToken(true);
        const result = await fetchData();
        setUserNameData(result.user.username)
        setEmailData(result.user.email)
        setSaveData(Boolean(result.user.saveEnabled))
      }
    }
    getData();

  }, []);

  const handleUsernameChange = (e) => {
    const username = e.target.value;
    setUserNameData(username)

  };
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmailData(saveEnabled)


  };
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPasswordData(password);
  };
  const handleSwitchChange = () => {
    setSaveData(prevSaveEnabled => !prevSaveEnabled);
  };




  const handleSave = async () => {
    // You can perform saving logic here, e.g., send data to backend
    
    let userData = [
      {
        userid:"1",
        username: username,
        email: email,
        password: password,
        saveEnabled: saveEnabled,
      }
    ]
    
    const saveResponse = await axios.post(
      "https://infinity-experiment.onrender.com/api/updateUser",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (saveResponse.data) {
      toast({
        title: 'Account Update.',
        description: "We've updated your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }
  };

  return (
    <div className="flex justify-center items-center ">
      {token ? (     <div className="flex justify-center items-center mt-10">
    <div className="flex flex-col border border-dashed border-orange-600 rounded" >
   <Heading fontSize='xl' className="flex ml-8 mt-10 justify-start">Account Settings</Heading>
   <Text fontSize='lg' className="flex ml-8 mt-2 justify-start">Update your details</Text>
    <Box p={4} className="flex flex-col mt-4 items-center justify-center">
      <FormControl className="flex flex-col items-start justify-start ml-10" id="username">
        <FormLabel>Change username</FormLabel>
        <Input
          w={400}
          className="ml-1"
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </FormControl>

      <FormControl className="flex flex-col items-start justify-start ml-10" id="email" mt={4}>
        <FormLabel>Change email</FormLabel>
        <Input
        w={400}
        className="ml-1"
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
      </FormControl>

      <FormControl className="flex flex-col items-start justify-start ml-10" id="password" mt={4}>
        <FormLabel>Change password</FormLabel>
        <Input
        w={400}
          className="ml-1"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </FormControl>

      <FormControl ml={50} display="flex" alignItems="center" mt={10}>
        <FormLabel  htmlFor="save-switch" mb="0">
        Do you want to save your Prompt ?
        </FormLabel>
        <Switch 
          id="save-switch"
          colorScheme="orange"
          isChecked={saveEnabled}
          onChange={handleSwitchChange}
          ml={2}
        />
      </FormControl>
      <Button
        bg="#f15f40" textColor="white"
        w={300}
        mt={16}
        onClick={handleSave}
      >
        Save
      </Button>
    </Box>
    </div>
    </div> ): (
        <Box className="border border-dashed border-orange-500 rounded flex justify-center items-center" h={200} w={500} mt={250}>
          <Text>You are not signed in. Please sign in.</Text>
        </Box>
      )}   
    </div>

    
  );
};

export default SettingsPage;
