import {Paper, TextField, Button, Stack, Typography} from '@mui/material';
import {useEffect, useReducer, forwardRef, useContext} from 'react';
import {INITIAL_STATE, editFormReducer} from "./EditProductForm.state.js";
import {CurrencyContext} from "../../context/currency.context.jsx";

const EditProductForm = forwardRef(function EditProductForm({ product, onSave, onCancel }, ref) {
  const { currency } = useContext(CurrencyContext);
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
    <Paper style={{ padding: 16 }}>
      <p>Select product for edit</p>
    </Paper>
  );

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={2}>
        <TextField
          label="Title"
          name="title"
          inputRef={ref}
          value={editedProduct.title}
          onChange={handleChange}
          sx={{ width: 500 }}
          error={!isFormValid.title}
        />
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            label="Price"
            name="price"
            type="number"
            value={editedProduct.price}
            onChange={handleChange}
            sx={{ width: 150 }}
            error={!isFormValid.price}
          />
          <Typography>{currency}</Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
});

export default EditProductForm;
