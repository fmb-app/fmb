import React, { useState } from 'react';
import Radium from 'radium';
import { themes } from '../../themes/Themes'

const style = {
  inputField: {
    width: '20rem',
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
    boxSizing: 'border-box',
    transition: 'border-color 0.4s ease-out',
    ':focus': {
      borderColor:'#A2D7FF',
    }
  }
}

const RegularInputField = ({type, placeholder, value, searchTerm, setInputTerm}) => {
  const onChange = (e) => {
    setInputTerm(e.target.value)
  }

  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={searchTerm}
        style={style.inputField}
      />
    </div>
  );
}

export default Radium(RegularInputField);