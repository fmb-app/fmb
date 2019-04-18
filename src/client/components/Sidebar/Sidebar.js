import React, { useContext, useState } from "react";
import FmbContext from '../../context/FmbContext';
import Product from '../Product/Product';
import ProductContainer from '../ProductContainer/ProductContainer';

const Sidebar = (props) => {
    const context = useContext(FmbContext);
    console.log(context)
    return (
      <div>
        <h3>This is the sidebar</h3>
        <ProductContainer selectedProducts={true}/>
      </div>
    );
}

export default Sidebar;
