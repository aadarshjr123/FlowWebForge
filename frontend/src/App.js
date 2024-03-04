import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import IntroPage from "./components/intro";
import HistoryPage from "./components/HistoryPage";
import {
  Tabs,
  TabList,
  Tab,
  TabIndicator,
  Box,
  Button,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Wrap,
  Image,
  WrapItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Flex,
} from "@chakra-ui/react";
import SettingsPage from "./components/SettingsPage";
import RegisterPage from "./components/Auth/RegisterPage";
import LoginPage from "./components/Auth/LoginPage";
import axios from "axios";
import logo from "./logo.png";

const App = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = async () => {
    // Make a POST request to the logout API endpoint
    axios
      .post(
        "https://infinity-experiment.onrender.com/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace yourAuthToken with your actual authentication token
          },
        }
      )
      .then((response) => {
        // Handle successful logout
        console.log(response.data.message);
        localStorage.removeItem("token");
        setToken("");
        window.location.href = "/About";
        // You can redirect the user or perform any other action after logout
      })
      .catch((error) => {
        // Handle errors
        console.error("Error logging out:", error);
      });
  };

  return (
    <Router>
      <Tabs
        className="mt-10 flex justify-center items-center"
        variant="unstyled"
        w={1700}
      >
        <TabList ml={44} className="">
        
          <Box align="center">
            <Image className="" src={logo} alt="Logo" />
          </Box>
          
          <Tab ml={80} className="hover:bg-transparent" style={{ color: "black" }}>
            <Link to="/About">About</Link>
          </Tab>
          <Tab className="hover:bg-transparent" style={{ color: "black" }}>
            <Link to="/Upload">Upload</Link>
          </Tab>
          <Tab className="hover:bg-transparent" style={{ color: "black" }}>
            <Link to="/History">History</Link>
          </Tab>
          <Tab className="hover:bg-transparent" style={{ color: "black" }}>
            <Link to="/Settings">Settings</Link>
          </Tab>
          {token ? (
            <Popover left={650} className="border border-dashed border-black">
              <PopoverTrigger>
                <Wrap>
                  <WrapItem>
                    <Avatar
                      left={650}
                      name="Dan Abrahmov"
                      src="https://bit.ly/dan-abramov"
                    />
                  </WrapItem>
                </Wrap>
              </PopoverTrigger>
              <PopoverContent left={550}>
                <PopoverArrow />
                <PopoverCloseButton />
                <Button onClick={() => (window.location.href = "/Settings")}>
                  {" "}
                  Account settings
                </Button>
                <Button onClick={handleLogout}> Logout</Button>
              </PopoverContent>
            </Popover>
          ) : (
            <Button
              onClick={() => (window.location.href = "/Login")}
              left={650}
            >
              Login
            </Button>
          )}
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="orange.500"
          borderRadius="1px"
        />
      </Tabs>
      <Routes>
        <Route path="/About" element={<IntroPage />} />
        <Route path="/Upload" element={<HomePage />} />
        <Route path="/History" element={<HistoryPage />} />
        <Route path="/Settings" element={<SettingsPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;
