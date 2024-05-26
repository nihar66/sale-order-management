// src/pages/Dashboard.js
import React from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, useColorMode } from '@chakra-ui/react';
import ActiveOrders from './ActiveOrders';
import CompletedOrders from './CompletedOrders';
import { Button } from '@chakra-ui/react';

const Dashboard = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box p={8}>
      <Button onClick={toggleColorMode} mb={4}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
      </Button>
      <Tabs isFitted>
        <TabList>
          <Tab>Active Sale Orders</Tab>
          <Tab>Completed Sale Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ActiveOrders />
          </TabPanel>
          <TabPanel>
            <CompletedOrders />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Dashboard;
