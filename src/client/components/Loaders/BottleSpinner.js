import React from 'react';
import Radium from 'radium';
import { themes } from '../../themes/Themes';
import './animation.css';
import bottleSpinner from '../../resources/images/bottleSpinner.svg';

const BottleSpinner = ({style}) => {
  return (
    <img className='container' src={bottleSpinner} />
  );
}

export default Radium(BottleSpinner);