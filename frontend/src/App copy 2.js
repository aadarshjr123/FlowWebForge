import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabIndicator,
  Link,
} from "@chakra-ui/react";
import HomePage from "./components/HomePage";
import HistoryPage from "./components/HistoryPage";
import SettingsPage from "./components/SettingsPage";
import RegisterPage from "./components/Auth/RegisterPage";
import LoginPage from "./components/Auth/LoginPage";
import IntroPage from "./components/intro";





const Layout = () => {
  return (
    <>
      <Tabs
        align="center"
        position="center"
        variant="unstyled"
      >
        <TabList>
        <Tab className="hover:bg-transparent" style={{ color: "black",  }}>
            <div>
              <Link isExternal _hover={{ textDecoration: "none" }} to="/">Home</Link>
            </div>
          </Tab>
          <Tab className="hover:bg-transparent" style={{ color: "black",  }}>
            <div>
              <Link isExternal _hover={{ textDecoration: "none" }} to="/Upload">Upload</Link>
            </div>
          </Tab>
          <Tab className="hover:bg-transparent" style={{ color: "black" }}>
            <div>
              <Link isExternal _hover={{ textDecoration: "none" }}  to="History">History</Link>
            </div>
          </Tab>
          <Tab className="hover:bg-transparent" style={{ color: "black" }}>
            <div>
              <Link isExternal _hover={{ textDecoration: "none" }}  to="Settings">Settings</Link>
            </div>
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="orange.500"
          borderRadius="1px"
        />
        <TabPanels>
        <TabPanel>
            <IntroPage />
          </TabPanel>
          <TabPanel>
            <HomePage />
          </TabPanel>
          <TabPanel>
            <HistoryPage />
          </TabPanel>
          <TabPanel>
            <SettingsPage />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

const App = () => {
  return (
    <div className="mt-10">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
        </Routes>
        <Routes>
          <Route path="/signup" element={<RegisterPage />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
