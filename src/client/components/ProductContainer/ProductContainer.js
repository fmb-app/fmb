import React, { useContext } from 'react';
import FmbContext from '../../context/FmbContext';
import Product from '../Product/Product';
import BeerCanIcon from '../Icons/BeerCanIcon';
import BeerBottleIcon from '../Icons/BeerBottleIcon';
import WineBottleIcon from '../Icons/WineBottleIcon';
import ChampagneBottleIcon from '../Icons/ChampagneBottleIcon';
import WhiskeyBottleIcon from '../Icons/WhiskeyBottleIcon';
import CocktailIcon from '../Icons/CocktailIcon';
import { themes } from '../../themes/Themes';

const style = {
	scrollContainer: {
		width: '100%',
		height: '100%',
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

	const getIcon = (cat, pack) => {
		switch (cat) {
			case 'Rött vin':
			case 'Vitt vin':
			case 'Rosévin':
			case 'Cognac':
			case 'Aperitif och dessert':
			case 'Glögg och Glühwein':
			case 'Röda - lägre alkoholhalt':
			case 'Vita - lägre alkoholhalt':
			case 'Rosé - lägre alkoholhalt':
			case 'Blå stilla':
			case 'Vin av flera typer':
				return <WineBottleIcon 
					heigth='20rem'
					width='20rem'
				/>
			case 'Blå mousserande':
			case 'Mousserande vin':
				return <ChampagneBottleIcon
					heigth='20rem'
					width='20rem'
				/>
			case 'Whisky':
			case 'Tequila och Mezcal':
			case 'Akvavit och Kryddat brännvin':
			case 'Rom':
			case 'Gin och Genever':
			case 'Likör':
			case 'Armagnac och Brandy':
			case 'Calvados':
			case 'Vodka och Brännvin':
			case 'Frukt och Druvsprit':
			case 'Anissprit':
			case 'Sake':
			case 'Vermouth':
			case 'Punsch':
			case 'Grappa och Marc':
			case 'Smaksatt sprit':
			case 'Sprit av flera typer':
				return <WhiskeyBottleIcon
					heigth='20rem'
					width='20rem'
				/>
			case 'Drinkar och Cocktails':
				return <CocktailIcon
					heigth='20rem'
					width='20rem'
							/>
			case 'Cider':
			case 'Öl':
				switch(pack) {
					case 'Burk':
						return <BeerCanIcon
							heigth='20rem'
							width='20rem'
						/>
					default:
						return <BeerBottleIcon
							heigth='20rem'
							width='20rem'
						/>
				}
		}
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
									icon={getIcon(product.category, product.package)}
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
									icon={getIcon(product.category, product.package)}
								/>
							)
				}
			</div>
		</div>
	);
}

export default ProductsContainer;
