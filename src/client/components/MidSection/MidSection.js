import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom'
import FmbContext from '../../context/FmbContext';
import RegularInputField from '../InputFields/RegularInputField';
import RegularButton from '../Buttons/RegularButton';
import ProductContainer from '../ProductContainer/ProductContainer';
import Product from '../Product/Product';
import CategoryContainer from '../CategoryContainer/CategoryContainer';
import ExpandableContainer from '../ExpandableContainer/ExpandableContainer';
import RoundButton from '../Buttons/RoundButton';
import { themes } from '../../themes/Themes';

const style = {
	midSection: {
		height: '70%',
		width: '22rem',
		marginTop: '7rem',
		textAlign: 'left',
		padding: themes.mediumSpace,
		backgroundColor: 'rgba(0,0,0, 0.5)',
		borderRadius: themes.standardRadius,
		boxSizing: 'border-box',
		overflowY: 'auto',
		color: themes.standardTextColor,
		display: 'flex',
		flexFlow: 'column nowrap',
	},
	search: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
    alignItems: 'center',
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
						'lat': context.location.data[0], 
						'long':  context.location.data[1]
					},
					'productNrs': context.selectedProducts.map(product => product.nr)
				})
			})
				.then(res => res.json())
				.then((res) => {
					console.log(res.stores);
					context.setResults(res.stores);
				})
		)
	}

	return (
		<div style={style.midSection}>
			<h2>Sök Produkt</h2>
			<RegularInputField
				type='text'
				placeholder='Sök produkt eller kategori'
				onChange={(e) => setProductSearchQuery(e.target.value)}
			/>
			<ExpandableContainer
				label='Kategorier'
			>
				<CategoryContainer />
			</ExpandableContainer>
			<ProductContainer
				filterTerm={productSearchQuery}
				category=''
				priceLow={0}
				priceHigh={Number.MAX_SAFE_INTEGER}
				alcoholLow={0}
				alcoholHigh={Number.MAX_SAFE_INTEGER}
			/>
			<div style={style.search}>
			<Link
				to='/results'
				onClick={findMyBork}
				style={{ textDecoration: 'none' }}
			>
				<RoundButton
					label='FIND MY BORK'
					color={themes.standardTextColor}
					bgcolor={themes.primaryButton}
				/>
			</Link>
			</div>
		</div>
	);
}

export default MidSection;

