import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';

function HomePage({ onStartChat }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgGradient="linear(to-br, teal.100, blue.200)"
    >
      <Text fontSize="4xl" fontWeight="bold" mb={4}>
        Welcome to the Spiritual Healer Assistant
      </Text>
      <Text fontSize="lg" mb={8}>
        Your journey to peace and clarity begins here.
      </Text>
      <Button colorScheme="teal" size="lg" onClick={onStartChat}>
        Start Chat
      </Button>
    </Box>
  );
}

export default HomePage;