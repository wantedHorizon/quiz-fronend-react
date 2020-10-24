/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { Form as SemForm, FormButton } from 'semantic-ui-react';
import Form from '../components/form/Form';
import quizAPI from '../api/quiz-api';
import CreateQuestionComponent from '../components/form/CreateQuestionComponent/CreateQuestionComponent';

const OPTION_NUMBER = 3;
const validateAnswers = (answers) => {
  for (let i = 0; i < answers.length; i++) {
    if ((!answers[i] && answers[i] !== 0) || answers[i] < 0 || answers[i] > OPTION_NUMBER) {
      return false;
    }
  }

  return true;
};
const random = Math.random() * 255;

const CreateFormContainer = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(`eliran${random}`);

  const displayForm = () =>
    formData.map((q, i) => <CreateQuestionComponent key={i} index={i} data={q} onChange={onChangeQuestionHandler} />);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // if (!validateAnswers(answers)) {
    //   alert('plz fill all answers');
    // }

    try {
      const data = await quizAPI.post('/quiz/create/user', {
        username,
        firstname: 'name1',
        lastname: 'lastname1',
        survey: formData,
      });
      console.log(data);
      // todo move to display results
    } catch (e) {
      console.log(e);
    }
  };

  const addNewQuestionHandler = () => {
    const newQuestion = {
      q: `q${formData.length + 1}`,
      answers: ['1', '2', '3', '4'],
      correct: 0,
    };
    const newForm = formData.slice();
    newForm.push(newQuestion);
    setFormData(newForm);
  };
  const onChangeQuestionHandler = (e, index, answerIndex, data, type = 'answer', value) => {
    console.log(value);
    const newData = { ...data };
    if (type === 'answer') {
      newData.answers[answerIndex] = e.target.value;
    } else if (type === 'q') {
      newData.q = e.target.value;
    } else if (type === 'correct') {
      newData.correct = value;
    }
    const newFormData = formData.slice();
    newFormData[index] = newData;
    setFormData(newFormData);
  };
  console.log(formData);
  return (
    <div className="CreateFormContainer " style={{ maxWidth: '50%', margin: '0 auto' }}>
      <h3>quizForm</h3>

      <Form className="ui form " onSubmit={onSubmitHandler}>
        <SemForm.Group widths="equal">
          <SemForm.Field label="Username" value={name} onChange={(e) => setUsername(e.target.value)} control="input" />
        </SemForm.Group>

        <div className="inline-fields">{displayForm()}</div>
        <div className="field">
          <button className="button ui" type="button" onClick={addNewQuestionHandler}>
            Add New Question
          </button>
        </div>
        <div className="field">
          <FormButton className="button ui" type="submit">
            Create New User
          </FormButton>
        </div>
      </Form>
    </div>
  );
};
export default CreateFormContainer;
