import { AppShell, Header, MantineProvider, Navbar, } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import Headbar from './components/Headbar';
import QuickAccess from './components/pages/QuickAccess';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [userFavorites, setUserFavorites] = useState<string[]>(['Quick Access', 'Desktop', 'Documents']);
  const [activePage, setActivePage] = useState<JSX.Element>(<QuickAccess userFavorites={userFavorites}/>);

  useEffect(() => {
    // Set the active page
    setActivePage(<QuickAccess userFavorites={userFavorites}/>);
  }, [userFavorites])

  return (
    <>
      <MantineProvider theme={{
        colorScheme: 'dark',
      }} withGlobalStyles withNormalizeCSS>
        <AppShell
          header={<Header height={100} p="lg"><Headbar /></Header>}
          navbar={<Navbar width={{ base: 300 }} ><Sidebar userFavorites={userFavorites}/></Navbar>}
        >
          {activePage}
        </AppShell>
      </MantineProvider>
    </>
  )
};

export default App;
