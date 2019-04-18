import React, { useContext } from 'react';
import FmbContext from '../../context/FmbContext';
import Product from '../Product/Product';
import { themes } from '../../themes/Themes';

const style = {
	scrollContainer: {
		width: '100%',
		flexBasis: 'auto',
		boxSizing: 'border-box',
		marginTop: themes.standardSpace,
		borderRadius: themes.standardRadius,
		padding: themes.standardSpace,
		backgroundColor: 'rgba(0,0,0,0.5)',
		overflowY: 'auto',
	},
	products: {
		boxShadow: 'inset 0 0 30px 30px #000000',
		width: '100%',
		display: 'grid',
		gridTemplateColumns: '1fr',
		boxSizing: 'border-box',
		gridRowGap: themes.standardSpace,
		justifyContent: 'start',
		gridAutoFlow: 'row'
	}
}

const ProductsContainer = ({filterTerm, category, sorting, selectedProducts}) => {
	const context = useContext(FmbContext);

	/*
	 * Updates the number of products if user has scrolled down to the bottom
	 */
	const handleScroll = async (event) => {
		const lengthScrolled = event.target.clientHeight + event.target.scrollTop;
		const bottomReached = lengthScrolled >= event.target.scrollHeight;

		if (bottomReached) {
			const newOffset = context.searchOffset + 20;
			context.setSearchOffset(newOffset);
		}
	}

	const toggleProduct = (selected) => {
		const productExists = context.selectedProducts.filter((product) => product._id === selected._id).length !== 0;
		productExists
			? context.removeSelectedProduct(selected)
			: context.setSelectedProducts(selected);
	}

	const isSelected = (product) => context.selectedProducts.filter((item) => item._id === product._id).length !== 0;

	return (
		<div
			style={style.scrollContainer}
			onScroll={handleScroll}
		>
			<div style={style.products}>
				{
					selectedProducts
						? context.selectedProducts
							.map((product, key) =>
								<Product
									key={key}
									label={product.name1}
									altLabel={product.name2}
									onClick={() => toggleProduct(product)}
									isSelected={isSelected(product)}
								/>
							)
						: context.products
							.map((product, key) =>
								<Product
									key={key}
									label={product.name1}
									altLabel={product.name2}
									onClick={() => toggleProduct(product)}
									isSelected={isSelected(product)}
								/>
							)
				}
			</div>
		</div>
	);
}

export default ProductsContainer;
