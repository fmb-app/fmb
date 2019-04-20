import React, { useState, useContext } from 'react';
import FmbContext from '../../context/FmbContext';
import Product from '../Product/Product';
import { themes } from '../../themes/Themes';

const style = {
	container: {
		width: '100%',
		boxSizing: 'border-box',
		borderRadius: themes.standardRadius,
		padding: themes.standardSpace,
		backgroundColor: 'rgba(0,0,0,0.3)',
		display: 'grid',
		gridTemplateRows: '1fr',
		boxSizing: 'border-box',
		gridRowGap: themes.standardSpace,
		alignContent: 'start',
	},
	category: {
		padding: themes.standardSpace,
	}
}

const CategoryContainer = ({onCategoryChange}) => {
	const context = useContext(FmbContext);

	const bgColor = (cat) => {
		const isSelected = cat === context.selectedCategory;
		return {
			backgroundColor: isSelected ? '#744253' : '#262632'
		}
	}

	return (
		<div style={style.container}>
			{
				context.categories.sort().map((category, key) => 
					<div
						key={key}
						style={{...style.category, ...bgColor(category)}}
						onClick={() => {onCategoryChange(category)}}
					>
						{category}
					</div>
				)
			}
		</div>
	);
}

export default CategoryContainer;

