import React from 'react';
import Radium from 'radium';
import { themes } from '../../themes/Themes'

const style = {
  button: {
    height: '2rem',
    width: '3rem',
    borderStyle: 'none',
    borderWidth: '0px',
    borderRadius: themes.standardRadius,
    paddingLeft: themes.mediumSpace,
    paddingRight: themes.mediumSpace,
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ':disabled': {
      background: 'linear-gradient(45deg, #6F6F6F 0%, #B0B0B0 100%)'
    }
  },
}

const RegularButton = ({ label, bgcolor, color, onClick, disabled, badge }) => {
  return (
    <div>
      <button
        style={[style.button, {...bgcolor, color}]}
        onClick={onClick}
        disabled={disabled}
      >
      {badge !== undefined && badge}
      {label}
      </button>
    </div>
  );
}

export default Radium(RegularButton);
