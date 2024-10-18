import React from 'react';
import { Box, Text, Flex, Avatar, Tooltip, useColorModeValue } from '@chakra-ui/react';
import { format } from 'date-fns';

const ChatMessage = ({ message, isUser, timestamp, fontSize }) => {
  const bgColor = useColorModeValue(
    isUser ? 'blue.100' : 'gray.100',
    isUser ? 'blue.700' : 'gray.700'
  );
  const textColor = useColorModeValue(
    isUser ? 'blue.800' : 'gray.800',
    isUser ? 'blue.100' : 'gray.100'
  );
  const avatarBg = useColorModeValue(
    isUser ? 'blue.500' : 'gray.500',
    isUser ? 'blue.200' : 'gray.200'
  );

  return (
    <Flex justify={isUser ? 'flex-end' : 'flex-start'} mb={4}>
      {!isUser && (
        <Avatar
          size="sm"
          name="AI Assistant"
          src="/ai-avatar.png"
          mr={2}
          bg={avatarBg}
        />
      )}
      <Box maxWidth="70%">
        <Tooltip label={format(new Date(timestamp), 'PPpp')} placement={isUser ? 'left' : 'right'}>
          <Box
            bg={bgColor}
            color={textColor}
            px={4}
            py={2}
            borderRadius="lg"
            boxShadow="md"
          >
            <Text fontSize={fontSize} whiteSpace="pre-wrap" wordBreak="break-word">
              {message}
            </Text>
          </Box>
        </Tooltip>
        <Text fontSize="xs" color="gray.500" mt={1} textAlign={isUser ? 'right' : 'left'}>
          {format(new Date(timestamp), 'p')}
        </Text>
      </Box>
      {isUser && (
        <Avatar
          size="sm"
          name="User"
          src="/user-avatar.png"
          ml={2}
          bg={avatarBg}
        />
      )}
    </Flex>
  );
};

export default ChatMessage;
