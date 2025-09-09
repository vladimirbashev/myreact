import {Paper, Typography} from "@mui/material";
import EditProductForm from "../../components/EditProductForm/EditProductForm.jsx";

export default  function Product() {
	return (
		<Paper elevation={3} sx={{ p: 2, height: "100%" }}>
			<Typography variant="h6" gutterBottom>Edit Form</Typography>
			<EditProductForm></EditProductForm>
		</Paper>
	);
}
