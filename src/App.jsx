import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainComponent from './components/MainComponent';
import ChatContainer from './components/ChatContainer';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route path="/chat" element={<ChatContainer />} />
          {/* Add other routes as needed */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;