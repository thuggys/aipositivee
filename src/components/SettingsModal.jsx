import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Switch,
  FormControl,
  FormLabel,
  Select,
  useColorMode,
} from '@chakra-ui/react';

const SettingsModal = ({ isOpen, onClose, settings, updateSettings }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleSettingChange = (setting, value) => {
    updateSettings({ [setting]: value });
    if (setting === 'darkMode') {
      toggleColorMode();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm"> {/* Adjusted size for mobile */}
      <ModalOverlay />
      <ModalContent
        bg={colorMode === 'dark' ? "rgba(45, 55, 72, 0.8)" : "white"}
        backdropFilter="blur(10px)"
        borderRadius="xl"
        boxShadow="xl"
      >
        <ModalHeader color={colorMode === 'dark' ? "white" : "gray.800"}>Settings</ModalHeader>
        <ModalCloseButton color={colorMode === 'dark' ? "white" : "gray.800"} />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="dark-mode" mb="0" color={colorMode === 'dark' ? "white" : "gray.800"}>
                Dark Mode
              </FormLabel>
              <Switch 
                id="dark-mode" 
                isChecked={colorMode === 'dark'}
                onChange={() => handleSettingChange('darkMode', !settings.darkMode)}
                size="lg" // Increased size for better touchability
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="language" color={colorMode === 'dark' ? "white" : "gray.800"}>
                Language
              </FormLabel>
              <Select 
                id="language" 
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                color={colorMode === 'dark' ? "white" : "gray.800"} 
                bg={colorMode === 'dark' ? "rgba(74, 85, 104, 0.8)" : "white"}
                size="lg" // Increased size
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="font-size" color={colorMode === 'dark' ? "white" : "gray.800"}>
                Font Size
              </FormLabel>
              <Select 
                id="font-size" 
                value={settings.fontSize}
                onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                color={colorMode === 'dark' ? "white" : "gray.800"} 
                bg={colorMode === 'dark' ? "rgba(74, 85, 104, 0.8)" : "white"}
                size="lg" // Increased size
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose} size="lg">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;