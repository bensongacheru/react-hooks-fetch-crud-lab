import React from 'react';

function QuestionItem({ question, questions, setQuestions }) {
  const { id, prompt, answers, correctIndex } = question;

  function deleteQuestion(deletedQuestion) {
    handleDelete(id);
  }

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        const remainingQuestions = questions.filter(
          (question) => question.id !== id
        );
        setQuestions(remainingQuestions);
      });
  }

  function updateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map((question) => {
      if (question.id === updatedQuestion.id) {
        return question.correctIndex === updatedQuestion.correctIndex;
      } else {
        return question;
      }
    });
    setQuestions(updatedQuestions);
  }

  function handleUpdate(event) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        correctIndex: event.target.value,
      }),
    })
      .then((response) => response.json())
      .then((question) => updateQuestion(question));
    console.log('Fetch successful');
  }
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleUpdate}>
          {options}
        </select>
      </label>
      <button onClick={deleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;


