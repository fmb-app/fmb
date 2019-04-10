import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom'
import FmbContext from '../../context/FmbContext';
import RegularInputField from '../InputFields/RegularInputField';
import RegularButton from '../Buttons/RegularButton';
import { themes } from '../../themes/Themes';

const style = {
	midSection: {
		width: '80%',
		height: '70%',
		marginTop: '7rem',
		textAlign: 'left',
		padding: themes.mediumSpace,
		backgroundColor: 'rgba(0,0,0, 0.5)',
		borderRadius: themes.standardRadius,
		boxSizing: 'border-box',
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gridColumnGap: themes.standardSpace,
		overflowY: 'auto',
	},
	instruction: {
		textAlign: 'center',
		color: themes.standardTextColor,
	},
	leftSidePanel: {
		display: 'grid',
		gridRowGap: themes.standardSpace,
		gridTemplateRows: '1fr 1fr',
		boxSizing: 'border-box',
		maxHeigth: '100%',
	},
	results: {
		padding: themes.standardSpace,
		borderRadius: themes.standardRadius,
		background: 'rgba(255,255,255, 0.2)',
		display: 'grid',
		gridTemplateColumns: '1fr',
		gridRowGap: themes.standardSpace,
		alignContent: 'start',
		boxSizing: 'border-box',
		height: '100%',
		overflowY: 'auto',
	},
	selectedDrink: {
		borderRadius: themes.standardRadius,
		backgroundColor: 'yellow',
		height: '2rem',
	}
}

const itemContainerStyle = (isDraggingOver) => ({
	background: 'rgba(255,255,255, 0.2)',
	boxShadow: isDraggingOver ? 'inset 0px 0px 4px rgba(107, 190, 255)' : 'none',
	display: 'grid',
	borderRadius: themes.standardRadius,
	padding: themes.standardSpace,
	gridTemplateColumns: '1fr',
	gridGap: themes.standardSpace,
	alignContent: 'start',
	overflowY: 'auto',
	height: '100%',
	overflowY: 'auto',
	boxSizing: 'border-box',
});

const dropContainerStyle = (isDraggingOver) => ({
	background: 'rgba(255,255,255, 0.2)',
	boxShadow: isDraggingOver ? 'inset 0px 0px 4px rgba(107, 190, 255)' : 'none',
	display: 'grid',
	borderRadius: themes.standardRadius,
	padding: themes.standardSpace,
	alignContent: 'start',
	overflowY: 'auto',
	overflowY: 'auto',
	boxSizing: 'border-box',
});

const MidSection = () => {
	const context = useContext(FmbContext);

	const [category, setCategory] = useState(null);
	const [categorySearchQuery, setCategorySearchQuery] = useState('');
	const [products, setProducts] = useState([]);
	const [productSearchQuery, setProductSearchQuery] = useState('');

	const [selectedProducts, setSelectedProducts] = useState([]);

	useEffect(() => {
		getProducts(category)
			.then(products => {
				setProducts(products);
			});
	}, [category]);
	
	/*
	 * Fetch all products within the given category
	 */
	const getProducts = (category) => {
		return (
			fetch('/api/products/' + category, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}).then((res) => res.json())
		);
	}

	const search = () => {
		console.log('Selected Products:', selectedProducts)
		return (
			fetch(`/api/stores/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					'coords': {
						'lat': '59.3562189', 
						'long':  '18.0683659'
					},
					'productNrs': selectedProducts.map(product => product.nr)
				})
			})
				.then(res => res.json())
				.then(stores => console.log('Stores:', stores.stores))
		)
	}

	return (
		<div style={{...style.midSection, color: 'white', display: 'flex', flexFlow: 'column nowrap'}}>
			<div style={{padding: '0 0 1rem 0'}}>
				<h2>Kategorier</h2>
				<RegularInputField
					type='text'
					placeholder='Sök bland kategorier'
					onChange={(e) => setCategorySearchQuery(e.target.value)}
				/>
				<div style={{maxHeight: '10rem', overflowY: 'auto', maxWidth: '30rem'}}>
					{
						context.categories
							.filter((category) => category.toLowerCase().includes(categorySearchQuery.toLowerCase()))
							.map((category, index) => <div key={`category-${index}`} onClick={() => setCategory(category)}>{category}</div>)
					}	
				</div>
			</div>

			{ category &&
				<div style={{padding: '0 0 1rem 0'}}>
					<h2>{category}</h2>
					<RegularInputField
						type='text'
						placeholder='Sök efter en product'
						onChange={(e) => setProductSearchQuery(e.target.value)}
					/>
					<div style={{maxHeight: '200px', overflowY: 'auto', maxWidth: '30rem'}}>
						{
							products
								.filter(product => `${product.name1} - ${product.name2}`.toLowerCase().includes(productSearchQuery.toLowerCase()))
								.map((product, index) => <div key={`product-${index}`} onClick={() => setSelectedProducts([...selectedProducts, product])}><b>{product.name1}</b> - {product.name2}</div>)
						}
					</div>
				</div>
			}

			{ selectedProducts.length > 0 &&
				<div>
					<h2>Selected Products</h2>
					{
						selectedProducts.map((product, index) => <div key={`selected-product-${index}`} ><b>{product.name1}</b> - {product.name2}</div>)
					}
					<div style={{display: 'flex', justifyContent: 'center'}}>
						<Link
							to={'/results'}
							onClick={search}
							style={{
								width: '100px',
								height: '100px',
								borderRadius: '50%',
								backgroundColor: 'red',
								alignItems: 'center',
								textAlign: 'center',
								display: 'flex',
								fontWeight: '600',
								boxShadow: '8px 8px black',
								margin: '1rem',
								cursor: 'pointer'
							}}
						>
							FIND MY BORK!
						</Link>
					</div>
				</div>
			}

		</div>
	);
}

export default MidSection;

