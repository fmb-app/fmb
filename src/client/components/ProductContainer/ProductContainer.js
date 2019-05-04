import React, { useContext } from 'react';
import FmbContext from '../../context/FmbContext';
import Product from '../Product/Product';
import BeerCanIcon from '../Icons/BeerCanIcon';
import BeerBottleIcon from '../Icons/BeerBottleIcon';
import WineBottleIcon from '../Icons/WineBottleIcon';
import ChampagneBottleIcon from '../Icons/ChampagneBottleIcon';
import WhiskeyBottleIcon from '../Icons/WhiskeyBottleIcon';
import CocktailIcon from '../Icons/CocktailIcon';
import BottleSpinner from '../Loaders/BottleSpinner'
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
		overflowY: 'scroll',
		display: 'flex',
		justifyContent: 'center',
	},
	products: {
		boxShadow: 'inset 0 0 30px 30px #000000',
		width: '100%',
		display: 'grid',
		gridTemplateColumns: '1fr',
		boxSizing: 'border-box',
		gridRowGap: themes.standardSpace,
		justifyContent: 'start',
		gridAutoFlow: 'row',
		flexBasis: '100%',
	},
	loadingSpinner: {
		position: 'fixed',
		paddingTop: '4rem',
	},
}

const ProductsContainer = ({products, handleScroll}) => {
	const context = useContext(FmbContext);

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
					height='27px'
					width='19px'
				/>
			case 'Blå mousserande':
			case 'Mousserande vin':
				return <ChampagneBottleIcon
					height='19px'
					width='19px'
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
					height='25px'
					width='19px'
				/>
			case 'Drinkar och Cocktails':
				return <CocktailIcon
					height='19px'
					width='19px'
							/>
			case 'Cider':
			case 'Öl':
				switch(pack) {
					case 'Burk':
						return <BeerCanIcon
							height='23px'
							width='19px'
						/>
					default:
						return <BeerBottleIcon
							height='29px'
							width='19px'
						/>
				}
		}
	}

	const isSelected = (product) => context.selectedProducts.filter((item) => item._id === product._id).length !== 0;

	const isLoading = () => context.status.product.type === 'LOADING';

	const displayProperty = () => isLoading() ? style.loading : {};

	return (
		<div
			style={style.scrollContainer}
			onScroll={handleScroll}
		>
			<div style={style.loadingSpinner}>
				{
					isLoading() &&
					<BottleSpinner
						style={style.bottle}
					/>
				}
			</div>
			<div style={style.products}>
				{
					products
						.map((product, key) =>
							<Product
								key={key}
								label={product.name1}
								altLabel={product.name2}
								onClick={() => toggleProduct(product)}
								isSelected={isSelected(product)}
								icon={getIcon(product.category, product.package)}
								volume={product.volume}
							/>
						)
				}
			</div>
		</div>
	);
}

export default ProductsContainer;
