import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    VStack,
    Text,
    Box,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

function LoginModal({ isOpen, onClose }) {
    const handleGoogleSignIn = () => {
        console.log('Google Sign-In clicked');
        // Implement Google sign-in logic here
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
            <ModalContent 
                borderRadius="xl" 
                bg="rgba(0, 0, 0, 0.7)" 
                color="white"
                p={6}
            >
                <ModalHeader textAlign="center" fontSize="2xl" fontWeight="bold">
                    Welcome to MyApp
                </ModalHeader>
                <ModalCloseButton color="white" />
                <ModalBody>
                    <VStack spacing={6} align="stretch">
                        <Box textAlign="center">
                            <Text fontSize="lg" color="gray.300">
                                Sign in to continue
                            </Text>
                        </Box>
                        
                        <Button
                            leftIcon={<FcGoogle />}
                            onClick={handleGoogleSignIn}
                            size="lg"
                            width="100%"
                            bg="white"
                            color="black"
                            _hover={{ bg: 'gray.200' }}
                            fontWeight="medium"
                        >
                            Continue with Google
                        </Button>
                        
                        <Text textAlign="center" fontSize="sm" color="gray.400">
                            By continuing, you agree to our Terms of Service and Privacy Policy.
                        </Text>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default LoginModal;