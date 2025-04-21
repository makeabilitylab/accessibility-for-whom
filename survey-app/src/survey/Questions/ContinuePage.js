import React, { useState } from 'react';
import RadioQuestion from '../../components/RadioQuestion';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../config';

const COLLECTION_NAME = 'surveyAnswers0727';
// const COLLECTION_NAME = 'surveyAnswersTesting';

const ContinuePage = ({ answers, handleMobilityAidChange, previousStep, yesStep, nextStep, setContinueUrl, logData}) => {
  const [localContinueUrl, setLocalContinueUrl] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const answeredMobilityAids = answers.answeredMobilityAids || [];
  const remainingOptions = (answers.mobilityAidOptions?.mobilityAidOptions || []).filter(option =>
    option !== answers.mobilityAid && !answeredMobilityAids.includes(option)
  );
  const mobilityAid = answers.mobilityAid.toLowerCase();

  const continueOptions = [
    {
      value: "yes",
      label: "Yes, I would like to rate them now"
    },
    {
      value: "later",
      label: "Yes, but I would like to rate them later"
    },
    {
      value: "no",
      label: "No"
    }
  ];

  // const continueAnswer = selectedOption;
  // updateAnswers('continueAnswer', continueAnswer);

  const handleOptionChange = (event) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);
  };

  const handleNextStep = async () => {
    if (selectedOption === "yes") {
      logData();
      yesStep();
      handleMobilityAidChange(remainingOptions[0]);
    } else if (selectedOption === "later") {
      answers.answeredMobilityAids.push(answers.mobilityAid);
      try {
        const docRef = await addDoc(collection(firestore, COLLECTION_NAME), {
          ...answers,
          logType: "continue",
          timestamp: serverTimestamp()
        });

        const resumeUrl = `${window.location.origin}/#/resume-survey/${docRef.id}`;
        setLocalContinueUrl(resumeUrl);
        setContinueUrl(resumeUrl);
      } catch (error) {
        console.error("Error saving document: ", error);
      }
      nextStep();
    } else {
      setLocalContinueUrl('');
      setContinueUrl('');
      nextStep();
    }
  };

  const remainingOptionsString = remainingOptions.join(', ').toLowerCase();
  
  return (
    <div>
      <RadioQuestion
        questionText={<span>Thank you for completing questions regarding <strong>{mobilityAid}</strong>. Would you also like to answer questions for when you use your <strong>{remainingOptionsString}</strong>?</span>}
        inputId="continueOptions"
        instructionText="Select one option"
        options={continueOptions}
        handleChange={handleOptionChange}
        previousStep={previousStep}
        nextStep={handleNextStep}
        error=""
      />
    </div>
  );
};

export default ContinuePage;
