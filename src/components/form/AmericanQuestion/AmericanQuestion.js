/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import { Form } from 'semantic-ui-react';

const AmericanQuestion = ({
  onChange,
  question,
  selected,
  qIndex,
  answers = [],
  ...restProps
}) => {
  const answersFields = answers.map((q, index) => (
    <Form.Field
      key={index}
      label={q}
      control="input"
      type="radio"
      name={`q{${qIndex}}`}
      checked={selected === index}
      onChange={(e) => onChange(e, qIndex, index)}
    />
  ));

  return (
    <>
      <Form.Group grouped {...restProps}>
        <label htmlFor={`q{${qIndex}}`}>{question}</label>
        {answersFields}
      </Form.Group>
    </>
  );
};
export default AmericanQuestion;
