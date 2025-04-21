import React from 'react';
import { Button, Radio } from '@material-tailwind/react';
import { Warning } from 'phosphor-react';
import PageNavigations from './PageNavigations';
import withEnterKeyHandler from './withEnterKeyHandler';

const RadioQuestion = ({ questionText, inputId, instructionText, options, handleChange, previousStep, nextStep, error }) => {
  return (
    <div className="question-container">
      <div className="question-content">
        <h2
          tabIndex="0"
          aria-live="assertive"
        >{questionText}</h2>
        <p className="text-instruction text-left mb-8 text-gray-600">{instructionText}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8em', textAlign: 'left' }} >
          {options.map((option, index) => (
            <Radio
              key={index}
              color='teal'
              name={inputId} 
              value={option.value}
              label={option.label}
              onChange={handleChange}
              // aria-label={option.label} 
            />
          ))}
        </div>
        {error && (
          <div className="flex items-center mt-2 text-red-700 bg-red-50 p-2 rounded max-w-max">
            <Warning size={24} weight="fill" className="mr-2" />
            <p className="text-w">{error}</p>
          </div>
        )}
        <div className="question-button-group items-center">
            <Button 
            size='lg' 
            className="lg-font-size-button" 
            color="teal" 
            onClick={nextStep}
            >OK</Button>
            <span className="text-w text-teal-700" >press Enter ↵</span>
        </div>
      </div>
      <PageNavigations onPrevious={previousStep} onNext={nextStep} />
    </div>
  );
};

export default withEnterKeyHandler(RadioQuestion);
