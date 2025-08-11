import {
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@headlessui/react'

export default function WhatSection() {
    return(
        <div>
        <TabGroup>
            <TabList>
                <Tab>Lamp</Tab>
                <Tab>Atlas</Tab>
                <Tab>Carpet</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>Lamp の内容</TabPanel>
                <TabPanel>Atlas の内容</TabPanel>
                <TabPanel>Carpet の内容</TabPanel>
            </TabPanels>
        </TabGroup>
            <TabGroup>
            <TabList>
                <Tab>Lamp</Tab>
                <Tab>Atlas</Tab>
                <Tab>Carpet</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>Lamp の内容</TabPanel>
                <TabPanel>Atlas の内容</TabPanel>
                <TabPanel>Carpet の内容</TabPanel>
            </TabPanels>
        </TabGroup>
        </div>
    );
}