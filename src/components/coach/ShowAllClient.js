import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, Paper, TextField, Container, Grid, Button, Typography, Divider, Modal, Box, } from '@mui/material'

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
};

export default function ShowAllClients({ user }) {
    
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');

    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSend = () => {
        // Handle the send action here, like sending the email address to the server
        console.log(email);
        setEmail('')
        handleClose();
    };

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

    const filteredRows = rows.filter(row => {
        return row.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const sortedRows = filteredRows.sort((a, b) => {
        if (orderBy === 'name') {
            return (order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
        }
        return (order === 'asc' ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy]);
    });

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, sortedRows.length - page * rowsPerPage);

    return (
        <Container id="clients" sx={{ py: { xs: 8, sm: 4 } }}>
            <Grid container alignItems="center" justifyContent="space-between" pb={4}>
                <Grid item>
                    <Typography component="h2" variant="h4" color="text.primary" fontWeight="medium">
                        Client List
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleClickOpen}>
                        Add Client
                    </Button>
                </Grid>
            </Grid>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{ mb: 2, mt: 2 }}
                />
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
                            {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
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
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={sortedRows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2">
                        Invite Client
                    </Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button onClick={handleClose} color="primary" sx={{ mr: 1 }}>
                            Cancel
                        </Button>
                        <Button onClick={handleSend} color="primary" variant="contained">
                            Send Invitation
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Divider variant="middle" />
        </Container>
    );
}
