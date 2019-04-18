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
    borderRadius: themes.standardRadius
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
