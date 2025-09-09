import {useState} from 'react';
import CurrencyContext from './currency.context.jsx';

const CurrencyContextProvider = ({ children }) => {
  const [currency, setCurrency] = useState('usd');

  return <CurrencyContext.Provider value={{ currency, setCurrency }}>
    {children}
  </CurrencyContext.Provider>;
};


export default CurrencyContextProvider;
