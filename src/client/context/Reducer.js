/*
 * Enumerations describing actions
 */
export const ADD_DRINK    = 'ADD_DRINK';
export const SET_DRINK		= 'SET_DRINK';
export const REMOVE_DRINK = 'REMOVE_DRINK';
export const SET_LOCATION = 'SET_LOCATION';
export const SET_RESULTS  = 'SET_RESULTS';

const addDrink = state => {
	const len    				= state.drinks.length;
	const newKey 				= state.drinks[len-1].key + 1;
	const updatedDrinks = [...state.drinks, {name: '', key: newKey}];

	return {...state, drinks: updatedDrinks};
};

const setDrink = (affectedKey, name, state) => {
	const newName = name;
	const updateDrinks = state.drinks.map((elem) => elem.key === affectedKey ? ({name: newName, key: affectedKey}) : (elem));
	return {...state, drinks: updateDrinks};
};

const removeDrink = (key, state) => {
	const updatedDrinks = state.drinks.filter((elem) => elem.key !== key);
	return {...state, drinks: updatedDrinks};
};

const setLocation = (location, state) => {
	return {...state, location: location};
}

const setResults = (results, state) => {
	return {...state, results: results};
}

export const fmbReducer = (state, action) => {
	switch (action.type) {
		case ADD_DRINK:
			return addDrink(state);
		case SET_DRINK:
			return setDrink(action.key, action.drink, state);
		case REMOVE_DRINK:
			return removeDrink(action.key, state);
		case SET_LOCATION:
			return setLocation(action.location, state);
		case SET_RESULTS:
			return setResults(action.results, state);
		default:
			return state;
	}
};
