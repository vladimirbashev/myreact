import { Paper, TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';

function EditProductForm({ product, onSave, onCancel, }) {
    const [editingProduct, setEditingProduct] = useState({ id: null, title: '', price: '' });

    useEffect(() => {
        if (product) {
          setEditingProduct({ ...product });
        }
    }, [product]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditingProduct({ ...editingProduct, [name]: value });
    };

    const handleCancel = () => {
      onCancel();
    }

    const handleSave = () => {
      if (!editingProduct.title.trim()) {
        alert("Title is required");
        return;
      }
      if (isNaN(editingProduct.price) || editingProduct.price <= 0) {
        alert("Price must be a positive number");
        return;
      }
      onSave({ ...editingProduct, price: parseFloat(editingProduct.price) });
    };

    if (!product) return (
      <Paper style={{ padding: 16, width: 500 }}>
        <p>Select product for edit</p>
      </Paper>
    );

    return (
        <Paper style={{ padding: 16, width: 500 }}>
            <h2>Edit product</h2>
            <TextField
                label="Title"
                name="title"
                value={editingProduct.title}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Price"
                name="price"
                type="number"
                value={editingProduct.price}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 2 }}>
                Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ mr: 2 }}>
                Cancel
            </Button>
        </Paper>
    );
}

export default EditProductForm;
