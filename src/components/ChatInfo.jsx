import React from 'react';
import { Box, VStack, Text, Heading, Divider, Badge } from '@chakra-ui/react';

const ChatInfo = ({ chatData }) => {
  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Heading size="md">Chat Information</Heading>
        <Divider />
        <Box>
          <Text fontWeight="bold">Chat ID:</Text>
          <Text>{chatData.id}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Started:</Text>
          <Text>{new Date(chatData.startTime).toLocaleString()}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Duration:</Text>
          <Text>{chatData.duration} minutes</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Messages:</Text>
          <Text>{chatData.messageCount}</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Topics:</Text>
          <Box mt={2}>
            {chatData.topics.map((topic, index) => (
              <Badge key={index} mr={2} mb={2} colorScheme="blue">
                {topic}
              </Badge>
            ))}
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default ChatInfo;