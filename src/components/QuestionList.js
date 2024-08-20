// src/components/QuestionList.js or similar component file

import React, { useState, useEffect } from 'react';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('http://localhost:4000/questions');
      const data = await response.json();
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  const handleDropdownChange = async (event, questionId) => {
    const newCorrectIndex = parseInt(event.target.value, 10);
    try {
      await fetch(`http://localhost:4000/questions/${questionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correctIndex: newCorrectIndex }),
      });
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === questionId ? { ...q, correctIndex: newCorrectIndex } : q
        )
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ul>
      {questions.map((question) => (
        <li key={question.id}>
          <h4>Question {question.id}</h4>
          <h5>Prompt: {question.prompt}</h5>
          <label>
            Correct Answer:
            <select
              value={question.correctIndex}
              onChange={(event) => handleDropdownChange(event, question.id)}
            >
              {question.answers.map((answer, index) => (
                <option key={index} value={index}>
                  {answer}
                </option>
              ))}
            </select>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default QuestionList;

