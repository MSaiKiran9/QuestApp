import React, { useState } from 'react';
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';

const CreateQuiz = () => {
  const [numQuestions, setNumQuestions] = useState(1);
  const [questions, setQuestions] = useState([{}]);

  const addQuestion = () => {
    setNumQuestions(numQuestions + 1);
    setQuestions([...questions, {}]);
  };

  const handleQuestionChange = (questionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].question = value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answer = value;
    setQuestions(updatedQuestions);
  };

  const saveQuiz = () => {
    // Send the questions and answers to your server or perform the desired action
  };

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} w="50%">
      <Text fontSize="xl" fontWeight="bold">
        Create Quiz
      </Text>
      <Input
        placeholder="Number of Questions"
        type="number"
        value={numQuestions}
        onChange={(e) => setNumQuestions(Number(e.target.value))}
      />
      {questions.map((question, questionIndex) => (
        <VStack key={questionIndex} mt={4}>
          <Input
            placeholder={`Question ${questionIndex + 1}`}
            value={question.question}
            onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
          />
          <Input
            placeholder={`Answer for Question ${questionIndex + 1}`}
            value={question.answer}
            onChange={(e) => handleAnswerChange(questionIndex, e.target.value)}
          />
          <Button
            colorScheme="teal"
            variant="outline"
            size="sm"
            onClick={() => addQuestion()}
          >
            Add Another Question
          </Button>
        </VStack>
      ))}
      <Button colorScheme="teal" size="lg" mt={4} onClick={saveQuiz}>
        Save Quiz
      </Button>
    </Box>
  );
};

export default CreateQuiz;
