// withEnterKeyHandler.js
import React, { useEffect } from 'react';

const withEnterKeyHandler = (WrappedComponent) => {
  return (props) => {
    const { nextStep } = props;
    
    useEffect(() => {
      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          nextStep();
        }
      };

      document.addEventListener('keydown', handleKeyPress);

      // Clean up the event listener on component unmount
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }, [nextStep]);

    return <WrappedComponent {...props} />;
  };
};

export default withEnterKeyHandler;


