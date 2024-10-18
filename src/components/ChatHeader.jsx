import React from 'react';
import { Box, Flex, IconButton, Text, VStack, useMediaQuery } from '@chakra-ui/react';
import { FaArrowLeft, FaCog, FaBars } from 'react-icons/fa';

const ChatHeader = ({ onBack, onSettings, onOpenSidebar, title, subtitle, ...props }) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <Flex align="center" justify="space-between" {...props}>
      {isMobile && (
        <IconButton
          icon={<FaBars />}
          onClick={onOpenSidebar}
          variant="ghost"
          color="white"
          aria-label="Open sidebar"
          mr={2}
          size="lg" // Increased size for better touch area
        />
      )}
      <IconButton
        icon={<FaArrowLeft />}
        onClick={onBack}
        variant="ghost"
        color="white"
        aria-label="Go back"
        size="lg"
      />
      <VStack spacing={0} align="center">
        <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold"> {/* Responsive font size */}
          {title}
        </Text>
        <Text fontSize={{ base: 'sm', md: 'sm' }} opacity={0.8}>
          {subtitle}
        </Text>
      </VStack>
      <IconButton
        icon={<FaCog />}
        onClick={onSettings}
        variant="ghost"
        color="white"
        aria-label="Open settings"
        size="lg"
      />
    </Flex>
  );
};

export default ChatHeader;