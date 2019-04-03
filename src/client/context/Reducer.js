export const SET_SELECTED_DRINKS = 'SET_SELECTED_DRINKS';
export const SET_LOCATION 	 		 = 'SET_LOCATION';
export const SET_RESULTS  	 		 = 'SET_RESULTS';
export const SET_CATEGORIES  	   = 'SET_CATEGORIES';
export const REMOVE_CATEGORY  	 = 'REMOVE_CATEGORY';

const setCategories = (categories, state) => {
	console.log(categories);
	return {...state, categories: categories};
}

const setSelectedDrinks = (drink, state) => {
	const oldDrinks = state.selectedDrinks;
	console.log([...oldDrinks, drink]);
	return {...state, selectedDrinks: [...oldDrinks, drink]};
}

const removeCategory = (category, state) => {
	const updatedCategories = state.categories.filter((item, intex) => item.type !== category);
	return {...state, category: updatedCategories};
}

const setLocation = (location, state) => {
	return {...state, location: location};
}

const setResults = (results, state) => {
	return {...state, results: results};
}

export const fmbReducer = (state, action) => {
	switch (action.type) {
		case SET_CATEGORIES:
			return setCategories(action.categories, state);
		case SET_SELECTED_DRINKS:
			return setSelectedDrinks(action.drink, state);
		case REMOVE_CATEGORY:
			return removeCategory(action.category, state);
		case SET_LOCATION:
			return setLocation(action.location, state);
		case SET_RESULTS:
			return setResults(action.results, state);
		default:
			return state;
	}
};
