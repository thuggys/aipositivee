import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Stack,
  Checkbox,
  VStack,
  Progress,
} from '@chakra-ui/react';

const QuizModal = ({ isOpen, onClose, onSubmit }) => {
  const [responses, setResponses] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      type: 'text',
      question: "What is your favorite color?",
    },
    {
      type: 'radio',
      question: "What is your birth month?",
      options: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    },
    {
      type: 'number',
      question: "Choose a number between 1 and 10.",
    },
    {
      type: 'checkbox',
      question: "Select your preferred activities:",
      options: ['Reading', 'Traveling', 'Cooking', 'Sports', 'Music'],
    },
    // Add more questions as needed
  ];

  const handleChange = (value) => {
    setResponses((prev) => ({ ...prev, [currentQuestion]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onSubmit(responses);
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    switch (question.type) {
      case 'text':
        return (
          <Input
            value={responses[currentQuestion] || ''}
            onChange={(e) => handleChange(e.target.value)}
          />
        );
      case 'radio':
        return (
          <RadioGroup
            value={responses[currentQuestion] || ''}
            onChange={handleChange}
          >
            <Stack direction="column">
              {question.options.map((option, index) => (
                <Radio key={index} value={option}>
                  {option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        );
      case 'number':
        return (
          <Input
            type="number"
            min="1"
            max="10"
            value={responses[currentQuestion] || ''}
            onChange={(e) => handleChange(e.target.value)}
          />
        );
      case 'checkbox':
        return (
          <Stack direction="column">
            {question.options.map((option, index) => (
              <Checkbox
                key={index}
                isChecked={responses[currentQuestion]?.includes(option) || false}
                onChange={(e) => {
                  const newValue = e.target.checked
                    ? [...(responses[currentQuestion] || []), option]
                    : (responses[currentQuestion] || []).filter((item) => item !== option);
                  handleChange(newValue);
                }}
              >
                {option}
              </Checkbox>
            ))}
          </Stack>
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Predict Your Future</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>{questions[currentQuestion].question}</FormLabel>
              {renderQuestion()}
            </FormControl>
            <Progress value={(currentQuestion + 1) / questions.length * 100} />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={handlePrevious} isDisabled={currentQuestion === 0}>
            Previous
          </Button>
          <Button colorScheme="blue" onClick={handleNext}>
            {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default QuizModal;