export const INITIAL_STATE = {
	isFormValid: { title: true, price: true },
	product: { id: null, title: '', price: '' },
	isFormReadyToSubmit: false
};

export function editFormReducer(state, action) {
	switch(action.type) {
		case 'SET_PRODUCT':
			return { ...INITIAL_STATE, product: { ...action.payload } };
		case 'RESET_VALIDITY':
			return { ...INITIAL_STATE, product: state.product };
		case 'VALIDATE': {
			const titleValidity = !!state.product.title?.trim().length;
			const priceValidity = !isNaN(state.product.price) && state.product.price >= 0;

			const isFormReadyToSubmit = titleValidity && priceValidity;

			return {
				product: isFormReadyToSubmit
					? {
						...state.product,
						title: state.product.title?.trim(),
						price: parseFloat(state.product.price)
					}
					: state.product,
				isFormValid: { title: titleValidity, price: priceValidity },
				isFormReadyToSubmit
			};
		}

		default:
			return state;
	}
}
