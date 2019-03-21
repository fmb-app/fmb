import React, { createContext } from 'react';

const FmbContext = createContext({
	location: '',
	drinks: [],
	addDrink: () => {},
	setDrink: drink => {},
	removeDrink: drink => {},
	setLocation: location => {},
	search: location => {}
});

export default FmbContext;