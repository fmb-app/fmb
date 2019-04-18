export const SET_LOCATION 	 		     = 'SET_LOCATION';
export const SET_RESULTS  	 		     = 'SET_RESULTS';
export const SET_PRODUCTS  	         = 'SET_PRODUCTS';
export const SET_SELECTED_PRODUCTS   = 'SET_SELECTED_PRODUCTS';
export const REMOVE_SELECTED_PRODUCT = 'REMOVE_SELECTED_PRODUCT';
export const SET_CATEGORIES  	       = 'SET_CATEGORIES';
export const SET_SELECTED_CATEGORY   = 'SET_SELECTED_CATEGORY';
export const SET_SEARCH_OFFSET       = 'SET_SEARCH_OFFSET';
export const SET_SORTING   				   = 'SET_SORTING';
export const SET_FILTER_TERM         = 'SET_FILTER_TERM';
export const FETCH_PRODUCTS          = 'FETCH_PRODUCTS';

const setProducts = (products, state) => {
	return {...state, products: products};
}

const setSelectedProducts = (product, state) => {
	const currentProducts = state.selectedProducts;
	return {...state, selectedProducts: [...currentProducts, product]};
}

const removeSelectedProduct = (product, state) => {
	const updated = state.selectedProducts.filter((item) => item._id !== product._id);
	return {...state, selectedProducts: updated};
}

const setCategories = (categories, state) => {
	return {...state, categories: categories};
}

const setSelectedCategory = (category, state) => {
	console.log(category)
	return {...state, selectedCategory: category};
}

const setResults = (results, state) => {
	return {...state, results: results};
}

const setLocation = (coordinates, state) => {
	return {...state, location: coordinates};
}

const setSearchOffset = (offset, state) => {
	return {...state, searchOffset: offset};
}

const setSorting = (sorting, state) => {
	return {...state, sorting: sorting};
}

const setFilterTerm = (term, state) => {
	return {...state, filterTerm: term};
}

export const fmbReducer = (state, action) => {
	switch (action.type) {
		case SET_PRODUCTS:
			return setProducts(action.products, state);
		case SET_SELECTED_PRODUCTS:
			return setSelectedProducts(action.product, state);
		case REMOVE_SELECTED_PRODUCT:
			return removeSelectedProduct(action.product, state);
		case SET_CATEGORIES:
			return setCategories(action.categories, state);
		case SET_SELECTED_CATEGORY:
			return setSelectedCategory(action.category, state);
		case SET_RESULTS:
			return setResults(action.results, state);
		case SET_LOCATION:
			return setLocation(action.location, state);
		case SET_SEARCH_OFFSET:
			return setSearchOffset(action.offset, state);
		case SET_SORTING:
			return setSorting(action.sorting, state);
		case SET_FILTER_TERM:
			return setFilterTerm(action.term, state);
		case FETCH_PRODUCTS:
			return fetchProducts(action.offset, state);
		default:
			return state;
	}
};
