import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ChatContainer from './components/ChatContainer';

const App = () => {
  return (
    <ChakraProvider>
      <Flex>
        <Box width="300px">
          <Sidebox onViewHistory={() => {}} onOpenSettings={() => {}} />
        </Box>
        <Box flex={1}>
          <ChatContainer />
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default App;