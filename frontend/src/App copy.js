import React from "react";
import { BrowserRouter, Routes, Route,Switch } from "react-router-dom";
import LoginPage from "./components/Auth/LoginPage";
import RegisterPage from "./components/Auth/RegisterPage";
import HomePage from "./components/HomePage";
import HistoryPage from "./components/HistoryPage";

import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator,Link } from '@chakra-ui/react'

const Layout = () => {
  return (
    <>
      <Tabs  align="center" colorScheme="whiteAlpha" position="center" variant="unstyled">

<TabList >
  <Tab to="/" className="hover:bg-neutral-50">
  <Link to="/">Home</Link>
  </Tab>
  <Tab to="/history" className="hover:bg-neutral-50"><Link to="/history">History</Link></Tab>
  <Tab to="/" className="hover:bg-neutral-50">Settings</Tab>
</TabList>
<TabIndicator
    mt="-1.5px"
    height="2px"
    bg="blue.500"
    borderRadius="1px"
  />
  <TabPanels>
    <TabPanel>
    <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </TabPanel>
    <TabPanel>
    <Routes>
        <Route path="/History" element={<HistoryPage />} />
      </Routes>
    </TabPanel>
    <TabPanel>
    <Routes>
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </TabPanel>
  </TabPanels>
</Tabs>
    </>
  )
};

const App = () => {
  return (

    <div className="mt-10">
<BrowserRouter>
<Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
      
    </BrowserRouter>
    </div>
    
  );
};

export default App;
