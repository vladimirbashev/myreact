import {createContext, useState} from 'react';

export const CurrencyContext = createContext({
	currency: 'usd'
});

export const CurrencyContextProvider = ({ children }) => {
	const [currency, setCurrency] = useState('usd');

	return <CurrencyContext.Provider value={{ currency, setCurrency }}>
		{children}
	</CurrencyContext.Provider>;
};
