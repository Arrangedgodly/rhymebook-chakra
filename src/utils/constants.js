import { useState } from 'react';

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
};

export function useCheckboxes(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (e) => {
    const {checked, name} = e.target;
    setValues({...values, [name]: checked});
  }
  return {values, handleChange};
}

export function getLastWord(str) {
  return str.split(' ').pop();
}