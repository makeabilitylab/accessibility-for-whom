import React from 'react';
import TextQuestion from '../../components/TextQuestion'; 

const Question1 = ({ previousStep, nextStep, handleChange, stepNumber, errors }) => {
  return (
    <TextQuestion
      questionText={`${stepNumber}. What is your name?*`}
      inputId="name"
      placeholderText="Type your full name..."
      handleChange={handleChange}
      previousStep={previousStep}
      nextStep={nextStep}
      error={errors.name}
      // isFirstQuestion={true} 
    />
  );
};

export default Question1;
