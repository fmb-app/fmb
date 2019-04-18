import React, { useContext, useState } from "react";
import FmbContext from '../../context/FmbContext';
import Product from '../Product/Product';
import ProductContainer from '../ProductContainer/ProductContainer';
import { themes } from '../../themes/Themes';

const style = {
	sidebar: {
    height: '70%',
		width: '22rem',
		textAlign: 'left',
		padding: themes.mediumSpace,
		backgroundColor: 'rgba(0,0,0, 0.5)',
		borderRadius: themes.standardRadius,
		boxSizing: 'border-box',
		overflowY: 'auto',
		color: themes.standardTextColor,
		display: 'flex',
		flexFlow: 'column nowrap',
		alignContent: 'center'
	}
};
const Sidebar = (props) => {
    const context = useContext(FmbContext);
    console.log(context)
    return (
      <div style={style.sidebar}>
        <h3>This is the sidebar</h3>
        <ProductContainer selectedProducts={true}/>
      </div>
    );
}

export default Sidebar;
