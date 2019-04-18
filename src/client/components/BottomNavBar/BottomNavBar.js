import React, {useContext, useState} from 'react';
import FmbContext from '../../context/FmbContext';
import InputField from '../InputFields/RegularInputField'
import RegularButton from '../Buttons/RegularButton';
import GPSIcon from '../Icons/GPSIcon';
import { themes } from '../../themes/Themes';
import Map from '../Map/Map';


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
    gridTemplateColumns: 'auto auto auto auto',
    gridColumnGap: themes.standardSpace,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: themes.standardSpace,
    paddingRight: themes.standardSpace,
    boxSizing: 'border-box',
  },
  map: {
    height: '20rem',
  }
}

const BottomNavBar = (props) => {
  const context = useContext(FmbContext);
  const [showMap, setShowMap] = useState(false);

  const getCoordinates = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      context.setCoordinates({lat: position.coords.latitude, long: position.coords.longitude});
    });
  }

  const getFieldValue = () => context.location.lat + ' ' + context.location.long;

  const getStores = () => {
    const lat = context.location.lat;
    const long  = context.location.long;
    fetch('/api/stores/' + lat + "/" + long , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
      }).then((res) => {
        return res.json();
      }).then((data) => {
        console.log(data.results)
        context.setResults(data.results);
    });
  }


    const toggleMap = () => {
      setShowMap(!showMap);
    }
    return (
      <div style={style.stickToBottom}>
      { showMap && <Map/>}
        <div style={style.navBar}>
        <RegularButton
          label={<GPSIcon color='white' width='100%' />}
          bgcolor={themes.primaryButton}
          onClick={getCoordinates}
        />
        <InputField
            searchTerm={props.searchTerm}
            setInputTerm={props.setSearchTerm}
            placeholder='Adress'
            value={getFieldValue()}
          />
          <RegularButton
            label='Sök'
            bgcolor={themes.primaryButton}
            color={themes.standardTextColor}
            onClick={getStores}
          />
          <RegularButton
            label='Karta'
            bgcolor={themes.primaryButton}
            color={themes.standardTextColor}
            onClick={toggleMap}
          />
        </div>
      </div>
    );
  }

  export default BottomNavBar;
