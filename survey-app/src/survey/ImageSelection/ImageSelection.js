import React, { useState, useEffect } from 'react';
import { Tooltip } from "@material-tailwind/react";
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import PageNavigations from '../../components/PageNavigations';
import ResponseButtons from '../../components/ResponseButtons';
import ImageComponent from '../../components/ImageComponent';
import './ImageSelection.css';

const ImageSelection = ({ stepNumber, answers, nextStep, previousStep, images, onComplete, currentStep, IMAGE_STEP }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [responses, setResponses] = useState(Array(images.length).fill(null));
    const [selectionMade, setSelectionMade] = useState(false);
    const [loading, setLoading] = useState(true); // track image loading status
    const mobilityAid = answers.mobilityAid.toLowerCase();

    useEffect(() => {
        if (currentIndex > images.length - 1) {
            // Form groups based on responses when the survey is complete
            const groupAImages = images.filter((_, index) => responses[index] === 'yes' || responses[index] === 'unsure');
            const groupBImages = images.filter((_, index) => responses[index] === 'no' || responses[index] === 'unsure');
            // console.log('Group A Images:', groupAImages);
            // console.log('Group B Images:', groupBImages);
            onComplete({ groupAImages, groupBImages });
        }
    }, [currentIndex, responses, images, onComplete]);

    useEffect(() => {
        setSelectionMade(responses[currentIndex] !== null);
    }, [currentIndex, responses]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'n') {
                handleResponse('no');
            } else if (event.key === 'u') {
                handleResponse('unsure');
            } else if (event.key === 'y') {
                handleResponse('yes');
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [currentIndex]);

    const handleResponse = (response) => {
        if (currentIndex >= images.length) {
            // console.log("All images have been processed.");
            return;
        }

        const updatedResponses = [...responses];
        updatedResponses[currentIndex] = response;
        setResponses(updatedResponses);
        setSelectionMade(true);

        // const currentImage = images[currentIndex];
        // console.log(`Image ${currentIndex + 1} LabelID ${currentImage.LabelID}: ${response}`);

        // Move to the next image
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // Proceed to the next step if this is the last image
            setCurrentIndex(currentIndex + 1); // Increment to trigger useEffect for onComplete
        }
    };

    const handlePreviousClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (currentIndex < images.length - 1 && selectionMade && !loading) {
            setCurrentIndex(currentIndex + 1);
            setSelectionMade(responses[currentIndex + 1] !== null);
        }
    };

    const renderDotsAndNavigation = () => {
        const activeColor = '#0d9488'; // Teal color
        const disabledColor = '#D8DEE9'; // Grey color
    
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2em', padding: '0.1em 0' }}>
                <Tooltip content="prev image">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.1em' }}>
                        <CaretLeft
                            size={'1em'}
                            weight='bold'
                            onClick={handlePreviousClick}
                            style={{
                                cursor: currentIndex > 0 ? 'pointer' : 'not-allowed',
                                color: currentIndex > 0 ? activeColor : disabledColor
                            }}
                        />
                    </div>
                </Tooltip>
                
                {images.map((_, index) => (
                    <span
                        key={index}
                        style={{
                            height: '0.3em',
                            width: '0.3em',
                            borderRadius: '50%',
                            margin: '0.1em',
                            backgroundColor: currentIndex >= index ? activeColor : disabledColor,
                        }}
                    ></span>
                ))}
                
                <Tooltip content="next image">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.1em' }}>
                        <CaretRight
                            size={'1em'}
                            weight='bold'
                            onClick={handleNextClick}
                            style={{
                                cursor: (currentIndex < images.length - 1 && selectionMade && !loading) ? 'pointer' : 'not-allowed',
                                color: (currentIndex < images.length - 1 && selectionMade && !loading) ? activeColor : disabledColor
                            }}
                        />
                    </div>
                </Tooltip>
            </div>
        );
    };

    return (
        <div className="question-container">
            <div className="image-selection-content">
                <h2 className="text-left p-5 rounded mb-4"
                    tabIndex="0"
                    aria-live="assertive"
                >{`${stepNumber}. When using your `}<strong>{mobilityAid}</strong>{`, do you feel confident in passing this?`}</h2>

                <div className="image-and-selection-buttons">
                    {currentIndex < images.length ? (
                        <div className="selection-image-wrapper">
                            <ImageComponent
                                cropMetadata={images[currentIndex]}
                                isFirstImage={currentIndex === 0}
                                isFirstGroup={currentStep === IMAGE_STEP}
                                onLoad={() => setLoading(false)} // Set loading to false when image loads
                                onError={() => setLoading(false)} // Handle error case
                            />
                        </div>
                    ) : (
                        <div>Loading next part of the survey...</div>
                    )}
                    {renderDotsAndNavigation()}
                    <ResponseButtons
                        gap="0.4em"
                        buttons={[
                            { text: 'No', shortcut: 'N', onClick: () => handleResponse('no'), disabled: loading },
                            { text: 'Unsure', shortcut: 'U', onClick: () => handleResponse('unsure'), variant: 'outlined', disabled: loading },
                            { text: 'Yes', shortcut: 'Y', onClick: () => handleResponse('yes'), disabled: loading }
                        ]}
                    />
                </div>
            </div>
            <PageNavigations
                onPrevious={previousStep}
                onNext={nextStep}
                isDownActive={false}
            />
        </div>
    );
};

export default ImageSelection;
