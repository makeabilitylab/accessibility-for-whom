import React from 'react';
import { Textarea, Button } from '@material-tailwind/react';
import PageNavigations from './PageNavigations';
import withEnterKeyHandler from './withEnterKeyHandler';

const TextAreaQuestion = ({ questionText, inputId, placeholderText, handleChange, previousStep, nextStep, error }) => {
  const textareaStyle = {
    border: "0.1em solid #e2e8f0",
    boxShadow: "none",
    minHeight: "30vh", 
    width: "100%", 
    padding: "0.625em", 
    fontSize: "1em" 
  };

  const focusStyle = {
    border: "0.3rem solid #26a69a",
  };

  return (
    <div className="question-container">
      <div className="question-content">
        <h2
          tabIndex="0"
          aria-live="assertive"
        >{questionText}</h2>
        <div className="question-input-group">
          <Textarea
            id={inputId}
            color="teal"
            variant="outlined"
            type="text"
            placeholder={placeholderText}
            onChange={handleChange(inputId)}
            style={textareaStyle}
            onFocus={e => Object.assign(e.target.style, focusStyle)}
            onBlur={e => Object.assign(e.target.style, textareaStyle)}
          />
          <div className="question-button-group items-center">
            <Button size="lg" className="lg-font-size-button" color="teal" onClick={nextStep}>OK</Button>
            <span className="text-w text-teal-700">press Enter ↵</span>
          </div>
        </div>
        <PageNavigations onPrevious={previousStep} onNext={nextStep} />
      </div>
    </div>
  );
};

export default withEnterKeyHandler(TextAreaQuestion);
