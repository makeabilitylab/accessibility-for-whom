import React from 'react';
import { Button, Tooltip } from '@material-tailwind/react';
import { CaretUp, CaretDown } from 'phosphor-react';

const NavigationButton = ({ direction, onClick, isActive = true, style = {} }) => {
  const isUp = direction === 'up';
  const Icon = isUp ? CaretUp : CaretDown;
  const tooltipContent = isUp ? "prev question" : "next question";

  return (
    <Tooltip content={tooltipContent} placement="top">
      <div>
        <Button
          color="teal"
          variant="text"
          size='lg'
          onClick={isActive ? onClick : null}
          disabled={!isActive}
          style={{
            borderRadius: 0,
            padding: '0.5em',
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isActive ? '#e0f2f1' : '#e2e8f0',
            color: isActive ? '#4db6ac' : '#64748b',
            cursor: isActive ? 'pointer' : 'not-allowed',
            ...style,
          }}
        >
          <Icon size={'2rem'} weight="bold" />
        </Button>
      </div>
    </Tooltip>
  );
};

export default NavigationButton;
