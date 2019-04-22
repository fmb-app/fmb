import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom'
import FmbContext from '../../context/FmbContext';
import RegularInputField from '../InputFields/RegularInputField';
import ProductContainer from '../ProductContainer/ProductContainer';
import CategoryContainer from '../CategoryContainer/CategoryContainer';
import ExpandableContainer from '../ExpandableContainer/ExpandableContainer';
import FMButton from '../Buttons/FMButton';
import { themes } from '../../themes/Themes';

const style = {
	midSection: {
		height: '75%',
		width: '22rem',
		textAlign: 'left',
		marginTop: themes.mediumSpace,
		padding: themes.mediumSpace,
		backgroundColor: 'rgba(0,0,0, 0.5)',
		borderRadius: themes.standardRadius,
		boxSizing: 'border-box',
		overflowY: 'auto',
		color: themes.standardTextColor,
		display: 'flex',
		flexFlow: 'column nowrap',
		alignContent: 'center'
	},
	search: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
    alignItems: 'center',
    marginTop: themes.largeSpace,
	},
	productHeader: {
		marginTop: themes.standardSpace,
	}
}

const MidSection = () => {
	const context = useContext(FmbContext);

	const [category, setCategory] = useState(null);
	const [categorySearchQuery, setCategorySearchQuery] = useState('');
	const [products, setProducts] = useState([]);
	const [productSearchQuery, setProductSearchQuery] = useState('');

	const findMyBork = () => {
		return (
			fetch(`/api/stores/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					'coords': {
						'lat': context.location.lat,
						'long':  context.location.long
					},
					'productNrs': context.selectedProducts.map(product => product.nr)
				})
			})
				.then((res) => res.json())
				.then((res) => {
					context.setResults(res.stores);
				})
		)
	}

	const onInputChange = (event) => {
		context.setFilterTerm(event.target.value);
		context.setSearchOffset(0);
	}

	const onCategoryChange = (cat) => {
		if (cat === context.selectedCategory) {
			context.setSelectedCategory('');
		} else {
			context.setSelectedCategory(cat);
		}
		context.setSearchOffset(0);
	}

	return (
		<div style={style.midSection}>
			<h2>Sök Produkt</h2>
			<RegularInputField
				type='text'
				placeholder='Sök produkt eller kategori'
				onChange={(event) => onInputChange(event)}
			/>
			<ExpandableContainer
				label='Kategorier'
				labelStyle={{fontSize: '1.17em', fontWeight: 'bold'}}
				hover
			>
				<CategoryContainer
					onCategoryChange={onCategoryChange}
				/>
			</ExpandableContainer>
			<h2 style={style.productHeader}> Produkter </h2>
			<ProductContainer
				filterTerm={productSearchQuery}
				category=''
				priceLow={0}
				priceHigh={Number.MAX_SAFE_INTEGER}
				alcoholLow={0}
				alcoholHigh={Number.MAX_SAFE_INTEGER}
				selectedProducts={false}
			/>
			<div style={style.search}>
			<Link
				to='/results'
				onClick={findMyBork}
				style={{ textDecoration: 'none', width: '100%' }}
			>
				<FMButton
					label='FIND MY BORK!'
					color={themes.standardTextColor}
					bgcolor={themes.primaryButton}
				/>
			</Link>
			</div>
		</div>
	);
}

export default MidSection;
