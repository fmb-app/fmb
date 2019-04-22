import React from 'react';
import Radium from 'radium';
import { themes } from '../../themes/Themes'

const style = {
	button: {
		height: '3rem',
    maxWidth: '20rem',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'none',
    borderRadius: themes.standardRadius,
    ':hover': {
      cursor: 'pointer',
      background: 'linear-gradient(45deg, #1ccd78 0%, #6da9d8 100%)',
      color: 'rgb(240, 231, 232)'
    }
	}
}

const FMButton = ({ label, bgcolor, color, onClick, disabled }) => {
  return (
    <div style={{display: 'flex', width: '100%'}}>
      <button
        style={[style.button, {...bgcolor, color}]}
        onClick={onClick}
        disabled={disabled}
      >
      	{label}
      </button>
    </div>
  );
}

export default Radium(FMButton);
