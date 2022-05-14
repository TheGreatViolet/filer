import { Button, Card, Divider } from '@mantine/core';
import React, { useEffect, useState } from 'react'

const Sidebar: React.FC = () => {
  const [userFavorites, setUserFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Placeholder array for userFavorites
    setUserFavorites(['Home', 'Desktop', 'Documents']);
  }, [])

  return (
    <>
      <Card sx={{height: '100%'}} p='lg'>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          {userFavorites.map((favorite: string, index: number) => {
            return (
              <>
                <Button variant='light' color='dark'>{favorite}</Button>
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
