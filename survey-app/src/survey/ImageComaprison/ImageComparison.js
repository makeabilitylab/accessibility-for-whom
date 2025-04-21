// ImageComparison.js
import React, { useState, useEffect } from 'react';
import { Tooltip } from "@material-tailwind/react";
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import PageNavigations from '../../components/PageNavigations';
import ResponseButtons from '../../components/ResponseButtons';
import ImageComponent from '../../components/ImageComponent';
import './ImageComparison.css';

const ImageComparison = ({ stepNumber, answers, nextStep, previousStep, images, onSelectionComplete, comparisonContext, onComplete }) => {
    const [currentPair, setCurrentPair] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [maxComparisons, setMaxComparisons] = useState(0);
    const [hoverButton, setHoverButton] = useState(null);
    const [selectionState, setSelectionState] = useState([]);

    const mobilityAid = answers.mobilityAid.toLowerCase();

    useEffect(() => {
        const n = images.length;
        const calculatedComparisons = (n * (n - 1)) / 2;
        setMaxComparisons(calculatedComparisons);
        displayImages();
    }, [images]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'ArrowLeft') {
                selectLeftImage();
            } else if (event.key === 'ArrowRight') {
                selectRightImage();
            } else if (event.key === 'ArrowDown') {
                recordEqualSelection();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [currentPair]);

    const handleMouseEnter = (button) => {
        setHoverButton(button);
    };

    const handleMouseLeave = () => {
        setHoverButton(null);
    };

    const getRandomImagePair = () => {
        if (!images || images.length < 2) {
            return [];
        }
        let attempts = 0;
        let pair;
        do {
            pair = [images[Math.floor(Math.random() * images.length)], images[Math.floor(Math.random() * images.length)]];
            attempts++;
            if (attempts > 100) {
                break;
            }
        } while (
            pair[0].LabelID === pair[1].LabelID ||
            history.some(h =>
                (h[0].LabelID === pair[0].LabelID && h[1].LabelID === pair[1].LabelID) ||
                (h[0].LabelID === pair[1].LabelID && h[1].LabelID === pair[0].LabelID))
        );

        return pair;
    };

    const renderComparisonDots = () => {
        let dots = [];
        for (let i = 0; i < maxComparisons; i++) {
            dots.push(
                <span
                    key={i}
                    style={{
                        height: '0.3em',
                        width: '0.3em',
                        borderRadius: '50%',
                        margin: '0.2em',
                        backgroundColor: i < historyIndex ? '#0d9488' : '#D8DEE9',
                    }}
                ></span>
            );
        }
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
                {dots}
            </div>
        );
    };

    const displayImages = () => {
        // console.log("Displaying new images");
        setLoading(true);
        let nextPair;
        if (historyIndex + 1 < history.length) {
            nextPair = history[historyIndex + 1];
            setHistoryIndex(historyIndex + 1);
            // console.log("Displaying next pair from history:", nextPair);
        } else {
            nextPair = getRandomImagePair();
            if (nextPair.length > 0) {
                const newHistory = [...history, nextPair];
                setHistory(newHistory);
                setHistoryIndex(newHistory.length - 1);
                setSelectionState([...selectionState, false]); // Add a new entry for the new pair
                // console.log("Generated and displaying new random pair:", nextPair);
            }
        }
        setCurrentPair(nextPair);
        setLoading(false);
    };

    const updateSelectionAndDisplayNext = (selectedImage, comparisonResult = {}) => {
        setSelectedImage(selectedImage);
        onSelectionComplete({ ...comparisonResult, comparisonContext });
        setSelectionState(prevState => {
            const newState = [...prevState];
            newState[historyIndex] = true;
            // console.log('Updated selectionState:', newState);
            return newState;
        });
        if (historyIndex + 1 >= maxComparisons) {
            onComplete();
        } else {
            displayImages();
        }
    };

    const selectImage = (index) => {
        // console.log('Image selected:', index);
        const selected = currentPair[index - 1];
        updateSelectionAndDisplayNext(selected, {
            image1LabelID: currentPair[0].LabelID,
            image1City: currentPair[0].City,
            image2LabelID: currentPair[1].LabelID,
            image2City: currentPair[1].City,
            selectedImageLabelID: selected.LabelID,
            selectedImageCity: selected.City,
        });
        // console.log('Image1:', currentPair[0].LabelID);
        // console.log('Image2:', currentPair[1].LabelID,);
        // console.log('Image selected:', selected.LabelID);

        setSelectionState(prevState => {
            const newState = [...prevState];
            newState[historyIndex] = true;
            // console.log('Updated selectionState:', newState);
            return newState;
        });
    };

    const selectLeftImage = () => {
        if (currentPair.length === 2) {
            selectImage(1);
        }
    };

    const selectRightImage = () => {
        if (currentPair.length === 2) {
            selectImage(2);
        }
    };

    const recordEqualSelection = () => {
        if (currentPair.length === 2) {
            updateSelectionAndDisplayNext(null, {
                image1LabelID: currentPair[0].LabelID,
                image1City: currentPair[0].City,
                image2LabelID: currentPair[1].LabelID,
                image2City: currentPair[1].City,
                selection: 'equal',
            });

            setSelectionState(prevState => {
                const newState = [...prevState];
                newState[historyIndex] = true;
                return newState;
            });
        }
    };

    const handlePreviousClick = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setCurrentPair(history[historyIndex - 1]);
        }
    };

    const handleNextClick = () => {
        if (historyIndex < history.length - 1 || historyIndex < maxComparisons - 1) {
            if (historyIndex < history.length - 1) {
                setHistoryIndex(historyIndex + 1);
                setCurrentPair(history[historyIndex + 1]);
            } else if (selectionState[historyIndex]) {
                displayImages();
            }
        }
    };

    const renderDotsAndNavigation = () => {
        const activeColor = '#0d9488'; // teal
        const disabledColor = '#D8DEE9'; //grey

        const isLeftArrowEnabled = historyIndex > 0;
        const isRightArrowEnabled = (historyIndex < history.length - 1 || historyIndex < maxComparisons - 1) && selectionState[historyIndex];

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.2em', padding: '0.1em 0' }}>
                <Tooltip content="prev pair">
                    <CaretLeft
                        size={'1em'}
                        weight='bold'
                        onClick={isLeftArrowEnabled ? handlePreviousClick : null}
                        style={{
                            cursor: isLeftArrowEnabled ? 'pointer' : 'not-allowed',
                            color: isLeftArrowEnabled ? activeColor : disabledColor
                        }}
                    />
                </Tooltip>
                {renderComparisonDots()}
                <Tooltip content="next pair">
                <CaretRight
                    size={'1em'}
                    weight='bold'
                    onClick={isRightArrowEnabled ? handleNextClick : null}
                    style={{
                        cursor: isRightArrowEnabled ? 'pointer' : 'not-allowed',
                        color: isRightArrowEnabled ? activeColor : disabledColor
                    }}
                />
                </Tooltip>
            </div>
        );
    };

    return (
        <div className="question-container">
            <div className="image-comparison-content">
                <h2
                    tabIndex="0"
                    aria-live="assertive"
                >{`${stepNumber}. When using your `}<strong>{mobilityAid}</strong>{`, which one do you feel more confident in passing?`}</h2>
                <p className="text-instruction text-center mb-4 text-gray-600">If not confident in passing either, please select 'the same'.</p>
                <div className="image-comparison-and-buttons"> 
                <div className="comparison-twin">
                    {currentPair.map((imageData, index) => (
                        <div
                            className={`comparison-image-wrapper ${hoverButton === (index === 0 ? 'left' : 'right') ? 'border-teal-400 glow-shadow' : ''}`}
                            key={imageData.LabelID}
                            style={{ borderWidth: hoverButton === (index === 0 ? 'left' : 'right') ? '0.2em' : '0.2em' }}
                            onClick={() => selectImage(index + 1)}
                        >
                            <ImageComponent cropMetadata={imageData} />
                        </div>
                    ))}
                </div>
                {renderDotsAndNavigation()}
                <ResponseButtons
                    gap="0.4em"
                    disabled={loading}
                    buttons={[
                        {
                            text: 'Left Image',
                            shortcut: '←',
                            onClick: selectLeftImage,
                            onMouseEnter: () => handleMouseEnter('left'),
                            onMouseLeave: handleMouseLeave,
                        },
                        {
                            text: 'The Same',
                            shortcut: '↓',
                            onClick: recordEqualSelection,
                            onMouseEnter: () => handleMouseEnter('equal'),
                            onMouseLeave: handleMouseLeave,
                            variant: 'outlined',
                        },
                        {
                            text: 'Right Image',
                            shortcut: '→',
                            onClick: selectRightImage,
                            onMouseEnter: () => handleMouseEnter('right'),
                            onMouseLeave: handleMouseLeave,
                        },
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

export default ImageComparison;
