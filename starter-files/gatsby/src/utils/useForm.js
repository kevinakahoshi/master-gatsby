import { useState } from 'react';

const useForm = (defaults) => {
  const [values, setValues] = useState(defaults);

  const updateValue = (event) => {
    let { value } = event.target;

    if (event.target.type === 'number') {
      value = parseInt(event.target.value);
    }

    setValues({
      ...values,
      [event.target.name]: value,
    });
  };

  return { values, updateValue };
};

export default useForm;
