import {Button, Paper, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid.jsx";

export default  function Products() {
	return (
		<Paper elevation={3} sx={{ p: 2, height: "100%" }}>
			<Typography variant="h5" gutterBottom>Products list</Typography>
			<Button variant="contained" sx={{ mb: 2 }}>
				<Link to="/product" style={{ color: 'white', textDecoration: 'none' }}>
					Add product
				</Link>
			</Button>
			<ProductsGrid />
		</Paper>
	);
}
