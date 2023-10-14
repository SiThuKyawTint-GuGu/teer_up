'use client';
import { useState } from 'react';

const TestFormPage = () => {
  const [options, setOptions] = useState([{ id: 1, label: '', value: '' }]);

  const handleOptionChange = (e: any, optionId: number) => {
    const { name, value } = e.target;

    setOptions(prevOptions =>
      prevOptions.map(option => (option.id === optionId ? { ...option, [name]: value } : option))
    );
    console.log(options);
  };

  return (
    <div>
      {options.map(option => (
        <div key={option.id}>
          <input
            type="text"
            name="label"
            value={option.label}
            onChange={e => handleOptionChange(e, option.id)}
            placeholder="Label"
          />
          <input
            type="text"
            name="value"
            value={option.value}
            onChange={e => handleOptionChange(e, option.id)}
            placeholder="Value"
          />
        </div>
      ))}
    </div>
  );
};

export default TestFormPage;
