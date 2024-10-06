import React, { useState, useEffect, useRef } from 'react';
import { Box, VStack, HStack, Text, Button, Heading, Flex, Icon, useMediaQuery, Divider } from '@chakra-ui/react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import FeatureSection from './FeatureSection'; // Import the new FeatureSection
import Navbar from './Navbar';

const MotionBox = motion(Box);
const MotionText = motion(Text);

const ScrollAnimationWrapper = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {children}
    </MotionBox>
  );
};

const NavItem = ({ icon, text, to }) => (
  <ScrollAnimationWrapper>
    <MotionBox
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={to}>
        <HStack
          spacing={4}
          px={4}
          py={3}
          transition="all 0.3s ease-in-out"
          cursor="pointer"
          align="center"
          _hover={{ bg: 'purple.800', borderRadius: 'md' }}
        >
          <Icon as={icon} boxSize={6} color="purple.400" />
          <Text fontWeight="bold" fontSize="lg" color="white">
            {text}
          </Text>
        </HStack>
      </Link>
    </MotionBox>
  </ScrollAnimationWrapper>
);

const Feature = ({ title, icon, description, isReversed }) => (
  <MotionBox
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
  >
    <Flex
      direction={{ base: 'column', md: isReversed ? 'row-reverse' : 'row' }}
      align="center"
      justify="space-between"
      w="full"
      mb={16}
    >
      <Box
        flex={1}
        bg="rgba(255, 255, 255, 0.1)"
        p={8}
        borderRadius="lg"
        transition="all 0.3s"
        _hover={{ transform: 'translateY(-5px)', boxShadow: '2xl' }}
        textAlign={{ base: 'center', md: isReversed ? 'right' : 'left' }}
      >
        <Icon as={icon} w={12} h={12} color="purple.300" mb={4} />
        <Heading as="h3" size="lg" mb={4} color="white">
          {title}
        </Heading>
        <Text color="gray.300">{description}</Text>
      </Box>
      <Box flex={1} display={{ base: 'none', md: 'block' }} />
    </Flex>
  </MotionBox>
);

function HomeScreen({ onStartChat }) {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: [0, 1],
      y: [50, 0],
      transition: { duration: 0.8, ease: "easeOut" }
    });
  }, [controls]);

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <Flex direction="column" minHeight="100vh" position="relative" overflow="hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "#000000",
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              outModes: {
                default: "bounce",
              },
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 50,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        style={{ position: 'absolute', zIndex: 0, top: 0, left: 0 }}
      />
      <Box position="relative" zIndex={1} flex="1">
        <Navbar />
        <VStack spacing={16} align="center" justify="center" minHeight="100vh" textAlign="center" py={20} px={4}>
          <MotionBox initial={{ opacity: 0, y: 50 }} animate={controls}>
            <VStack spacing={6} mt={0}>
              <Heading as="h1" size="4xl" color="white" fontWeight="extrabold">
                CHAT POSITIVE
              </Heading>
              <Heading as="h2" size="2xl" color="purple.200">
                AI-POWERED POSITIVITY
              </Heading>
              <Text color="gray.300" fontSize="2xl" maxW="800px">
                Transform Negativity into Uplifting Conversations
              </Text>
              <Text color="gray.400" fontSize="xl" maxW="600px">
                Experience the power of AI that turns any negative statement into a positive, encouraging message.
              </Text>
              <MotionBox
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={onStartChat}
                  colorScheme="pink"
                  size="lg"
                  fontSize="xl"
                  py={8}
                  px={12}
                  _hover={{ transform: 'translateY(-2px)', boxShadow: '2xl' }}
                >
                  START CHATTING
                </Button>
              </MotionBox>
            </VStack>
          </MotionBox>

          {/* New Feature Section */}
          <FeatureSection />

          {/* Additional Section */}
          <ScrollAnimationWrapper>
            <Box bg="gray.700" p={8} borderRadius="lg" mt={16} w="full">
              <Heading as="h3" size="lg" color="white" mb={4}>
                Join Our Community
              </Heading>
              <Text color="gray.300" fontSize="lg" mb={4}>
                Connect with like-minded individuals and share your experiences. Our community is here to support and inspire you.
              </Text>
              <HStack spacing={4} justify="center">
                <Button colorScheme="purple" variant="outline">Join Now</Button>
                <Button colorScheme="purple" variant="solid">Contact Us</Button>
              </HStack>
            </Box>
          </ScrollAnimationWrapper>
        </VStack>
      </Box>

      {/* Footer */}
      <Box bg="purple.900" p={6} w="full" mt="auto" boxShadow="0 -2px 10px rgba(0, 0, 0, 0.5)">
        <Divider mb={4} borderColor="purple.700" />
        <Flex justify="space-between" align="center" color="gray.300">
          <Text fontSize="sm">© 2023 MyApp. All rights reserved.</Text>
          <HStack spacing={4}>
            <Link href="/privacy" color="purple.300" _hover={{ color: 'white' }}>Privacy Policy</Link>
            <Link href="/terms" color="purple.300" _hover={{ color: 'white' }}>Terms of Service</Link>
          </HStack>
        </Flex>
      </Box>
    </Flex>
  );
}

export default HomeScreen;