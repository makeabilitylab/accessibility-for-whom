//DraggableQuestion.js
import React, { useEffect, useState } from 'react';
import { Button, Popover, PopoverHandler, PopoverContent } from '@material-tailwind/react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { DotsSixVertical, Image, Warning } from '@phosphor-icons/react';
import './DraggableQuestion.css';
import PageNavigations from './PageNavigations';
import withEnterKeyHandler from './withEnterKeyHandler';

const DraggableQuestion = ({ questionText, inputId, instructionText, options, handleChange, previousStep, nextStep, error}) => {
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [showNumbers, setShowNumbers] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState({});

  useEffect(() => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    setShuffledOptions(shuffleArray([...options]));
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(shuffledOptions);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setShuffledOptions(newItems);
    handleChange(newItems);
    setShowNumbers(true);
  };

  const handleDropdownChange = (e, currentIndex) => {
    const newOrder = parseInt(e.target.value, 10) - 1;
    const newItems = Array.from(shuffledOptions);
    const [movedItem] = newItems.splice(currentIndex, 1);
    newItems.splice(newOrder, 0, movedItem);
    setShuffledOptions(newItems);
    handleChange(newItems);
    setShowNumbers(true);
  };

  const handlePopoverOpen = (index) => {
    setPopoverOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="question-container">
      <div className="draggable-question-content">
        <h2>{questionText}</h2>
        <p className = "text-instruction text-left mb-8 text-gray-600">{instructionText}</p>
        <div className="draggable-options-and-legend">
          <div className="draggable-legend">
            <div className="legend-labels">
              <span id="difficult">difficult</span>
              <span id="easy">easy</span>
            </div>
            <div className='gradient-line'></div>
          </div> 

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={inputId}>
            {(provided) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef} 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: '12px', 
                }}
              >
                {shuffledOptions.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: 'none',
                          fontSize: '0.8em',
                          padding: '0.1em 0.3em 0.1em 0px',
                          margin: '0 0 0.2em 0',
                          backgroundColor: '#E0F2F1',
                          borderRadius: '0.2em',
                          textAlign: 'left',
                          maxWidth: '80vw', 
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          ...provided.draggableProps.style,
                        }}
                      >
                        <DotsSixVertical weight='bold' style={{ marginRight: '2px', color:"#0d9488"}} />
                        <select 
                            value={showNumbers ? index + 1 : '-'} 
                            onChange={(e) => handleDropdownChange(e, index)}
                            style={{ fontSize: '0.8em', marginRight: '0.2em' }}
                          >
                            {!showNumbers && <option value="-">-</option>} {/* Show placeholder only initially */}
                            {shuffledOptions.map((_, i) => (
                              <option key={i} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                        <span style={{ marginRight: '1em' }}>{item.value}</span> 
                        <Popover placement="right" open={popoverOpen[index]} handler={() => handlePopoverOpen(index)}>
                          <PopoverHandler>
                            <Image 
                              size={'1em'} 
                              weight="bold" 
                              style={{ marginLeft: 'auto', cursor: 'pointer' }} 
                              onClick={() => handlePopoverOpen(index)}
                            />
                          </PopoverHandler>
                          <PopoverContent>
                              <img src={item.image} alt="Option" style={{ width: '25vw', height: 'auto' }} />
                          </PopoverContent>

                        </Popover>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        </div>
        {error && (
            <div className="flex items-center mt-2 text-red-800 bg-red-50 p-2 rounded max-w-max">
              <Warning size={24} weight="fill" className="mr-2" />
              <p className="text-w">{error}</p>
            </div>
           )} 
        <div className="question-button-group items-center">
          <Button size='lg' className="lg-font-size-button" color="teal" onClick={nextStep}>OK</Button>
          <span className="text-w text-teal-700" >press Enter ↵</span>
        </div>
      </div>
      <PageNavigations onPrevious={previousStep} onNext={nextStep} />
    </div>
  );
};

export default withEnterKeyHandler(DraggableQuestion);
