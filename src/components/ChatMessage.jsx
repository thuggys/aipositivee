import React from 'react';
import { Box, Text, Flex, Avatar, Tooltip } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { format } from 'date-fns';
import TypingIndicator from './TypingIndicator';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ChatMessage = ({ message, isUser, timestamp, fontSize, isTyping }) => {
  const formattedTime = format(new Date(timestamp), 'HH:mm');

  return (
    <Flex 
      justify={isUser ? 'flex-end' : 'flex-start'} 
      mb={6} 
      alignItems="flex-end" 
      wrap="wrap"
    >
      {!isUser && (
        <Avatar
          size="md"
          name="AI Assistant"
          src="/ai-avatar.png"
          mr={3}
          bg="purple.500"
        />
      )}
      <MotionBox
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        bg={isUser ? 'blue.500' : 'gray.700'}
        color="white"
        borderRadius="2xl"
        px={5}
        py={3}
        boxShadow="md"
        _hover={{ transform: 'scale(1.02)' }}
      >
        {isTyping ? (
          <TypingIndicator />
        ) : (
          <>
            <Text fontSize={fontSize} mb={2} wordBreak="break-word">
              {message}
            </Text>
            <Tooltip label={format(new Date(timestamp), 'MMMM d, yyyy HH:mm:ss')}>
              <Text fontSize="xs" opacity={0.8} textAlign={isUser ? 'right' : 'left'}>
                {formattedTime}
              </Text>
            </Tooltip>
          </>
        )}
      </MotionBox>
      {isUser && (
        <Avatar
          size="md"
          name="User"
          src="/user-avatar.png"
          ml={3}
          bg="blue.500"
        />
      )}
    </Flex>
  );
};

export default ChatMessage;