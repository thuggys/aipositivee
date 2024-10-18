import React from 'react';
import { Box, Text, Flex, Avatar, useColorModeValue, Tooltip } from '@chakra-ui/react';
import { format } from 'date-fns';

const ChatMessage = ({ message, isUser, timestamp }) => {
  const bgColor = useColorModeValue(
    isUser ? 'purple.600' : 'indigo.700',
    isUser ? 'purple.500' : 'indigo.600'
  );
  const textColor = 'white';
  const formattedTime = format(new Date(timestamp), 'HH:mm');

  return (
    <Flex 
      justify={isUser ? 'flex-end' : 'flex-start'} 
      mb={4}
      mx={{ base: 2, md: 4 }}
    >
      <Flex 
        maxWidth={{ base: "85%", md: "75%" }} 
        alignItems="flex-end"
        flexDirection={isUser ? 'row-reverse' : 'row'}
      >
        <Tooltip label={isUser ? 'You' : 'AI Assistant'} placement={isUser ? 'left' : 'right'}>
          <Avatar
            size="sm"
            name={isUser ? 'User' : 'AI Assistant'}
            src={isUser ? '/user-avatar.png' : '/ai-avatar.png'}
            mr={isUser ? 0 : 2}
            ml={isUser ? 2 : 0}
          />
        </Tooltip>
        <Box
          bg={bgColor}
          color={textColor}
          px={4}
          py={3}
          borderRadius="lg"
          boxShadow="md"
          ml={isUser ? 0 : 2}
          mr={isUser ? 2 : 0}
        >
          <Text fontSize="md" whiteSpace="pre-wrap" wordBreak="break-word">
            {message}
          </Text>
          <Text fontSize="xs" mt={1} textAlign="right" opacity={0.7}>
            {formattedTime}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ChatMessage;
