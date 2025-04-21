import React, { useState, useEffect } from 'react';
import { Button } from "@material-tailwind/react";
import './EndingPage.css';

const EndingPage = ({ previousStep, onSubmit, continueUrl, onEmailLink }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSubmit();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);


  return (
    <div className="ending-page-container">
      <div className="ending-page-image-container">
        <img 
          src={`${process.env.PUBLIC_URL}/img/access-score.png`} 
            alt="Example of an access score map" 
            className="w-full h-full" 
        />
      </div>
      <div className="ending-page-right-container">
      <div className="ending-page-text-container">
        <h2>
          {continueUrl ? 'Thank you for completing this section of the survey!' : 'Thank you for completing this survey!'}
          </h2>
        {!continueUrl && (
          <p className="text-left" style={{ fontSize: '1em', lineHeight: '1.3' }}>
            Your responses will be used to inform <b>personalized routing</b> algorithms and maps for <b>people who use mobility devices.</b>
          </p>
        )}
        {continueUrl && (
          <div className="text-left" style={{ fontSize: '0.8em', lineHeight: '1.3' }}>
            <p>You can resume your survey later using the following link:</p>
            <a target="_blank" href={continueUrl} className="text-cyan-800 underline">{continueUrl}</a>
          </div>
        )}
        <div className="flex flex-row items-start gap-4">
          {continueUrl && (
            <Button
              className='lg-font-size-button'
              color="teal"
              variant="outlined"
              size="lg"
              onClick={onEmailLink}
            >
              Email Me the Link
            </Button>
          )}
            {!continueUrl && (
            <Button
              className='lg-font-size-button'
              color="teal"
              variant="outlined"
              size="lg"
              onClick={previousStep}
            >
              Go Back
            </Button>
          )}
          <Button
            className='lg-font-size-button'
            color="teal"
            size="lg"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </div>
      <div className='ending-page-contact-info'>
            <p>For any questions or concerns, please contact:</p>
            <p className="text-cyan-800 underline">
              <a href="mailto:chuchuli@cs.uw.edu">chuchuli@cs.uw.edu</a>.
            </p>
      </div>
      </div>
    </div>
  );
};

export default EndingPage;
