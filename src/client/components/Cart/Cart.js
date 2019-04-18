import React, { useContext, useState } from "react";
import FmbContext from '../../context/FmbContext';
import Product from '../Product/Product';
import ProductContainer from '../ProductContainer/ProductContainer';
import { themes } from '../../themes/Themes';

const style = {
	cart: {
    height: '30rem',
	width: '22rem',
	backgroundColor: '#1B1B32',
	display: 'flex',
	flexDirection: 'column',
    overflowY: 'auto',
    borderRadius: themes.standardRadius,
    textAlign: 'center',
    color: themes.standardTextColor,
    padding: themes.standardSpace,
    boxSizing: 'border-box',
    boxShadow: '0 0 5px 5px #000000',
    marginBottom: themes.standardSpace,
	}
};
const Cart = (props) => {
    const context = useContext(FmbContext);
    return (
      <div style={style.cart}>
        <h3>Dina valda produkter</h3>
        <ProductContainer selectedProducts={true}/>
      </div>
    );
}

export default Cart;
