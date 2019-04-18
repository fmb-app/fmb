import React, { useState, useContext } from 'react';
import FmbContext from '../../context/FmbContext';
import Product from '../Product/Product';
import { themes } from '../../themes/Themes';

const style = {
	scrollContainer: {
		width: '100%',
		height: '50%',
		boxSizing: 'border-box',
		marginTop: themes.standardSpace,
		borderRadius: themes.standardRadius,
		padding: themes.standardSpace,
		backgroundColor: 'rgba(0,0,0,0.5)',
		overflowY: 'auto',
	},
	products: {
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

	const [offset, setOffset] = useState(0);

	/*
	 * Updates the number of products if user has scrolled down to the bottom
	 */
	const handleScroll = async (event) => {
		console.log('Handling Scroll.')
		const lengthScrolled = event.target.scrollHeight - event.target.scrollTop;
		const bottomReached = lengthScrolled === event.target.clientHeight;

		if (bottomReached) {
			console.log('Bottom REACHED!')
			setOffset(offset + 20);
			const results = await fetch(
				`/api/products/${category || 'null'}/${filterTerm || 'null'}/${offset}/${sorting || 'POPULAR_DESC'}` ,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
			const fetchedProducts = await results.json();
			context.setProducts(...context.products, ...fetchedProducts)
		}
	}

	const toggleProduct = (selected) => {
		console.log(context.selectedProducts);
		const productExists = context.selectedProducts.filter((product) => product._id === selected._id).length !== 0;
		console.log(productExists);
		console.log(context.selectedProducts.filter((product) => product._id === selected._id));
		if (productExists) {
			context.removeSelectedProduct(selected);
		} else {
			context.setSelectedProducts(selected);
		}
	}

	const isSelected = (product) => context.selectedProducts.filter((item) => item._id === product._id).length !== 0;

	return (
		<div
			style={style.scrollContainer}
			onScroll={handleScroll}
		>
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
	);
}

export default ProductsContainer;
