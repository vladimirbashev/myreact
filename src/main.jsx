import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {createBrowserRouter, Link, RouterProvider} from "react-router-dom";
import Paper from "@mui/material/Paper";
import {Button, Typography} from "@mui/material";
import ProductsGrid from "./components/ProductsGrid/ProductsGrid.jsx";
import EditProductForm from "./components/EditProductForm/EditProductForm.jsx";
import Layout from "./components/Layout/Layout.jsx";
import {fetchProductById} from "./api/products/products.js";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
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
        </>,
        loader: async ({ params }) => {
          if (!params.id) {
            return { id: null, title: '', price: '' };
          }
          return await fetchProductById(params.id);
        }
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
