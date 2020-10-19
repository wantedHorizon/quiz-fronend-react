/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import { Form } from 'semantic-ui-react';

const AmericanQuestion = ({
  onChange,
  question,
  allAnswers,
  index: qIndex,
  answers = [],
  ...restProps
}) => {
  const answersFields = answers.map((q, index) => (
    <div className="field" key={index}>
      <div className="ui radio checkbox">
        <input
          type="radio"
          name={index}
          tabIndex="0"
          checked={allAnswers[qIndex] === index}
          value={index}
          className="hidden"
        />
        <label>{q}</label>
      </div>
    </div>
  ));

  return (
    <div className="AmericanQuestion" {...restProps}>
      <div className="grouped fields" onChange={onChange}>
        <label htmlFor="fruit">{question}</label>
        {answersFields}
      </div>
    </div>
  );
};
export default AmericanQuestion;
