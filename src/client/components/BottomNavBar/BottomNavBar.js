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
  },
  badge: {
    backgroundColor: '#e01a8a',
    borderRadius: '7px',
    fontSize: '0.9rem',
    marginLeft: '2.5rem',
    marginBottom: '1rem',
    padding: '0.1rem 0.3rem',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
        { showCart && <Cart toggleCart={toggleCart} /> }
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
          badge={
            context.selectedProducts.length == 0
            ? null
            : <div style={style.badge}>
            {context.selectedProducts.length}
            </div>}
        />
      </div>
    </div>
  );
}

  export default BottomNavBar;
