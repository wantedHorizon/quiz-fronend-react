import React, { useEffect, useState } from 'react';
import AmericanQuestion from '../components/form/AmericanQuestion/AmericanQuestion';
import Form from '../components/form/Form';
import quizAPI from '../api/quiz-api';

const QuizFormContainer = ({ username = 'eliran94' }) => {
  const [formData, setFormData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const display = <h1>Loading...</h1>;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await quizAPI.get(`/quiz/questions/${username}`);
        setFormData(data.data);
        const answers = data.data.map((q) => 1);
        console.log(answers);
        setAnswers(answers);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUserData();
  }, []);

  const onChangeAnswer = (e, i) => {
    console.log('index', i);
    console.log('value', e.target.value);
    console.log(answers);
  };

  const DisplayForm = () =>
    formData.map((q, i) => (
      <AmericanQuestion
        key={i}
        question={q.q}
        answers={q.answers}
        onChange={(e) => onChangeAnswer(e, i)}
        allAnswers={answers}
        index={i}
      />
    ));

  return (
    <div className="QuizFormContainer ">
      <h3>quizForm</h3>
      <Form className="ui form ">
        <div className="inline-fields">{DisplayForm()}</div>
        <input type="submit" value="submit" />
      </Form>
    </div>
  );
};
export default QuizFormContainer;
