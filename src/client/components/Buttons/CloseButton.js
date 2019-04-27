import React from 'react';
import Radium from 'radium';
import CloseIcon from '../Icons/CloseIcon';

const buttonStyle = {
  transition: 'color .2s ease-in-out',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxSizing: 'border-box',
  borderRadius: '50%',
  position: 'relative',
  backgroundImage: 'radial-gradient(rgba(25, 25, 25, 0.3) 15%, rgba(0, 0, 0, 0.2) )',
  width: '2rem',
  height: '2rem',
  ':hover': {
    backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.5) 15%, rgba(0, 0, 0, 0.2) )',
    cursor: 'pointer'
  }
};

const CloseButton = ({onClick, style}) => {
	return (
		<div style={style}>
      <div style={buttonStyle}>
        <CloseIcon
          width='1.5rem'
          height='1.5rem'
          onClick={onClick}
        />
      </div>
		</div>
	);
}

export default Radium(CloseButton);