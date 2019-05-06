import React, {useContext, useState} from 'react';
import FmbContext from '../../context/FmbContext';
import RegularButton from '../Buttons/RegularButton';
import CartIcon from '../Icons/CartIcon';
import MapIcon from '../Icons/MapIcon';
import Cart from '../Cart/Cart';
import { themes } from '../../themes/Themes';
import Map from '../Map/Map';


const style = {
  stickToBottom: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-start',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 999
  },
  navBar: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    justifyContent: 'center',
    padding: themes.standardSpace,
    boxSizing: 'border-box',
    height: '46px'
  },
  popup: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    backgroundColor: '#e01a8a',
    color: '#ffffff',
    borderRadius: '7px',
    fontSize: '1rem',
    bottom: '2.5rem',
    right: '-0.3rem',
    padding: '0.1rem 0.3rem',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    marginLeft: '1rem'
  }
}

const ButtonLabel = ({icon, label}) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      textTransform: 'uppercase',
      fontSize: '0.6rem'
    }}>
      {label}
      <div style={{marginLeft: '0.4rem'}}>
        {icon}
      </div>
    </div>
  )
}

const BottomNavBar = (props) => {
  const context = useContext(FmbContext);
  const [showMap, setShowMap]   = useState(false);
  const [showCart, setShowCart] = useState(false);

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
        { showMap && <Map toggleMap={toggleMap} />}
        { showCart && <Cart toggleCart={toggleCart} /> }
      </div>
      <div style={style.navBar}>
        <RegularButton
          label={<ButtonLabel label='Ange startplats' icon={<MapIcon color='white' width='20px'/>} />}
          bgcolor={themes.primaryButton}
          color={themes.standardTextColor}
          onClick={toggleMap}
        />
        <div style={style.mapContainer}>
          <RegularButton
            label={<ButtonLabel label='Valda produkter' icon={<CartIcon color='white' width='20px' />} />}
            bgcolor={themes.primaryButton}
            color={themes.standardTextColor}
            onClick={toggleCart}
          />
          { context.selectedProducts.length > 0 &&
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
              <div style={style.badge}>
                {context.selectedProducts.length}
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

  export default BottomNavBar;
