import './ProductsGrid.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import {fetchProducts} from "../../api/products/products.js";
import {useNavigate} from "react-router-dom";


function ProductsGrid() {
    const navigate = useNavigate();
    const [products, setProducts] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const f = async () => {
            try {
                setIsLoading(true);
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error during loading data:', error);
                setError('Cannot load data.');
            } finally {
                setIsLoading(false);
            }
        };

        f();
    }, []);

    if (error) {
        return <p>{error}</p>
    }

    if (isLoading) {
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
                                <Button variant="outlined" onClick={() => navigate(`/product/${product.id}`)}>Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ProductsGrid;
