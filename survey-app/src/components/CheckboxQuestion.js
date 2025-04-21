import React, { useState } from 'react';
import { Button, Checkbox, Input } from '@material-tailwind/react';
import { Warning } from 'phosphor-react';
import PageNavigations from './PageNavigations';
import withEnterKeyHandler from './withEnterKeyHandler';

const CheckboxQuestion = ({
  questionText,
  instructionText,
  options,
  selectedOptions,
  handleChange,
  customValue,
  handleCustomChange,
  previousStep,
  nextStep,
  error
}) => {
  const [localError, setLocalError] = useState('');

  const handleNextStep = () => {
    if (selectedOptions.length === 0) {
      setLocalError('Please select at least one option.');
    } else if (selectedOptions.includes("Something else") && !customValue.trim()) {
      setLocalError('Please specify the option.');
    } else {
      setLocalError('');
      nextStep();
    }
  };

  return (
    <div className="question-container">
      <div className="question-content">
        <h2
        tabIndex="0"
        aria-live="assertive"
        >{questionText}</h2>
        <p style={{ fontSize: '0.8em', textAlign: 'left', marginBottom: '0.4em' }}>{instructionText}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4em', fontSize: '0.8em', textAlign: 'left' }} className="text-base">
          {options.map((option, index) => (
            <div key={index}>
              <Checkbox
                color='teal'
                name={option.value}
                value={option.value}
                label={option.label}
                onChange={handleChange}
              />
            </div>
          ))}
          {selectedOptions.includes("Something else") && (
            <Input
              variant="static"
              type="text"
              color="teal"
              placeholder="Please specify"
              value={customValue}
              onChange={handleCustomChange}
            />
          )}
        </div>
        {(error || localError) && (
          <div className="flex items-center mt-2 text-red-700 bg-red-50 p-2 rounded max-w-max">
            <Warning size={'1.2em'} weight="fill" className="mr-2" />
            <p className="text-w">{error || localError}</p>
          </div>
        )}
         <div className="question-button-group items-center">
            <Button size='lg' className="lg-font-size-button" color="teal" onClick={handleNextStep}>OK</Button>
            <span className="text-w text-teal-700" >press Enter ↵</span>
          </div>
      </div>
      <PageNavigations onPrevious={previousStep} onNext={nextStep} />
    </div>
  );
};

export default withEnterKeyHandler(CheckboxQuestion);