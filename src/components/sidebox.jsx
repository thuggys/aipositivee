import React, { useState } from 'react';
import { Box, VStack, Text, useColorModeValue } from '@chakra-ui/react';

const Sidebox = () => {
  const [chatHistory, setChatHistory] = useState([
    // Mock chat history data
    { id: '1', title: 'Account Assistance', lastMessage: 'Sure, let me check that for you.', timestamp: '2023-10-01 10:10 AM' },
    { id: '2', title: 'Product Inquiry', lastMessage: 'Can you tell me more about this product?', timestamp: '2023-10-02 11:00 AM' },
    { id: '3', title: 'Technical Support', lastMessage: 'Please restart your device.', timestamp: '2023-10-03 09:30 AM' },
  ]);

  const bgColor = useColorModeValue('rgba(26, 32, 44, 0.8)', 'rgba(26, 32, 44, 0.8)');

  return (
    <Box
      width="100%"
      height="100%"
      bg={bgColor}
      borderRight={{ base: 'none', md: '1px solid' }}
      borderColor="gray.700"
      p={4}
      display="flex"
      flexDirection="column"
    >
      <Box mt={4} color="gray.400" fontSize="md">
        <Text>Chat History:</Text>
        {chatHistory.map((chat) => (
          <Box
            key={chat.id}
            p={3}
            bg="rgba(45, 55, 72, 0.6)"
            borderRadius="md"
            mb={2}
            _hover={{ bg: 'rgba(45, 55, 72, 0.8)', cursor: 'pointer' }}
            onClick={() => console.log(`Open chat session: ${chat.title}`)}
          >
            <Text fontSize="lg" color="white" fontWeight="bold">{chat.title}</Text>
            <Text fontSize="sm" color="gray.300">{chat.lastMessage}</Text>
            <Text fontSize="xs" color="gray.500">{chat.timestamp}</Text>
          </Box>
        ))}
      </Box>
      <Text color="gray.400" fontSize="md" mt={8} textAlign="center">
        AI Chat History v1.0
      </Text>
    </Box>
  );
};

export default Sidebox;