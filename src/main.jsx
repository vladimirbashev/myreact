import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Paper from "@mui/material/Paper";
import {Button, Link, Typography} from "@mui/material";
import ProductsGrid from "./components/ProductsGrid/ProductsGrid.jsx";
import EditProductForm from "./components/EditProductForm/EditProductForm.jsx";
import Layout from "./components/Layout/Layout.jsx";

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
        </>
      }
    ]
  }
]);

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <>
//       <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
//         <Typography variant="h5" gutterBottom>Products list</Typography>
//         <Button variant="contained" sx={{ mb: 2 }}>
//           <Link to="/product" style={{ color: 'white', textDecoration: 'none' }}>
//             Add product
//           </Link>
//         </Button>
//         <ProductsGrid />
//       </Paper>
//     </>
//   },
//   {
//     path: '/product/:id?',
//     element: <>
//       <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
//         <Typography variant="h6" gutterBottom>Edit Form</Typography>
//         <EditProductForm></EditProductForm>
//       </Paper>
//     </>
//   }
// ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
