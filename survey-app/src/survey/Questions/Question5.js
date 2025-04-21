import React from 'react';
import TextAreaQuestion from '../../components/TextAreaQuestion'; 

const Question5 = ({ stepNumber, nextStep, previousStep, answers, handleChange, singleMobilityAid }) => {
  const answeredMobilityAids = answers.answeredMobilityAids || [];
  const remainingOptions = (answers.mobilityAidOptions && answers.mobilityAidOptions.mobilityAidOptions) || [];
  // let mobilityAid = '';
  const mobilityAid = answers.mobilityAid.toLowerCase();

  return (
    <TextAreaQuestion
      questionText={<span>{stepNumber}. When using your <strong>{mobilityAid}</strong>, what are the most difficult sidewalk barriers that you encounter?</span>}
      inputId="sidewalkBarriers"
      placeholderText="For example, missing curb ramps, poles..."
      handleChange={handleChange}
      previousStep={previousStep}
      nextStep={nextStep}
    />
  );
};

export default Question5;
