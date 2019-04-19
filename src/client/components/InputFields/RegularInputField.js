import React from 'react';
import Radium from 'radium';
import { themes } from '../../themes/Themes'

const style = {
  inputField: {
    width: '100%',
    maxWidth: '20rem',
    minHeight: '2.5rem',
    padding: '1rem',
    margin: '0.3rem 0',
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
      value={value}
    />
  );
}

export default Radium(RegularInputField);