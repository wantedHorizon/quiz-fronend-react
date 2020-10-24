/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { Form as SemForm } from 'semantic-ui-react';
import AmericanQuestion from '../components/form/AmericanQuestion/AmericanQuestion';
import Form from '../components/form/Form';
import quizAPI from '../api/quiz-api';

const OPTION_NUMBER = 3;
const validateAnswers = (answers) => {
  for (let i = 0; i < answers.length; i++) {
    if (
      (!answers[i] && answers[i] !== 0) ||
      answers[i] < 0 ||
      answers[i] > OPTION_NUMBER
    ) {
      return false;
    }
  }

  return true;
};
const random = Math.random() * 255;

const QuizFormContainer = ({ username = `eliran95` }) => {
  const [formData, setFormData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(`eliran${random}`);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await quizAPI.get(`/quiz/questions/${username}`);
        setFormData(data.data);
        const answers = data.data.map((q) => null);
        setAnswers(answers);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUserData();
  }, []);

  const onChangeAnswer = (e, qIndex, index) => {
    console.log('Qindex', qIndex);
    console.log(e.target);
    const newAnswers = answers.slice();
    newAnswers[qIndex] = index;
    setAnswers(newAnswers);
  };

  const displayForm = () =>
    formData.map((q, i) => (
      <AmericanQuestion
        key={i}
        question={q.q}
        answers={q.answers}
        onChange={onChangeAnswer}
        selected={answers[i]}
        qIndex={i}
      />
    ));

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!validateAnswers(answers)) {
      alert('plz fill all answers');
      return;
    }

    try {
      const data = await quizAPI.post('/quiz/answers/add', {
        username,
        player_name: name,
        answers,
      });
      console.log(data);
      // todo move to display results
    } catch (e) {
      console.log(e);
    }
  };

  let display = <h1>Loading...</h1>;
  if (!loading) {
    display = (
      <Form className="ui form " onSubmit={onSubmitHandler}>
        <SemForm.Group widths="equal">
          <SemForm.Field
            label="Player Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            control="input"
          />
        </SemForm.Group>
        <div className="inline-fields">{displayForm()}</div>
        <input type="submit" value="submit" />
      </Form>
    );
  }

  return (
    <div className="QuizFormContainer ">
      <h3>quizForm</h3>

      {display}
    </div>
  );
};
export default QuizFormContainer;
