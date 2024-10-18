import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text } from '@chakra-ui/react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the login logic
    // For now, we'll just call onLogin
    onLogin(email, password);
  };

  return (
    <Box maxWidth="400px" margin="auto" mt={8}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Heading as="h2" size="xl" textAlign="center">Login</Heading>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="purple">
            Login
          </Button>
          <Text textAlign="center">
            Don't have an account? Sign up here.
          </Text>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;