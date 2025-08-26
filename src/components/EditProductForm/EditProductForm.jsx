import { Paper, TextField, Button } from '@mui/material';
import {useEffect, useReducer, forwardRef} from 'react';
import {INITIAL_STATE, editFormReducer} from "./EditProductForm.state.js";

const EditProductForm = forwardRef(function EditProductForm({ product, onSave, onCancel }, ref) {
  const [editFormState, dispatchEditFormState] = useReducer(editFormReducer, INITIAL_STATE);
  const { isFormValid, isFormReadyToSubmit, product: editedProduct } = editFormState;

  useEffect(() => {
    if (product) {
      dispatchEditFormState({ type: 'SET_PRODUCT', payload: product });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatchEditFormState({ type: 'SET_PRODUCT', payload: { ...editedProduct, [name]: value} });
  };

  const handleCancel = () => {
    onCancel();
  }

  useEffect(() => {
    const submit = async () => {
      if (isFormReadyToSubmit) {
        await onSave(editedProduct)
      }
    }

    submit();
  }, [isFormReadyToSubmit]);

  const handleSave = () => {
    dispatchEditFormState({ type: 'VALIDATE' })
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
        value={editedProduct.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!isFormValid.title}
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={editedProduct.price}
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
