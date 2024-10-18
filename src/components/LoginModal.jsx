import React, { useEffect } from "react";
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
    useToast,
} from "@chakra-ui/react";
import { FaMagic, FaGoogle } from "react-icons/fa";
import { auth } from "../firebase";
import { signInWithRedirect, GoogleAuthProvider, getRedirectResult } from "firebase/auth";

const LoginModal = ({ isOpen, onClose }) => {
    const toast = useToast();

    useEffect(() => {
        if (!auth) {
            console.error("Firebase auth is not initialized");
            return;
        }

        getRedirectResult(auth)
            .then((result) => {
                if (result) {
                    const user = result.user;
                    console.log("Logged in user:", user);
                    toast({
                        title: "Login Successful",
                        description: `Welcome, ${user.displayName}!`,
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                    onClose();
                }
            })
            .catch((error) => {
                console.error("Error during Google login:", error);
                console.error("Error code:", error.code);
                console.error("Error message:", error.message);
                if (error.customData) {
                    console.error("Custom data:", error.customData);
                }
                toast({
                    title: "Login Failed",
                    description: `${error.message}. Please try again or contact support.`,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    }, [toast, onClose]);

    const handleGoogleLogin = () => {
        if (!auth) {
            console.error("Firebase auth is not initialized");
            toast({
                title: "Login Failed",
                description: "Authentication service is not available. Please try again later.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        signInWithRedirect(auth, provider)
            .catch((error) => {
                console.error("Error initiating Google login:", error);
                console.error("Error code:", error.code);
                console.error("Error message:", error.message);
                if (error.customData) {
                    console.error("Custom data:", error.customData);
                }
                toast({
                    title: "Login Initiation Failed",
                    description: `${error.message}. Please try again or contact support.`,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="purple.900" color="white" borderColor="purple.500" borderWidth={1}>
                <ModalHeader display="flex" alignItems="center" gap={2}>
                    <FaMagic />
                    <Text>Mystical Login</Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text color="purple.200" mb={4}>
                        Use your Google account to access your healing journey.
                    </Text>
                    <VStack spacing={4}>
                        <Button
                            leftIcon={<FaGoogle />}
                            onClick={handleGoogleLogin}
                            colorScheme="red"
                            width="full"
                            size="lg"
                        >
                            Sign in with Google
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default LoginModal;
