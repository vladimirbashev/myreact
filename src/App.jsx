import {useEffect, useRef, useState} from 'react'
import './App.css'
import ProductsGrid from "./components/ProductsGrid/ProductsGrid.jsx";
import {Box, Button} from "@mui/material";
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
    editProductFormRef.current.focus();
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
      <Box className="app-container">
          <Paper className="left-panel" elevation={3}>
            <h1>Users list</h1>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddNew}
              style={{ marginBottom: 16 }}
            >
              Add user
            </Button>
            <ProductsGrid products={products} onEdit={handleEditClick}/>
          </Paper>

          <Box className="main-panel">
              <h1>Form</h1>
              <EditProductForm ref={editProductFormRef} product={selectedProduct} onSave={handleSave} onCancel={handleCancelEditing}/>
          </Box>
      </Box>
)
}

export default App
