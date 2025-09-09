import {useContext } from "react";
import ToggleSelector from "../ToggleSelector/Toggle.jsx";
import CurrencyContext from "../../contexts/currency/currency.context.jsx";


export default function CurrencySelector() {
  const {currency, setCurrency} = useContext(CurrencyContext);
  return (
    <ToggleSelector
      value={currency}
      options={[
        { value: 'usd', label: 'USD' },
        { value: 'pln', label: 'PLN' },
      ]}
      onChange={(value) => setCurrency(value)}
    />
  );
}
