import React from 'react';
import { Text } from '@mantine/core';

interface HomeProps {
  userFavorites: string[];
}

const QuickAccess: React.FC<HomeProps> = () => {
  return (
    <>
      <Text size='xl'>Quick Access</Text>
    </>
  );
}

export default QuickAccess;
