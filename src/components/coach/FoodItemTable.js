import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, Paper, TextField, Button, Container, Divider, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';

export default function FoodItemTable() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchField, setSearchField] = useState('name');
    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);

    const fetchData = async () => {
        const response = await axios.get('YOUR_BACKEND_API_ENDPOINT', {
            params: {
                search: searchQuery,
                searchField: searchField,
                sort: orderBy,
                order: order,
                page: page + 1,
                limit: rowsPerPage,
            },
        });
        setData(response.data.items);
        setTotalRows(response.data.total);
    };

    // useEffect(() => {
    //     fetchData();
    // }, [order, orderBy, page, rowsPerPage]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = () => {
        setPage(0);
        fetchData();
    };

    const handleSearchFieldChange = (event) => {
        setSearchField(event.target.value);
    };

    return (
        <Container id="clients" sx={{ py: { xs: 8, sm: 4 } }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <FormControl sx={{ mb: 2, mt: 2, minWidth: 120 }}>
                    <InputLabel id="search-field-label">Search By</InputLabel>
                    <Select
                        labelId="search-field-label"
                        id="search-field"
                        value={searchField}
                        label="Search By"
                        onChange={handleSearchFieldChange}
                    >
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="calories">Calories</MenuItem>
                        <MenuItem value="fat">Fat</MenuItem>
                        <MenuItem value="carbs">Carbs</MenuItem>
                        <MenuItem value="protein">Protein</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{ mb: 2, mt: 2, ml: 2 }}
                />
                <Button variant="contained" onClick={handleSearchClick} sx={{ mb: 2, ml: 2, mt: 2 }}>
                    Find
                </Button>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === 'name'}
                                        direction={orderBy === 'name' ? order : 'asc'}
                                        onClick={(e) => handleRequestSort(e, 'name')}
                                    >
                                        Dessert (100g serving)
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right">
                                    <TableSortLabel
                                        active={orderBy === 'calories'}
                                        direction={orderBy === 'calories' ? order : 'asc'}
                                        onClick={(e) => handleRequestSort(e, 'calories')}
                                    >
                                        Calories
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right">
                                    <TableSortLabel
                                        active={orderBy === 'fat'}
                                        direction={orderBy === 'fat' ? order : 'asc'}
                                        onClick={(e) => handleRequestSort(e, 'fat')}
                                    >
                                        Fat&nbsp;(g)
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right">
                                    <TableSortLabel
                                        active={orderBy === 'carbs'}
                                        direction={orderBy === 'carbs' ? order : 'asc'}
                                        onClick={(e) => handleRequestSort(e, 'carbs')}
                                    >
                                        Carbs&nbsp;(g)
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right">
                                    <TableSortLabel
                                        active={orderBy === 'protein'}
                                        direction={orderBy === 'protein' ? order : 'asc'}
                                        onClick={(e) => handleRequestSort(e, 'protein')}
                                    >
                                        Protein&nbsp;(g)
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalRows}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Divider variant="middle" />
        </Container>
    );
}
