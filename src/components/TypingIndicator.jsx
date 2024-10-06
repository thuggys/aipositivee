import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { keyframes } from '@emotion/react'; // Import keyframes from @emotion/react

const typingAnimation = keyframes`
  0% { opacity: 0.2; }
  20% { opacity: 1; }
  100% { opacity: 0.2; }
`;

const TypingIndicator = () => {
  return (
    <Box display="flex" alignItems="center">
      {[...Array(3)].map((_, i) => (
        <Box
          key={i}
          as="span"
          width="8px"
          height="8px"
          borderRadius="full"
          bg="gray.500"
          mx="2px"
          animation={`${typingAnimation} 1s infinite`}
          style={{ animationDelay: `${i * 0.2}s` }} // Apply animation delay here
        />
      ))}
    </Box>
  );
};

export default TypingIndicator;