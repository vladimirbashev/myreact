export const INITIAL_STATE = {
	isFormValid: { title: true, price: true },
	validatedProduct: undefined,
	isFormReadyToSubmit: false
};

export function editFormValidatorReducer(state, action) {
	switch(action.type) {
		case 'RESET_VALIDITY':
			return { ...INITIAL_STATE };

		case 'VALIDATE': {
			const product = action.payload.product;

			const titleValidity = !!product.title?.trim().length;
			const priceValidity = !isNaN(product.price) && product.price >= 0;

			const isFormReadyToSubmit = titleValidity && priceValidity;

			return {
				validatedProduct: isFormReadyToSubmit
					? {
						// ...product,
						title: product.title?.trim(),
						price: parseFloat(product.price)
					}
					: undefined,
				isFormValid: { title: titleValidity, price: priceValidity },
				isFormReadyToSubmit
			};
		}

		default:
			return state;
	}
}
