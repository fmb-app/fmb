import React, { useState, useContext } from 'react';
import FmbContext from '../../context/FmbContext';
import Product from '../Product/Product';
import { themes } from '../../themes/Themes';

const style = {
	container: {
		width: '100%',
		height: '50%',
		boxSizing: 'border-box',
		marginTop: themes.standardSpace,
		borderRadius: themes.standardRadius,
		padding: themes.standardSpace,
		backgroundColor: 'rgba(0,0,0,0.5)',
		overflowY: 'auto',
		display: 'grid',
		gridTemplateRows: '1fr',
		boxSizing: 'border-box',
		gridRowGap: themes.standardSpace,
		alignContent: 'start',
	}
}

const ProductsContainer = ({filterTerm, category, priceLow, priceHigh, alcoholLow, alcoholHigh, selectedProducts}) => {
	const context = useContext(FmbContext);

	const [numberOfProducts, setNumberOfProducts] = useState(20);

	const increaseProducts = () => {
		setNumberOfProducts(numberOfProducts + 20);
	}

	/*
	 * Updates the number of products if user has scrolled down to the bottom
	 */
	const handleScroll = (event) => {
		const lengthScrolled = event.target.scrollHeight - event.target.scrollTop;
		const bottomReached = lengthScrolled === event.target.clientHeight;

		if (bottomReached) {
			increaseProducts();
		}
	}

	const filterOnCategories = (list) => {
		return category === '' ? list : list.filter((item) => item.category === category);
	}

	const filterOnPrice = (list) => {
		const priceIsNotSet = (priceLow === 0 && priceHigh === Number.MAX_SAFE_INTEGER);
		return priceIsNotSet ? list : list.filter((item) => priceLow < item.price && priceHigh > item.price);
	}

	const filterOnAlcohol = (list) => {
		const alcoholIsNotSet = (alcoholLow === 0 && alcoholHigh === Number.MAX_SAFE_INTEGER);
		return alcoholIsNotSet ? list : list.filter((item) => alcoholLow < item.alcohol && alcoholHigh > item.alcohol);
	}

	const infoToString = (info) => (info === null ? '' : info)

	const filterOnTerm = (list) => {
		if (filterTerm === '') {
			return list;
		}

		return list.filter((item) => {
			const info = infoToString(item.name1).toLowerCase() 	 + ' ' +
							 	   infoToString(item.name2).toLowerCase() 	 + ' ' +
								   infoToString(item.category).toLowerCase();

			return info.includes(filterTerm.toLowerCase());
		});
	}

	const getProductList = () => {
		return filterOnTerm(
			filterOnAlcohol(
				filterOnPrice(
					filterOnCategories(context.products)
				)
			)
		);
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
			style={style.container}
			onScroll={handleScroll}
		>
			{
				selectedProducts
				? context.selectedProducts.map((product, key) =>
					<Product
					key={key}
					label={product.name1}
					altLabel={product.name2}
					onClick={() => toggleProduct(product)}
					isSelected={isSelected(product)}
					/>
				)
				: getProductList()
						.slice(0,numberOfProducts)
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
