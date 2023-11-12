import React, { useState } from 'react';
import {
  VStack,
  Box,
  Button,
  Input,
  Text,
  HStack,
  Select,
  Spacer,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctOption: '' },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], correctOption: '' },
    ]);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (questionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctOption = value;
    setQuestions(updatedQuestions);
  };

  const handleCreateQuiz = () => {
    // Handle creating a quiz with the questions
    console.log('Creating quiz with questions:', questions);
  };

  return (
    <VStack mt={3} spacing={4} align="center" width="80%" m="auto">
      <Text color={'black.400'} fontSize="xl" fontWeight="bold">
        Create Quiz 
      </Text>

      <AnimatePresence>
        {questions.map((question, questionIndex) => (
          <motion.div
            key={questionIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            width="100%"
          >
            <Box p={4} borderWidth="1px" borderRadius="md" width="100%">
              <Input
                value={question.question}
                onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                placeholder={`Enter question ${questionIndex + 1}`}
                mb={2}
              />

              {question.options.map((option, optionIndex) => (
                <Input
                  key={optionIndex}
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(questionIndex, optionIndex, e.target.value)
                  }
                  placeholder={`Option ${optionIndex + 1}`}
                  mb={2}
                />
              ))}

              <HStack spacing={2}>
                <Text>Select Correct Option:</Text>
                <Select
                  value={question.correctOption}
                  onChange={(e) => handleCorrectOptionChange(questionIndex, e.target.value)}
                  width="30%"
                >
                  {[1, 2, 3, 4].map((optionIndex) => (
                    <option key={optionIndex} value={optionIndex}>
                      {`Option ${optionIndex}`}
                    </option>
                  ))}
                </Select>
                <Spacer />
              </HStack>
            </Box>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button onClick={handleAddQuestion} colorScheme="teal">
        Add Question
      </Button>

      <Button onClick={handleCreateQuiz} colorScheme="teal" mt={4}>
        Finish setting up
      </Button>
    </VStack>
  );
};

export default CreateQuiz;
