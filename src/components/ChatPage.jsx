import React, { useState, useRef, useEffect } from 'react';
import { Box, VStack, Button, Flex, useColorModeValue, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Text, Avatar, Tooltip, IconButton, Heading, Divider, useMediaQuery } from '@chakra-ui/react';
import { FaMagic, FaClock, FaTrash, FaBars, FaStar, FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import ChatMessage from './ChatMessage';
import { transformToPositive } from '../services/positiveTransform';
import ChatInput from './ChatInput';
import LoginModal from './LoginModal';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, isUser: false, message: "Welcome to the AI Positive Chat. How may I assist you on your journey to wellness?", timestamp: new Date() },
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: "First Positive Session", timestamp: new Date().toISOString() },
  ]);

  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const bgColor = useColorModeValue('purple.900', 'indigo.900');
  const sidebarBgColor = useColorModeValue('blackAlpha.200', 'blackAlpha.400');
  const inputBgColor = useColorModeValue('purple.700', 'purple.600');
  const colorMode = useColorModeValue('light', 'dark');
  const toggleColorMode = () => {
    // Implement color mode toggle functionality
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (message) => {
    const userMessage = { id: messages.length + 1, message, isUser: true, timestamp: new Date() };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    setIsAiTyping(true);
    try {
      const aiResponse = await transformToPositive(message);
      setTimeout(() => {
        const aiMessage = { id: messages.length + 2, message: aiResponse, isUser: false, timestamp: new Date() };
        setMessages(prevMessages => [...prevMessages, aiMessage]);
        setIsAiTyping(false);
      }, 1000 + Math.random() * 1000);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setIsAiTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([{ id: 1, isUser: false, message: "Welcome to a new positive session. How may I assist you today?", timestamp: new Date() }]);
  };

  const startNewChat = () => {
    const newChatId = chatHistory.length + 1;
    setChatHistory(prevHistory => [
      { id: newChatId, title: `Positive Session ${newChatId}`, timestamp: new Date().toISOString() },
      ...prevHistory,
    ]);
    clearChat();
    if (isMobile) onClose();
  };

  const Sidebar = () => (
    <VStack p={6} spacing={6} align="stretch" h="100%">
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <FaStar size="24px" />
          <Heading ml={3} size="md">AI Positive Chat</Heading>
        </Flex>
        <IconButton
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
          variant="ghost"
          aria-label="Toggle color mode"
        />
      </Flex>
      <Button leftIcon={<FaMagic />} onClick={startNewChat} colorScheme="purple" size="lg">
        New Chat
      </Button>
      <Divider />
      <VStack spacing={4} align="stretch" overflowY="auto" flex={1}>
        <Heading size="sm">Chat History</Heading>
        {chatHistory.map((chat) => (
          <Button
            key={chat.id}
            variant="ghost"
            justifyContent="flex-start"
            w="full"
            _hover={{ bg: 'purple.800', bgOpacity: 0.5 }}
          >
            <FaClock className="w-4 h-4 mr-2" />
            <Box textAlign="left">
              <Text isTruncated>{chat.title}</Text>
              <Text fontSize="xs" color="purple.300">
                {new Date(chat.timestamp).toLocaleString()}
              </Text>
            </Box>
          </Button>
        ))}
      </VStack>
      <Divider />
      {user ? (
        <Button
          leftIcon={<FaSignOutAlt />}
          onClick={handleSignOut}
          colorScheme="purple"
          variant="outline"
        >
          Sign Out
        </Button>
      ) : (
        <Button
          className="button-85"
          role="button"
          onClick={onLoginOpen}
          w="full"
          h="auto"
          p="0.6em 2em"
          borderRadius="10px"
          fontWeight="normal"
          textTransform="uppercase"
          letterSpacing="0.05em"
          _hover={{}}
          _active={{}}
          _focus={{}}
        >
          Login
        </Button>
      )}
    </VStack>
  );

  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();

  return (
    <Flex h="100vh" bg={`linear-gradient(to bottom right, ${bgColor}, ${useColorModeValue('indigo.900', 'purple.900')})`} color="white">
      {/* Sidebar for desktop */}
      {!isMobile && (
        <Box w="300px" bg={sidebarBgColor} backdropFilter="blur(10px)" borderRight="1px" borderColor="purple.700">
          <Sidebar />
        </Box>
      )}

      {/* Main Chat Area */}
      <Flex flex={1} flexDir="column">
        {/* Header for mobile */}
        {isMobile && (
          <Flex p={4} bg={sidebarBgColor} backdropFilter="blur(10px)" borderBottom="1px" borderColor="purple.700" align="center" justify="space-between">
            <IconButton
              icon={<FaBars />}
              onClick={onOpen}
              variant="ghost"
              aria-label="Open menu"
            />
            <Heading size="md">AI Positive Chat</Heading>
            <IconButton
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
              onClick={toggleColorMode}
              variant="ghost"
              aria-label="Toggle color mode"
            />
          </Flex>
        )}
        
        {/* Chat messages */}
        <VStack flex={1} overflowY="auto" spacing={4} p={6} alignItems="stretch">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} {...msg} />
          ))}
          <div ref={messagesEndRef} />
        </VStack>

        {/* Input Area */}
        <Box p={4} bg={sidebarBgColor} backdropFilter="blur(10px)" borderTop="1px" borderColor="purple.700">
          <ChatInput onSendMessage={handleSendMessage} isAiTyping={isAiTyping} />
        </Box>
      </Flex>

      {/* Menu Drawer (for mobile) */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
        <DrawerOverlay>
          <DrawerContent bg={bgColor}>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <Sidebar />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

      {!user && <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />}
      
      <style jsx global>{`
        .button-85 {
          color: rgb(255, 255, 255);
          background: #111;
          cursor: pointer;
          position: relative;
          z-index: 0;
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
        }

        .button-85:before {
          content: "";
          background: linear-gradient(
            45deg,
            #ff0000,
            #ff7300,
            #fffb00,
            #48ff00,
            #00ffd5,
            #002bff,
            #7a00ff,
            #ff00c8,
            #ff0000
          );
          position: absolute;
          top: -2px;
          left: -2px;
          background-size: 400%;
          z-index: -1;
          filter: blur(5px);
          -webkit-filter: blur(5px);
          width: calc(100% + 4px);
          height: calc(100% + 4px);
          animation: glowing-button-85 20s linear infinite;
          transition: opacity 0.3s ease-in-out;
          border-radius: 10px;
        }

        @keyframes glowing-button-85 {
          0% {
            background-position: 0 0;
          }
          50% {
            background-position: 400% 0;
          }
          100% {
            background-position: 0 0;
          }
        }

        .button-85:after {
          z-index: -1;
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: #222;
          left: 0;
          top: 0;
          border-radius: 10px;
        }
      `}</style>
    </Flex>
  );
};

export default ChatPage;
