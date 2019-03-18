import React from 'react';
import Radium from 'radium';
import { themes } from '../../themes/Themes'

const style = {
  inputField: {
    width: '100%',
    maxWidth: '20rem',
    height: '2rem',
    padding: '0rem 1rem',
    color: themes.standardTextColor,
    fontSize: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderStyle: 'none',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderColor: '#3B6D96',
    borderRadius: themes.standardRadius,
    transition: 'border-color 0.4s ease-out',
    boxSizing: 'border-box',
    ':focus': {
      borderColor:'#A2D7FF',
    }
  },
}

const RegularInputField = ({type, label, placeholder, value, onChange}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      style={style.inputField}
    />
  );
}

export default Radium(RegularInputField);