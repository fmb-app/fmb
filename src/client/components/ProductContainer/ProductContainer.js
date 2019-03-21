import React from 'react';
import LabelBox from '../LabelBox/LabelBox';
import { themes } from '../../themes/Themes';

const style = {
	productContainer: {
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(255,255,255, 0.1)',
		borderRadius: themes.standardRadius,
	},
	gridContainer: {
		display: 'grid',
		gridTemplateColumns: 'auto auto auto',
		gridGap: '1rem',
		width: '100%',
		padding: themes.standardSpace,
		boxSizing: 'border-box',
	}
}

const ProductContainer = () => {
	return (
		<div style={style.productContainer}>
			<div style={style.gridContainer}>
				<LabelBox label='Albin' />
				<LabelBox label='Albin' />
				<LabelBox label='Albin' />
				<LabelBox label='Albin' />
				<LabelBox label='Albin' />
				<LabelBox label='Albin' />
				<LabelBox label='Albin' />
				<LabelBox label='Albin' />
				<LabelBox label='Albin' />
				<LabelBox label='Albin' />
				<LabelBox label='Albin' />
				<LabelBox label='Albin' />
				<LabelBox label='Albin' />
				<LabelBox label='Albin' />
				<LabelBox label='Albin' />
				<LabelBox label='Albin' />
			</div>
		</div>
	);
}

export default ProductContainer;