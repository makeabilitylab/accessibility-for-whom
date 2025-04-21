import React from 'react';

const ButtonGroup = ({ gap, children }) => {
  return (
    <div className="button-group" style={{ justifyContent: "center", display: 'flex', gap: gap }}>
      {children}
    </div>
  );
};

export default ButtonGroup;
