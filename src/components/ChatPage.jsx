import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  Text,
  useDisclosure,
  IconButton,
  Icon,
  Drawer, // Import Drawer
  DrawerOverlay, // Import DrawerOverlay
  DrawerContent, // Import DrawerContent
  DrawerCloseButton, // Import DrawerCloseButton
  DrawerHeader, // Import DrawerHeader
  DrawerBody, // Import DrawerBody
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
} from '@chakra-ui/react';
import { FaArrowLeft, FaCog, FaMagic } from 'react-icons/fa';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { transformToPositive } from '../services/positiveTransform';
import { debounce } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import Sidebox from './sidebox';
import SettingsModal from './SettingsModal';
import TypingIndicator from './TypingIndicator';

import { keyframes } from '@emotion/react'; // Ensure this is the correct import
import { useColorMode, Button as ChakraButton } from '@chakra-ui/react';
// Remove the Firebase import
// import { firebaseApp } from '../firebase'; // Adjust based on actual named exports
// import { getFirestore } from "firebase/firestore";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

function ChatPage({ onBack, settings = { fontSize: '16px' }, updateSettings }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('Spiritual Healer Assistant'); // Default mode set to Spiritual Healer Assistant
  const messagesEndRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure(); // For Settings Modal
  const { isOpen: isSidebarOpen, onOpen: onOpenSidebar, onClose: onCloseSidebar } = useDisclosure(); // For Sidebar Drawer
  const { isOpen: isWandModalOpen, onOpen: onOpenWandModal, onClose: onCloseWandModal } = useDisclosure(); // For Wand Modal
  const { colorMode, toggleColorMode } = useColorMode();

  const debouncedSetMessages = debounce((newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, 300);

  const handleSendMessage = async (message) => {
    debouncedSetMessages({ id: uuidv4(), text: message, isUser: true, timestamp: new Date().toISOString() });
    setLoading(true);
    
    try {
      const transformedMessage = await transformToPositive(message);
      debouncedSetMessages({ id: uuidv4(), text: transformedMessage, isUser: false, timestamp: new Date().toISOString() });
    } catch (error) {
      console.error('Error transforming message:', error);
      debouncedSetMessages({ id: uuidv4(), text: "I'm here to help you find peace and clarity. Let's work through this together.", isUser: false, timestamp: new Date().toISOString() });
    } finally {
      setLoading(false);
    }
  };

  const handleFortuneTelling = async () => {
    setMode('Fortune Telling');
    const mysticalPrompt = `
      You are a wise and mystical oracle. Provide a fortune that is insightful, poetic, and filled with mystery. 
      Use elements of nature, time, and destiny to weave a tale that captivates and inspires.
    `;

    debouncedSetMessages({ id: uuidv4(), text: "Consulting the oracle...", isUser: false, timestamp: new Date().toISOString() });
    setLoading(true);

    try {
      const fortune = await transformToPositive(mysticalPrompt);
      debouncedSetMessages({ id: uuidv4(), text: fortune, isUser: false, timestamp: new Date().toISOString() });
    } catch (error) {
      console.error('Error generating fortune:', error);
      debouncedSetMessages({ id: uuidv4(), text: "The oracle is silent. Please try again later.", isUser: false, timestamp: new Date().toISOString() });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Box
      position="relative"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      bgGradient={colorMode === 'light' ? 'linear(to-br, gray.100, gray.200)' : 'linear(to-br, gray.800, gray.900)'}
      animation={`${fadeIn} 0.5s ease-out`}
    >
      <ChakraButton onClick={toggleColorMode} position="absolute" top={4} right={4}>
        Switch to {colorMode === 'light' ? 'Dark' : 'Light'} Mode
      </ChakraButton>
      <Flex flex="1" overflow="hidden">
        {/* Persistent Sidebar on Desktop */}
        <Box display={{ base: 'none', md: 'block' }}>
          <Sidebox
            onViewHistory={() => console.log('View history clicked')}
            onShowInfo={() => console.log('Show info clicked')}
            onOpenSettings={onOpen}
          />
        </Box>

        {/* Drawer for Mobile Sidebar */}
        <Drawer isOpen={isSidebarOpen} placement="left" onClose={onCloseSidebar}>
          <DrawerOverlay />
          <DrawerContent bg="rgba(26, 32, 44, 0.8)" maxW="80%" borderRight="1px solid" borderColor="gray.700">
            <DrawerCloseButton color="white" />
            <DrawerHeader color="white">Menu</DrawerHeader>
            <DrawerBody p={0}>
              <Sidebox
                onViewHistory={() => console.log('View history clicked')}
                onShowInfo={() => console.log('Show info clicked')}
                onOpenSettings={onOpen}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* Chat Area */}
        <Box flex="1" display="flex" flexDirection="column" bg="rgba(26, 32, 44, 0.4)" backdropFilter="blur(5px)">
          <Flex align="center" justify="space-between" p={4} bg="rgba(45, 55, 72, 0.8)" borderBottom="1px solid" borderColor="gray.700">
            <IconButton
              icon={<FaArrowLeft />}
              onClick={() => window.location.href = '/'}
              colorScheme="purple"
              variant="ghost"
              aria-label="Back"
            />
            <Text color="purple.300" fontSize="2xl" fontWeight="bold" textShadow="0 0 10px rgba(128, 0, 255, 0.7)">
              {mode}
            </Text>
            <IconButton
              icon={<FaCog />}
              onClick={onOpen}
              colorScheme="purple"
              variant="ghost"
              aria-label="Settings"
            />
          </Flex>
          <Box flex="1" overflowY="auto" px={8} py={6} className="custom-scrollbar">
            {messages.length === 0 && (
              <Text color="white" textAlign="center" mt={8}>
                Start a conversation by sending a message!
              </Text>
            )}
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg.text}
                isUser={msg.isUser}
                timestamp={msg.timestamp}
                fontSize={settings.fontSize}
              />
            ))}
            {loading && (
              <Flex justify="center" my={4}>
                <TypingIndicator /> {/* Show TypingIndicator when loading */}
              </Flex>
            )}
            <div ref={messagesEndRef} />
          </Box>
          <Box p={6} bg="rgba(45, 55, 72, 0.6)">
            <ChatInput
              onSendMessage={handleSendMessage}
              borderRadius="full"
              fontSize={settings.fontSize}
            />
            <IconButton
              mt={4}
              icon={<FaMagic />}
              onClick={onOpenWandModal}
              colorScheme="teal"
              variant="solid"
              aria-label="Magic Options"
            >
              Magic Options
            </IconButton>
          </Box>
        </Box>
      </Flex>
      <SettingsModal 
        isOpen={isOpen} 
        onClose={onClose} 
        settings={settings}
        updateSettings={updateSettings}
      />
      <Modal isOpen={isWandModalOpen} onClose={onCloseWandModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Magic Options</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Button onClick={handleFortuneTelling} colorScheme="purple" size="lg" fontSize="lg" fontWeight="bold">Fortune Telling</Button>
              <Button onClick={() => setMode('Tarot Card Reading')} colorScheme="purple" size="lg" fontSize="lg" fontWeight="bold">Tarot Card Reading</Button>
              {/* Add more options as needed */}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onCloseWandModal}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ChatPage;