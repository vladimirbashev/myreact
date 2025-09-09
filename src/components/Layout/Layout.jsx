import CurrencyContextProvider from '../../contexts/currency/currency.contextProvider.jsx';
import CurrencySelector from "../CurrencySelector/CurrencySelector.jsx";
import {Outlet} from "react-router-dom";

export default function Layout() {

  return (
    <CurrencyContextProvider>
      <CurrencySelector/>
      <Outlet />
    </CurrencyContextProvider>
  );
}
