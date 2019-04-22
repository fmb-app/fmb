import React, { useContext } from 'react';
import FmbContext from '../../context/FmbContext';
import { themes } from '../../themes/Themes';
import Radium from 'radium';

const style = {
	container: {
		width: '100%',
		boxSizing: 'border-box',
		borderRadius: themes.standardRadius,
		padding: themes.standardSpace,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		display: 'grid',
		gridTemplateRows: '1fr',
		boxSizing: 'border-box',
		gridRowGap: themes.standardSpace,
		alignContent: 'start',
	},
	category: (isSelected) => {
		return {
			padding: themes.standardSpace,
			backgroundColor: isSelected ? '#744253' : '#262632',
			':hover': {
				backgroundColor: isSelected ? '#845263' : '#363642',
				cursor: 'pointer'
			}
		}
	}
}

const Category = ({category, changeCategory, selectedCategory}) => {
	return (
		<div
			style={style.category(category === selectedCategory)}
			onClick={changeCategory}
		>
			{category}
		</div>
	)
}

const CategoryWithStyling = Radium(Category)

const CategoryContainer = ({onCategoryChange}) => {
	const context = useContext(FmbContext);

	return (
		<div style={style.container}>
			{
				context.categories.sort().map((category, key) => 
					<CategoryWithStyling
						key={key}
						changeCategory={() => { onCategoryChange(category)}}
						category={category}
						selectedCategory={context.selectedCategory}
					/>
				)
			}
		</div>
	);
}

export default CategoryContainer;

