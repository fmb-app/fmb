import React, {useContext, useEffect} from 'react';
import FmbContext from '../../context/FmbContext';
import InputField from '../InputFields/RegularInputField'
import RegularButton from '../Buttons/RegularButton'
import { themes } from '../../themes/Themes'

const style = {
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
  navBar: {
    height: '4rem',
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: themes.standardSpace,
    paddingRight: themes.standardSpace,
    boxSizing: 'border-box',
  }
}

const BottomNavBar = (props) => {
  const context = useContext(FmbContext);

  return (
    <div style={style.stickToBottom}>
      <div style={style.navBar}>
        <InputField
          searchTerm={props.searchTerm}
          setInputTerm={props.setSearchTerm}
          onChange={context.setLocation}
          placeholder='Din Plats'
        />
        <RegularButton
          label='Sök'
          bgcolor={themes.primaryButton}
          color={themes.standardTextColor}
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

export default BottomNavBar;