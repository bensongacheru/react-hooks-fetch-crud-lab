// src/components/QuestionForm.js

import React, { useState } from 'react';

const QuestionForm = ({ setQuestions }) => {
  const [formData, setFormData] = useState({
    prompt: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correctIndex: '0',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.prompt || !formData.answer1 || !formData.answer2 || !formData.answer3 || !formData.answer4) {
      window.alert("All fields are required.");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: formData.prompt,
          answers: [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
          correctIndex: parseInt(formData.correctIndex, 10),
        }),
      });
      const newQuestion = await response.json();
      setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form Fields */}
    </form>
  );
};

export default QuestionForm;


