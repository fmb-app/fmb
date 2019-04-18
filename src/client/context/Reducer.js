export const SET_LOCATION 	 		     = 'SET_LOCATION';
export const SET_RESULTS  	 		     = 'SET_RESULTS';
export const SET_PRODUCTS  	         = 'SET_PRODUCTS';
export const SET_SELECTED_PRODUCTS   = 'SET_SELECTED_PRODUCTS';
export const REMOVE_SELECTED_PRODUCT = 'REMOVE_SELECTED_PRODUCT';
export const SET_CATEGORIES  	       = 'SET_CATEGORIES';
export const REMOVE_CATEGORY  	     = 'REMOVE_CATEGORY';

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

const removeCategory = (category, state) => {
	const updatedCategories = state.categories.filter((item, intex) => item.type !== category);
	return {...state, category: updatedCategories};
}

const setResults = (results, state) => {
	return {...state, results: results};
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
		case REMOVE_CATEGORY:
			return removeCategory(action.category, state);
		case SET_RESULTS:
			return setResults(action.results, state);
		default:
			return state;
	}
};
