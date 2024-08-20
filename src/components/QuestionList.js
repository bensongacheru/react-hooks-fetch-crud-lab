import { useState, useEffect } from 'react';
import React from 'react';
import QuestionItem from './QuestionItem';

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((response) => response.json())
      .then((questions) => {
        setQuestions(questions);
      });
  }, []);
  const displayQuestions = questions.map((question) => {
    return <QuestionItem question={question} key={question.id} questions={questions} setQuestions={setQuestions}/>;
  });
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{displayQuestions}</ul>
    </section>
  );
}

export default QuestionList;
