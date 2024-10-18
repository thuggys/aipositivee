import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Flex,
  Text,
  useDisclosure,
  IconButton,
  VStack,
  Button,
  useColorMode,
  useToast,
  Fade,
  Textarea,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useMediaQuery,
} from '@chakra-ui/react';
import { FaArrowLeft, FaCog, FaMagic, FaMoon, FaSun, FaLeaf, FaWind, FaTint, FaBars } from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';
import ChatMessage from './ChatMessage';
import { transformToPositive } from '../services/positiveTransform';
import { debounce } from 'lodash';
import SettingsModal from './SettingsModal';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

const ChatPage = ({ settings = { fontSize: '16px' }, updateSettings }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('Spiritual Healer Assistant');
  const messagesEndRef = useRef(null);
  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure();
  const { isOpen: isSidebarOpen, onOpen: onSidebarOpen, onClose: onSidebarClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const healingTopics = [
    { name: "Spiritual Cleansing", icon: <FaMoon />, explanation: "I'll guide you through spiritual cleansing techniques to purify your energy and remove negative influences." },
    { name: "Energy Balancing", icon: <FaSun />, explanation: "I'll help you understand and balance your body's energy centers for improved well-being." },
    { name: "Herbal Remedies", icon: <FaLeaf />, explanation: "I'll suggest natural herbal remedies to support your healing journey, based on ancient wisdom." },
    { name: "Chakra Alignment", icon: <FaWind />, explanation: "I'll assist you in aligning and harmonizing your chakras for optimal energy flow." },
    { name: "Crystal Healing", icon: <GiSparkles />, explanation: "I'll recommend crystals and explain their healing properties to support your specific needs." },
    { name: "Aura Cleansing", icon: <FaTint />, explanation: "I'll guide you through techniques to cleanse and strengthen your aura for protection and vitality." },
  ];

  const debouncedSetMessages = debounce((newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, 300);

  const getTopicSpecificResponse = async (topic, userMessage) => {
    // This function would ideally call a backend API that handles topic-specific AI responses
    // For now, we'll simulate it with some predefined responses
    const responses = {
      "Spiritual Cleansing": "To cleanse your spirit, try this meditation: Close your eyes, visualize a white light surrounding you, and imagine it washing away all negative energy.",
      "Energy Balancing": "Let's balance your energy. Focus on your breath, inhaling positive energy and exhaling any tension or negativity.",
      "Herbal Remedies": "Based on your concerns, I recommend trying chamomile tea for relaxation or peppermint for digestive issues. Always consult with a healthcare professional before starting any new herbal regimen.",
      "Chakra Alignment": "Let's start with your root chakra. Visualize a red spinning wheel at the base of your spine, grounding you to the earth.",
      "Crystal Healing": "For your situation, I suggest using amethyst for stress relief and clarity. Hold it in your hand during meditation or place it under your pillow at night.",
      "Aura Cleansing": "To cleanse your aura, try this: Stand in sunlight or moonlight, close your eyes, and imagine a shower of light washing over you, cleansing your energy field."
    };
    
    return responses[topic] || "I'm here to guide you on your healing journey. What specific area would you like to focus on?";
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    debouncedSetMessages({ role: "user", content: inputMessage });
    setInputMessage("");
    setLoading(true);
    
    try {
      const aiResponse = await getTopicSpecificResponse(mode, inputMessage);
      const transformedMessage = await transformToPositive(aiResponse);
      debouncedSetMessages({ role: "ai", content: transformedMessage });
    } catch (error) {
      console.error('Error processing message:', error);
      debouncedSetMessages({ role: "ai", content: "I apologize, but I'm having trouble connecting with the spiritual energies at the moment. Let's try again in a few moments." });
      toast({
        title: "Connection Issue",
        description: "There was a disturbance in the energy flow. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTopicClick = (topic) => {
    setMode(topic.name);
    setMessages([
      { role: "ai", content: `Welcome to ${topic.name}. ${topic.explanation}` },
      { role: "ai", content: "How may I assist you today on your healing journey?" }
    ]);
    toast({
      title: `${topic.name} Activated`,
      description: "The spiritual energies have shifted to focus on your new healing path.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    setMessages([
      { role: "ai", content: "Welcome to the Mystical Healing Chat. How may I assist you on your journey to wellness?" },
    ]);
  }, []);

  const SidebarContent = () => (
    <VStack p={4} align="stretch" spacing={4} h="full">
      <Flex align="center">
        <GiSparkles />
        <Text ml={2} fontSize="xl" fontWeight="semibold">Mystical Healing</Text>
      </Flex>
      {healingTopics.map((topic) => (
        <Button
          key={topic.name}
          leftIcon={topic.icon}
          variant="ghost"
          justifyContent="flex-start"
          onClick={() => {
            handleTopicClick(topic);
            if (isMobile) onSidebarClose();
          }}
          _hover={{ bg: colorMode === 'light' ? "purple.100" : "purple.900" }}
        >
          {topic.name}
        </Button>
      ))}
      <Box flex="1" />
      <Button
        leftIcon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
        onClick={toggleColorMode}
        variant="ghost"
        justifyContent="flex-start"
      >
        {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
      </Button>
    </VStack>
  );

  return (
    <Flex h="100vh" bg={colorMode === 'light' ? "gray.50" : "gray.900"}>
      {/* Sidebar for desktop */}
      {!isMobile && (
        <AnimatePresence>
          <MotionBox
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            w="64"
            bg={colorMode === 'light' ? "white" : "gray.800"}
            borderRight="1px"
            borderColor={colorMode === 'light' ? "gray.200" : "gray.700"}
            position="sticky"
            top="0"
            h="100vh"
            overflowY="auto"
          >
            <SidebarContent />
          </MotionBox>
        </AnimatePresence>
      )}

      {/* Drawer for mobile */}
      <Drawer isOpen={isSidebarOpen && isMobile} placement="left" onClose={onSidebarClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Mystical Healing</DrawerHeader>
          <DrawerBody>
            <SidebarContent />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main Chat Area */}
      <Flex flex={1} direction="column">
        <Flex align="center" justify="space-between" p={4} bg={colorMode === 'light' ? "white" : "gray.800"} borderBottom="1px" borderColor={colorMode === 'light' ? "gray.200" : "gray.700"}>
          {isMobile ? (
            <IconButton
              icon={<FaBars />}
              onClick={onSidebarOpen}
              variant="ghost"
              aria-label="Open sidebar"
            />
          ) : (
            <IconButton
              icon={<FaArrowLeft />}
              onClick={() => window.location.href = '/'}
              variant="ghost"
              aria-label="Back"
            />
          )}
          <Text fontSize="xl" fontWeight="bold">{mode}</Text>
          <IconButton
            icon={<FaCog />}
            onClick={onSettingsOpen}
            variant="ghost"
            aria-label="Settings"
          />
        </Flex>

        <VStack flex={1} overflowY="auto" p={4} spacing={4} align="stretch">
          {messages.map((msg, index) => (
            <Fade in={true} key={index}>
              <ChatMessage
                message={msg.content}
                isUser={msg.role === 'user'}
                timestamp={new Date().toISOString()}
                fontSize={settings.fontSize}
              />
            </Fade>
          ))}
          <div ref={messagesEndRef} />
        </VStack>

        <Flex p={4} bg={colorMode === 'light' ? "white" : "gray.800"} borderTop="1px" borderColor={colorMode === 'light' ? "gray.200" : "gray.700"}>
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask for mystical guidance..."
            mr={2}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            resize="none"
            rows={1}
            maxRows={4}
            overflow="hidden"
            minH="40px"
            flex={1}
          />
          <Button onClick={handleSendMessage} leftIcon={<FaMagic />} isLoading={loading} colorScheme="purple">
            Send
          </Button>
        </Flex>
      </Flex>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={onSettingsClose} 
        settings={settings}
        updateSettings={updateSettings}
      />
    </Flex>
  );
};

export default ChatPage;
