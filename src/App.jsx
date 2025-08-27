import {useEffect, useRef, useState} from 'react'
import './App.css'
import ProductsGrid from "./components/ProductsGrid/ProductsGrid.jsx";
import {Box, Button, Grid, Typography} from "@mui/material";
import Paper from "@mui/material/Paper";
import EditProductForm from "./components/EditProductForm/EditProductForm.jsx";
import {addProduct, fetchProducts, updateProduct} from "./api/products/products.js";


function App() {
  const [products, setProducts] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null);
  const editProductFormRef = useRef();

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    if (editProductFormRef.current) {
      editProductFormRef.current.focus();
    }
  };

  const handleSave = async (product) => {
    let error = false;
    if (product.id === null) {
      const newProduct = await addProduct(product);
      error = newProduct.status === 'error';
      if (!error) {
        setProducts((prev) => [...prev, newProduct]);
      }
    } else {
      const updated = await updateProduct(product);
      error = updated.status === 'error';
      if (!error) {
        setProducts((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
      }
    }

    if (!error) {
      setSelectedProduct(null);
    }

    return error;
  };

  const handleCancelEditing = () => {
      setSelectedProduct(null);
  }

  const handleAddNew = () => {
    setSelectedProduct({ id: null, title: '', price: '' });
  };

  return (
    <Grid container spacing={2}>
      <Grid size={5}>
        <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
          <Typography variant="h5" gutterBottom>Products list</Typography>
          <Button variant="contained" onClick={handleAddNew} sx={{ mb: 2 }}>
            Add product
          </Button>
          <ProductsGrid products={products} onEdit={handleEditClick} />
        </Paper>
      </Grid>

      <Grid size={7}>
        <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
          <Typography variant="h6" gutterBottom>Form</Typography>
          <EditProductForm
            ref={editProductFormRef}
            product={selectedProduct}
            onSave={handleSave}
            onCancel={handleCancelEditing}
          />
        </Paper>
      </Grid>
    </Grid>
)
}

export default App
