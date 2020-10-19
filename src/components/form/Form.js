/* eslint-disable react/prop-types */
import React from 'react';

const Form = ({ children, ...restProps }) => (
  <form {...restProps}>{children}</form>
);

export default Form;
