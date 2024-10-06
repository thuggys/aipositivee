import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, IconButton, Box, Text } from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa';

const ChatInput = ({ onSendMessage, fontSize, isAiTyping, ...props }) => {
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
      <InputGroup size="lg">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, maxLength))}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          bg="rgba(74, 85, 104, 0.8)"
          color="white"
          borderColor="gray.600"
          _hover={{ borderColor: 'gray.500' }}
          _focus={{ borderColor: 'blue.300', boxShadow: '0 0 0 1px #63B3ED' }}
          _placeholder={{ color: 'gray.400' }}
          fontSize={fontSize}
          h={{ base: '60px', md: '50px' }}
        />
        <InputRightElement width="4.5rem">
          <IconButton
            h="2.5rem"
            size={{ base: 'lg', md: 'md' }}
            icon={<FaPaperPlane />}
            onClick={handleSend}
            colorScheme="blue"
            variant="ghost"
            _hover={{ bg: 'blue.500' }}
            aria-label="Send message"
            isDisabled={isAiTyping || message.trim().length === 0}
          />
        </InputRightElement>
      </InputGroup>
      <Text 
        position="absolute" 
        right="70px" 
        bottom="-20px" 
        fontSize="xs" 
        color={message.length >= maxLength ? "red.300" : "gray.400"}
      >
        {message.length}/{maxLength}
      </Text>
    </Box>
  );
};

export default ChatInput;