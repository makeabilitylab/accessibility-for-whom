import React, { useState, useEffect } from 'react';
import RadioQuestion from '../../components/RadioQuestion';

const Question4 = ({ stepNumber, nextStep, previousStep, answers, handleChange, errors }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    if (answers && answers.mobilityAidOptions) {
      const { mobilityAidOptions, customMobilityAid } = answers.mobilityAidOptions;
      let options = mobilityAidOptions.filter(option => option !== "Something else").map(option => ({ value: option, label: option }));

      // Add custom input if it exists
      if (customMobilityAid) {
        options.push({ value: customMobilityAid, label: customMobilityAid });
      }

      setFilteredOptions(options);
    }
  }, [answers]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    handleChange('mobilityAid')(event);
  };

  return (
    <RadioQuestion
      questionText={`${stepNumber}. Which mobility aid do you use more frequently when going outside of your home?*`}
      inputId="mobilityAid"
      instructionText="Select one option"
      options={filteredOptions}
      handleChange={handleOptionChange}
      previousStep={previousStep}
      nextStep={nextStep}
      error={errors.mobilityAid}
    />
  );
};

export default Question4;
