import {Paper, TextField, Button, Stack, Typography} from '@mui/material';
import {useEffect, useReducer, useContext} from 'react';
import {INITIAL_STATE, editFormReducer} from "./EditProductForm.state.js";
import {CurrencyContext} from "../../context/currency.context.jsx";
import {addProduct, fetchProductById, updateProduct} from "../../api/products/products.js";
import {useNavigate, useParams} from "react-router-dom";

function EditProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currency } = useContext(CurrencyContext);
  const [editFormState, dispatchEditFormState] = useReducer(editFormReducer, INITIAL_STATE);
  const { isFormValid, isFormReadyToSubmit, product } = editFormState;

  useEffect(() => {
    if (id) {
      fetchProductById(id).then((product) => {
        dispatchEditFormState({ type: 'SET_PRODUCT', payload: product });
      });
    } else {
      dispatchEditFormState({ type: 'SET_PRODUCT', payload: { id: null, title: '', price: '' } });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatchEditFormState({ type: 'SET_PRODUCT', payload: { ...product, [name]: value} });
  };

  const handleCancel = () => {
    navigate('/');
  }

  const update = async (product) => {
    let error = false;
    if (product.id === null) {
      const added = await addProduct(product);
      error = added.status === 'error';
      if (!error) {
        navigate('/');
      }
    } else {
      const updated = await updateProduct(product);
      error = updated.status === 'error';
      if (!error) {
        navigate('/');
      }
    }

    return error;
  };

  useEffect(() => {
    const submit = async () => {
      if (isFormReadyToSubmit) {
        await update(product)
      }
    }

    submit();
  }, [isFormReadyToSubmit]);

  const handleSave = () => {
    dispatchEditFormState({ type: 'VALIDATE' })
  };

  if (product === null) {
    return <p>Loading...</p>
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={2}>
        <TextField
          label="Title"
          name="title"
          value={product.title}
          onChange={handleChange}
          sx={{ width: 500 }}
          error={!isFormValid.title}
        />
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            label="Price"
            name="price"
            type="number"
            value={product.price}
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
};

export default EditProductForm;
