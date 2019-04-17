import React from 'react';
import Radium from 'radium';
import { themes } from '../../themes/Themes'

const style = {
	button: {
		borderRadius: '50%',
		height: '4rem',
		width: '4rem',
		boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F33A3E',
    borderStyle: 'none',
	}
}

const RoundButton = ({ label, bgcolor, color, onClick, disabled }) => {
  return (
    <div>
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

export default Radium(RoundButton);
