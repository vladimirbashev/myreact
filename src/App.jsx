import './App.css'
import ProductsGrid from "./components/ProductsGrid/ProductsGrid.jsx";
import {Button, Link, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import EditProductForm from "./components/EditProductForm/EditProductForm.jsx";
import CurrencyContextProvider from "./contexts/currency/currency.contextProvider.jsx"
import CurrencySelector from "./components/CurrencySelector/CurrencySelector.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
        <Typography variant="h5" gutterBottom>Products list</Typography>
        <Button variant="contained" sx={{ mb: 2 }}>
          <Link to="/product" style={{ color: 'white', textDecoration: 'none' }}>
            Add product
          </Link>
        </Button>
        <ProductsGrid />
      </Paper>
    </>
  },
  {
    path: '/product/:id?',
    element: <>
      <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
        <Typography variant="h6" gutterBottom>Edit Form</Typography>
        <EditProductForm></EditProductForm>
      </Paper>
    </>
  }
]);


function App() {
  return (
    <CurrencyContextProvider>
      <CurrencySelector/>
      <RouterProvider router={router} />
    </CurrencyContextProvider>
)
}

export default App
