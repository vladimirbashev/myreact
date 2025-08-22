import './ProductsGrid.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from "@mui/material";


function ProductsGrid({products, onEdit }) {

    if (products === null) {
        return <p>Loading...</p>
    }

    return (
      <TableContainer component={Paper}>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.title}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>
                                <Button variant="outlined" onClick={() => onEdit(product)}>Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ProductsGrid;
