import React, {useContext, useEffect} from 'react';
import {geolocated} from 'react-geolocated';
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

  const handleClick = () => {
    const long = '59.3489405';
    const lat = '18.0688579';
    fetch('/api/stores/' + long + "/" + lat , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
      }).then((res) => {
        return res.json();
      }).then((data) => {
        console.log(data);
        context.setResults(data.results);
    });
  }
  return (
    <div style={style.stickToBottom}>
      <div style={style.navBar}>
        {/*<InputField
          searchTerm={props.searchTerm}
          setInputTerm={props.setSearchTerm}
          onChange={context.setLocation}
          placeholder='Din Plats'
        />
      */}
        <RegularButton
          label='Sök'
          bgcolor={themes.primaryButton}
          color={themes.standardTextColor}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 10000,
})(BottomNavBar);