import { AppShell, Header, MantineProvider, Navbar, } from '@mantine/core';
import React from 'react';
import Headbar from './components/Headbar';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  return (
    <>
      <MantineProvider theme={{
        colorScheme: 'dark',
      }} withGlobalStyles withNormalizeCSS>
        <AppShell
          header={<Header height={100} p="lg"><Headbar /></Header>}
          navbar={<Navbar width={{ base: 300 }} ><Sidebar /></Navbar>}
        >

        </AppShell>
      </MantineProvider>
    </>
  )
};

export default App;
