import React from 'react';
import { Button } from '@material-tailwind/react';
import { CaretRight, CaretLeft } from 'phosphor-react';

const LRButton = ({ direction, onClick, style = {} }) => {
  const isLeft = direction === 'left';
  const Icon = isLeft ? CaretLeft : CaretRight;

  return (
    <Button
      className="rounded-full"
      color="teal"
      size= "sm"
      variant="text"
      onClick={onClick}
      style={{
        aspectRatio: '1 / 1',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        ...style, // Spread additional styles if any
      }}
    >
      <Icon size={24} weight="bold" />
    </Button>
  );
};

export default LRButton;
