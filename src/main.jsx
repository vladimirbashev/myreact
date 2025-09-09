import {lazy, StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {createBrowserRouter, Link, RouterProvider} from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import {fetchProductById} from "./api/products/products.js";
import { Error as ErropPage } from './pages/Error/Error.jsx';
import Products from "./pages/ProductsPage/Products.jsx";

const Product = lazy(() => import('./pages/ProductPage/Product'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        errorElement: <ErropPage />,
        element: <Products></Products>
      },
      {
        path: '/product/:id?',
        errorElement: <ErropPage />,
        // element: <Product></Product>,
        element: <Suspense fallback={<>Loading...</>}><Product /></Suspense>,
        loader: async ({ params }) => {
          if (!params.id) {
            return { id: null, title: '', price: '' };
          }
          return await fetchProductById(params.id);
        }
      },
      {
        path: '*',
        element: <ErropPage />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
