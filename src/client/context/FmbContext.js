import React, { createContext } from 'react';

const FmbContext = createContext({
	location: {type: 'Address', data:''},
	drinks: [],
	results: [],
	addDrink: () => {},
	setDrink: drink => {},
	removeDrink: drink => {},
	setLocation: location => {},
	setResults: results => {}
});

export default FmbContext;