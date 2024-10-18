import React from 'react';
import { Box, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { FaHistory, FaRobot, FaLightbulb, FaMagic } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);

const Feature = ({ title, text, icon, delay, isReversed }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <MotionBox
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      whileHover={{ scale: 1.05 }}
    >
      <MotionFlex
        direction={{ base: 'column', md: isReversed ? 'row-reverse' : 'row' }}
        align="center"
        justify="space-between"
        mb={16}
        p={8}
        borderRadius="lg"
        boxShadow="0 0 20px rgba(0, 0, 0, 0.2)"
        // Removed backdropFilter and bg to make particles visible
      >
        <MotionFlex
          w={20}
          h={20}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bgGradient="linear(to-br, purple.500, cyan.500)"
          mb={2}
          boxShadow="0 0 20px rgba(128, 0, 255, 0.6)"
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </MotionFlex>
        <Stack align={'flex-start'} textAlign={'left'} flex={1} ml={isReversed ? 0 : 8} mr={isReversed ? 8 : 0}>
          <MotionText 
            fontWeight={700} 
            color="white" 
            fontSize="2xl" 
            textShadow="0 0 10px rgba(255, 255, 255, 0.5)"
            variants={childVariants}
          >
            {title}
          </MotionText>
          <MotionText 
            color={'cyan.200'} 
            fontSize="lg"
            variants={childVariants}
          >
            {text}
          </MotionText>
        </Stack>
      </MotionFlex>
    </MotionBox>
  );
};

const FeatureSection = () => {
  return (
    <Box p={10}>
      <Feature
        icon={<Icon as={FaMagic} w={10} h={10} color="purple.300" />}
        title={'Spiritual Transformation'}
        text={'Transform negative thoughts into positive, enlightening experiences with our AI-powered spiritual assistant.'}
        delay={0.1}
        isReversed={false}
      />
      <Feature
        icon={<Icon as={FaRobot} w={10} h={10} color="cyan.300" />}
        title={'Empathetic AI Companion'}
        text={'Experience deep, meaningful conversations with our AI that understands and uplifts your spirit.'}
        delay={0.3}
        isReversed={true}
      />
      <Feature
        icon={<Icon as={FaLightbulb} w={10} h={10} color="yellow.300" />}
        title={'Personalized Growth Insights'}
        text={'Receive tailored spiritual guidance and positive affirmations to illuminate your path to inner peace.'}
        delay={0.5}
        isReversed={false}
      />
      <Feature
        icon={<Icon as={FaHistory} w={10} h={10} color="green.300" />}
        title={'Transformation Journey'}
        text={'Track your spiritual progress and witness your growth as you turn challenges into opportunities.'}
        delay={0.7}
        isReversed={true}
      />
    </Box>
  );
};

export default FeatureSection;