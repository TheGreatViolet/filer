import { Button, Card, Divider } from '@mantine/core';
import React, { useState } from 'react'

interface SidebarProps {
  userFavorites: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ userFavorites }) => {
  const [sideBarFavorites, setUserFavorites] = useState<string[]>(userFavorites);

  return (
    <>
      <Card sx={{height: '100%'}} p='lg'>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          {sideBarFavorites.map((favorite: string, index: number) => {
            return (
              <>
                <Button variant='light' color='dark' >{favorite}</Button>
                {index !== userFavorites.length - 1 ? <Divider /> : null}
              </>
            )
          })}
        </div>
      </Card>
    </>
  );
}

export default Sidebar;
