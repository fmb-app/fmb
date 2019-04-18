import React, {useContext, useState} from 'react';
import FmbContext from '../../context/FmbContext';
import RegularButton from '../Buttons/RegularButton';
import GPSIcon from '../Icons/GPSIcon';
import CartIcon from '../Icons/CartIcon';
import MapIcon from '../Icons/MapIcon';
import Cart from '../Cart/Cart';
import { themes } from '../../themes/Themes';
import Map from '../Map/Map';


const style = {
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
  navBar: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto',
    gridColumnGap: themes.standardSpace,
    justifyContent: 'center',
    alignItems: 'center',
    padding: themes.standardSpace,
    boxSizing: 'border-box',
  },
  popup: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}

const BottomNavBar = (props) => {
  const context = useContext(FmbContext);
  const [showMap, setShowMap]   = useState(false);
  const [showCart, setShowCart] = useState(false);

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
        context.setResults(data.results);
    });
  }


    const toggleMap = () => {
      setShowCart(false);
      setShowMap(!showMap);
    }

    const toggleCart = () => {
      setShowMap(false);
      setShowCart(!showCart);
    }

    return (
      <div style={style.stickToBottom}>
        <div style={style.popup}>
          { showMap && <Map/>}
          { showCart && <Cart/> }
        </div>
        <div style={style.navBar}>
          <RegularButton
            label={<GPSIcon color='white' width='100%' />}
            bgcolor={themes.primaryButton}
            onClick={getCoordinates}
          />
          <RegularButton
            label={<MapIcon color='white' width='100%' />}
            bgcolor={themes.primaryButton}
            color={themes.standardTextColor}
            onClick={toggleMap}
          />
          <RegularButton
            label={<CartIcon color='white' width='100%' />}
            bgcolor={themes.primaryButton}
            color={themes.standardTextColor}
            onClick={toggleCart}
          />
        </div>
      </div>
    );
  }

  export default BottomNavBar;
