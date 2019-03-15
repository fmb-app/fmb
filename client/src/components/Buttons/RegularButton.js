import React, { useState } from 'react';
import Radium from 'radium';
import { themes } from '../../themes/Themes'

const style = {
  button: {
    marginLeft: themes.standardSpace,
    height: '2rem',
    borderStyle: 'none',
    borderWidth: '0px',
    borderRadius: themes.standardRadius,
    backgroundPosition: 'center',
    
    ':hover': {
      boxShadow: 'inset 0 0 4px #D2ECFF',
    },
    ':active': {
      boxShadow: 'inset 0 0 4px #363D42',
    }
  },
}

const RegularButton = ({ label, bgcolor, color }) => {
  return (
    <div>
      <button style={[style.button, {...bgcolor, color: color}]}>
      	{label}
      </button>
    </div>
  );
}

export default Radium(RegularButton);