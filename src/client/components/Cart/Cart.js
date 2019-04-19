import React, { useContext } from "react";
import FmbContext from '../../context/FmbContext';
import ProductContainer from '../ProductContainer/ProductContainer';
import { themes } from '../../themes/Themes';
import FMButton from '../Buttons/FMButton';

const style = {
	cart: {
    height: '30rem',
	  width: '22rem',
	  backgroundColor: '#262632',
	  display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'auto',
    borderRadius: themes.standardRadius,
    textAlign: 'center',
    color: themes.standardTextColor,
    padding: themes.standardSpace,
    boxSizing: 'border-box',
    boxShadow: '0 0 5px 5px #000000',
    marginBottom: themes.standardSpace,
  },
  resetButton: {
    display: 'flex',
    width: '10rem',
    padding: '1rem'
  }
};
const Cart = ({toggleCart}) => {
  const context = useContext(FmbContext);
  return (
    <div style={style.cart}>
      <h3>Dina valda produkter</h3>
      <ProductContainer selectedProducts={true}/>
      { 
        context.selectedProducts.length > 0 &&
        <div style={style.resetButton}>
          <FMButton
            label='Rensa produkter'
            color={themes.standardTextColor}
            bgcolor={themes.primaryButton}
            onClick={() => {
              context.resetSelectedProducts();
              toggleCart();
            }}
          />
        </div>
      }
    </div>
  );
}

export default Cart;
