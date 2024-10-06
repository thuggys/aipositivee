import React, { useState } from 'react';
import { Box, Flex, Link, Button, useDisclosure } from '@chakra-ui/react';
import LoginModal from './LoginModal'; // We'll create this component next

function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box
            bg="rgba(0, 0, 0, 0.5)"
            px={4}
            position="fixed"
            width="100%"
            zIndex={1000}
            backdropFilter="blur(10px)"
        >
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <Box color="white" fontWeight="bold">MyApp</Box>
                <Flex alignItems="center">
                    <Link href="/" color="white" px={2} _hover={{ color: 'purple.300' }}>Home</Link>
                    <Link href="/about" color="white" px={2} _hover={{ color: 'purple.300' }}>About Us</Link>
                    <Button
                        colorScheme="purple"
                        variant="outline"
                        size="sm"
                        ml={4}
                        onClick={onOpen}
                        _hover={{ bg: 'purple.600', color: 'white' }}
                    >
                        Login
                    </Button>
                </Flex>
            </Flex>
            <LoginModal isOpen={isOpen} onClose={onClose} />
        </Box>
    );
}

export default Navbar;