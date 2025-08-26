import { Paper, TextField, Button } from '@mui/material';
import {useState, useEffect, useReducer, forwardRef} from 'react';
import {INITIAL_STATE, editFormValidatorReducer} from "./EditProductForm.state.js";

const EditProductForm = forwardRef(({ product, onSave, onCancel }, ref) => {
  const [editingProduct, setEditingProduct] = useState({ id: null, title: '', price: '' });
  const [validatorState, dispatchFormValidator] = useReducer(editFormValidatorReducer, INITIAL_STATE);
  const { isFormValid, isFormReadyToSubmit, validatedProduct } = validatorState;

  useEffect(() => {
    dispatchFormValidator({ type: 'RESET_VALIDITY' });
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

  useEffect(() => {
    const submit = async () => {
      if (isFormReadyToSubmit) {
        await onSave(validatedProduct)
        // dispatchFormValidator({ type: 'RESET_VALIDITY' });
      }
    }

    submit();
  }, [isFormReadyToSubmit]);

  const handleSave = () => {
    dispatchFormValidator({ type: 'VALIDATE', payload: {product: editingProduct} })
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
        inputRef={ref}
        value={editingProduct.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!isFormValid.title}
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={editingProduct.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!isFormValid.price}
      />
      <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 2 }}>
        Save
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ mr: 2 }}>
        Cancel
      </Button>
    </Paper>
  );
});

export default EditProductForm;
