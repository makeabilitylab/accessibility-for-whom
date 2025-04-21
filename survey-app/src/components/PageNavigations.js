import React from 'react';
import NavigationButton from './NavigationButton';
import './PageNavigations.css';

const PageNavigations = ({ onPrevious, onNext, isDownActive= true , isUpActive = true }) => {
  return (
    <div className="navigation-controls">
      <NavigationButton direction="up" onClick={onPrevious} isActive={isUpActive} />
      <NavigationButton direction="down" onClick={onNext} isActive={isDownActive} />
    </div>
  );
};

export default PageNavigations;

