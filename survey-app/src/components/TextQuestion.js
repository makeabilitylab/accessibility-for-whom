import React from 'react';
import { Input, Button } from '@material-tailwind/react';
import { Warning } from 'phosphor-react';
import './TextQuestion.css';
import PageNavigations from './PageNavigations';
import withEnterKeyHandler from './withEnterKeyHandler';

const TextQuestion = ({ questionText, inputId, placeholderText, handleChange, previousStep, nextStep, error, isFirstQuestion }) => {
  return (
    <div className="question-container">
      <div className="question-content">
        <h2
        tabIndex={0}
        aria-live="assertive"
        >
          {questionText}
        </h2>
        <div className="question-input-group">
          <Input
            className={`question-input ${error ? 'border-red-500' : 'border-gray-300'}`}
            id={inputId}
            color="teal"
            variant="static"
            type="text"
            placeholder={placeholderText}
            onChange={handleChange(inputId)}
          />
          {error && (
            <div className="flex items-center mt-2 text-red-800 bg-red-50 p-2 rounded max-w-max">
              <Warning size={24} weight="fill" className="mr-2" />
              <p className="text-w">{error}</p>
            </div>
          )}
          <div className="question-button-group items-center">
            <Button size="lg" className="lg-font-size-button" color="teal" onClick={nextStep}>OK</Button>
            <span className="text-w text-teal-700" >press Enter ↵</span>
          </div>
        </div>
        <PageNavigations onPrevious={previousStep} onNext={nextStep} isUpActive={!isFirstQuestion} />
      </div>
    </div>
  );
};

export default withEnterKeyHandler(TextQuestion);
