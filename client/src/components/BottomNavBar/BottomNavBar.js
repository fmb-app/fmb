import React, { useState } from 'react';
import InputField from '../InputFields/RegularInputField'

const style = {
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
  navBar: {
    height: '4rem',
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

const BottomNavBar = (props) => {
  return (
    <div style={style.stickToBottom}>
      <div style={style.navBar}>
        <InputField
          searchTerm={props.searchTerm}
          setInputTerm={props.setSearchTerm}
          placeHolder='Din Plats'
        />
      </div>
    </div>
  );
}

export default BottomNavBar;