import React from 'react';
import cocktailIcon from '../../resources/images/icons8-cocktail-filled-100.png';

const CocktailIcon = ({height, width, color}) => {
	return (
		<img
			src={cocktailIcon}
			alt='Cocktail'
			heigth={height}
			width={width}
		/>
	);
}

export default CocktailIcon;