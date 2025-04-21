import React, { useState, useEffect } from 'react';
import CheckboxQuestion from '../../components/CheckboxQuestion';

const questionOptions = [
  { value: "Walking cane", label: "Walking cane" },
  { value: "Walker", label: "Walker" },
  { value: "Mobility scooter", label: "Mobility scooter" },
  { value: "Manual wheelchair", label: "Manual wheelchair" },
  { value: "Motorized wheelchair", label: "Motorized wheelchair" },
  { value: "Something else", label: "Something else" },
];

const Question3 = ({ previousStep, nextStep, updateAnswers, stepNumber, setSingleMobilityAid, errors }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [customValue, setCustomValue] = useState(''); // this is for something else option


  const handleChange = (event) => {
    const { value, checked } = event.target;
    setSelectedOptions((prevSelectedOptions) => {
      if (checked) {
        return [...prevSelectedOptions, value];
      } else {
        return prevSelectedOptions.filter((option) => option !== value);
      }
    });
  };

  const handleCustomChange = (event) => {
    setCustomValue(event.target.value);
  };

  const handleNextStep = () => {
    // Maintain the order of options as per the screen order
    const orderedSelectedOptions = questionOptions
      .map((option) => option.value)
      .filter((option) => selectedOptions.includes(option))
      .map((option) => (option === "Something else" ? customValue : option));
  
    updateAnswers('mobilityAidOptions', { mobilityAidOptions: orderedSelectedOptions });
    // console.log('Mobility Aid Options:', orderedSelectedOptions);

    if (orderedSelectedOptions.length === 1) {
      updateAnswers('mobilityAid', orderedSelectedOptions[0]); // Update the single selected option
      setSingleMobilityAid(true);
    } else {
      updateAnswers('mobilityAid', ''); // Clear mobilityAid if there are multiple options
    }

    setNextStepReady(true); // Mark next step ready to proceed
  };

  const [nextStepReady, setNextStepReady] = useState(false);

  useEffect(() => {
    setSingleMobilityAid(false);
  }, []); // Empty dependency array to ensure it runs only once on mount

  useEffect(() => {
    if (nextStepReady) {
      nextStep();
    }
  }, [nextStepReady]);

  return (
    <CheckboxQuestion
      questionText={`${stepNumber}. When going outside your home, do you use any of the following?*`}
      options={questionOptions}
      selectedOptions={selectedOptions}
      handleChange={handleChange}
      customValue={customValue}
      handleCustomChange={handleCustomChange}
      previousStep={previousStep}
      nextStep={handleNextStep}
      error={errors.mobilityAidOptions} 
    />
  );
};

export default Question3;
