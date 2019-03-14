import React, { useState } from 'react';

const style = {
  inputField: {
    width: '20rem',
    height: '2rem',
    padding: '0rem 1rem',
    color: '#FAFAFA',
    fontSize: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderStyle: 'none',
    borderBottom: '2px solid #3B6D96',
    borderRadius: '2px',
  }
}

const RegularInputField = ({type, placeHolder, value, searchTerm, setInputTerm}) => {
  const onChange = (e) => {
    setInputTerm(e.target.value)
  }

  return (
    <div>
      <input
        type={type}
        placeHolder={placeHolder}
        onChange={onChange}
        value={searchTerm}
        style={style.inputField}
      />
    </div>
  );
}

export default RegularInputField;