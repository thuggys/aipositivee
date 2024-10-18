import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, IconButton, Box, Text, Flex, Tooltip } from '@chakra-ui/react';
import { FaPaperPlane, FaTrash } from 'react-icons/fa';

const ChatInput = ({ onSendMessage, isAiTyping, ...props }) => {
  const [message, setMessage] = useState('');
  const maxLength = 500;

  const handleSend = () => {
    if (message.trim() && !isAiTyping) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box position="relative" {...props}>
      {isAiTyping && (
        <Flex align="center" mb={2} ml={4}>
          <Text fontSize="sm" color="purple.300" mr={2}>AI is typing</Text>
          <Box className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </Box>
        </Flex>
      )}
      <Flex>
        <InputGroup size="lg">
          <Input
            pr="4.5rem"
            type="text"
            placeholder="Ask for positive guidance..."
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, maxLength))}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            bg="purple.700"
            color="white"
            borderColor="purple.600"
            _hover={{ borderColor: 'purple.500' }}
            _focus={{ borderColor: 'purple.400', boxShadow: '0 0 0 1px #9F7AEA' }}
            _placeholder={{ color: 'purple.300' }}
          />
          <InputRightElement width="4.5rem">
            <Tooltip label="Send message">
              <IconButton
                h="1.75rem"
                size="sm"
                icon={<FaPaperPlane />}
                onClick={handleSend}
                colorScheme="purple"
                variant="ghost"
                _hover={{ bg: 'purple.600' }}
                aria-label="Send message"
                isDisabled={isAiTyping || message.trim().length === 0}
              />
            </Tooltip>
          </InputRightElement>
        </InputGroup>
        <Tooltip label="Clear chat">
          <IconButton
            ml={2}
            icon={<FaTrash />}
            onClick={() => onSendMessage('/clear')}
            colorScheme="purple"
            variant="outline"
            aria-label="Clear chat"
          />
        </Tooltip>
      </Flex>
      <Text 
        position="absolute" 
        right="70px" 
        bottom="-20px" 
        fontSize="xs" 
        color={message.length >= maxLength ? "red.300" : "purple.300"}
      >
        {message.length}/{maxLength}
      </Text>
    </Box>
  );
};

export default ChatInput;
