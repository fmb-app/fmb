import React, { createContext } from 'react';

const FmbContext = createContext({
	location: '',
	drinks: [],
	results: [],
	addDrink: () => {},
	setDrink: drink => {},
	removeDrink: drink => {},
	setLocation: location => {},
	setResults: results => {}
});

export default FmbContext;