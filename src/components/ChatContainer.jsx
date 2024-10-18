import React, { useState, useEffect } from 'react';
import { VStack, Box, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const navigate = useNavigate();

  const handleSendMessage = async (message) => {
    // Add user message to chat
    setMessages(prevMessages => [...prevMessages, { text: message, isUser: true, timestamp: new Date() }]);
    
    // Set AI typing to true
    setIsAiTyping(true);
    
    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { text: "This is a simulated AI response.", isUser: false, timestamp: new Date() }]);
      setIsAiTyping(false);
    }, 2000);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <VStack spacing={4} align="stretch" h="100vh">
      <Box p={4}>
        <Button onClick={handleGoBack}>Back to Home</Button>
      </Box>
      <Box flex={1} overflowY="auto" p={4}>
        {messages.map((msg, index) => (
          <ChatMessage key={index} {...msg} />
        ))}
        {isAiTyping && <ChatMessage isTyping={true} isUser={false} />}
      </Box>
      <Box p={4}>
        <ChatInput onSendMessage={handleSendMessage} isAiTyping={isAiTyping} />
      </Box>
    </VStack>
  );
};

export default ChatContainer;