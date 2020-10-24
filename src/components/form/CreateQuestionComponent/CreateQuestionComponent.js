import React from 'react';
import { Form } from 'semantic-ui-react';

const options = [
  { key: 0, value: 0, text: 1 },
  { key: 1, value: 1, text: 2 },
  { key: 2, value: 2, text: 3 },
  { key: 3, value: 3, text: 4 },
];
const CreateQuestionComponent = ({ index, data, onChange }) => {
  const displayQuestions = () =>
    data.answers.map((ans, ansIndex) => (
      <div className="field" key={`q(${index})-ans(${ansIndex})`}>
        {/* <label
          htmlFor={`ans{${ansIndex}}`}
        >{`Answer Number ${ansIndex}`}</label> */}
        <Form.Input
          value={ans}
          placeholder={`Answer${ansIndex + 1}`}
          onChange={(e) => onChange(e, index, ansIndex, data)}
        />
      </div>
    ));

  return (
    <div className="CreateQuestionComponent">
      CreateQuestionComponent
      <Form.Group grouped style={{ border: '1px solid black' }}>
        <label htmlFor={`q{${index}}`}>{`Question Number ${index + 1}`}</label>
        <Form.Input value={data.q} placeholder="Question" onChange={(e) => onChange(e, index, -1, data, 'q')} />

        {displayQuestions()}

        <Form.Field
          control={Form.Select}
          label={`Correct Answer is: ${data?.correct + 1}`}
          options={options}
          onChange={(e, { value }) => onChange(e, index, -1, data, 'correct', value)}
          value={data.correct}
          placeholder="Correct Answer"
        />
      </Form.Group>
    </div>
  );
};
export default CreateQuestionComponent;
