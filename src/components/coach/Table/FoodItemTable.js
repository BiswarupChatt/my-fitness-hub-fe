import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, TextField, Container, Grid, Button, Divider, CircularProgress, FormControl, MenuItem, Select, InputLabel, Chip, Switch, FormControlLabel, IconButton, Typography } from '@mui/material'
import { errorToast } from '../../../utils/toastify';
import axios from '../../../services/api/axios';
import { useNavigate } from 'react-router-dom';
import AddFoodItem from '../form/AddFoodItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useAuth } from '../../../services/context/AuthContext';
 
export default function FoodItemTable() {
    const { user } = useAuth()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const [foodItems, setFoodItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [totalFoodItems, setTotalFoodItems] = useState(0)
    const [sortBy, setSortBy] = useState('foodName')
    const [sortOrder, setSortOrder] = useState('asc')
    const [totalPages, setTotalPages] = useState(null)
    const [currentPage, setCurrentPage] = useState(null)
    const [search, setSearch] = useState('')
    const [userFoodItem, setUserFoodItem] = useState(false)
    const [addFoodItemChanges, setAddFoodItemChanged] = useState(false)

    const handleAddFoodItemChange = () => {
            setAddFoodItemChanged(true)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const fetchFoodItems = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/food-item', {
                headers: {
                    Authorization: token
                },
                params: {
                    page: page + 1,
                    limit: rowsPerPage,
                    sortBy: sortBy,
                    sortOrder: sortOrder,
                    search: search,
                    userFoodItem: userFoodItem
                }
            });
            console.log('response', response)
            setFoodItems(response.data.foodItems)
            setTotalFoodItems(response.data.totalFoodItems)
            setTotalPages(response.data.totalPages)
            setCurrentPage(response.data.currentPage)
        } catch (err) {
            console.error('Error fetching data:', err)
            if (err.response) {
                const errorMessage = err.response.data.errors?.[0]?.msg || err.response.data.errors || 'An error occurred'
                errorToast(errorMessage)
            } else if (err.request) {
                errorToast('No response from server')
            } else {
                errorToast('An unknown error occurred')
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchFoodItems()

    }, [page, rowsPerPage, sortBy, sortOrder, token, addFoodItemChanges, userFoodItem])

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        fetchFoodItems()
        setPage(0)
    }
    console.log('user', user)

    return (
        <Container id="food-items" sx={{ py: { xs: 8, sm: 4 } }}>
            <Grid container sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'space-between' }, alignItems: 'center' }} pb={3}>
                <Grid item margin={1}>
                    <Typography component="h2" variant="h4" color="text.primary" fontWeight="medium">
                        Food Item List
                    </Typography>
                </Grid>
                <Grid item margin={1}>
                    <AddFoodItem onChange={handleAddFoodItemChange} title={"Add Food Item"} />
                </Grid>
            </Grid>
            <Paper>
                <Grid sx={{ margin: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' } }}>
                    <FormControl variant="outlined" component={'form'} onSubmit={handleSearchSubmit} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', m: 2 }}>
                        <TextField
                            label="Search"
                            variant="outlined"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            fullWidth
                        />
                        <Button variant="contained" color="primary" type="submit" sx={{ m: 2 }} fullWidth>
                            Search
                        </Button>
                    </FormControl>
                    <Grid>
                        <FormControl variant="outlined" sx={{ m: 2 }}>
                            <InputLabel id="sort-by">Sort by</InputLabel>
                            <Select
                                labelId="sort-by"
                                id="sort-by"
                                label="Sort By"
                                value={sortBy}
                                onChange={(e) => {
                                    setSortBy(e.target.value);
                                }}
                            >
                                <MenuItem value="foodName">Food Name</MenuItem>
                                <MenuItem value="calories">Calories</MenuItem>
                                <MenuItem value="protein">Protein</MenuItem>
                                <MenuItem value="fat">Fat</MenuItem>
                                <MenuItem value="carbohydrate">Carbohydrate</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" sx={{ m: 2 }}>
                            <InputLabel id="sort-order">Sort Order</InputLabel>
                            <Select
                                labelId="sort-order"
                                id="sort-order"
                                label="Sort Order"
                                value={sortOrder}
                                onChange={(e) => {
                                    setSortOrder(e.target.value);
                                }}
                            >
                                <MenuItem value="asc">Ascending</MenuItem>
                                <MenuItem value="desc">Descending</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={userFoodItem}
                                    onChange={(e) => setUserFoodItem(e.target.checked)}
                                    name="myEntriesOnly"
                                    color="primary"
                                />
                            }
                            label="My Entries Only"
                        />
                    </Grid>
                </Grid>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Food Name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Unit</TableCell>
                                <TableCell>Calories</TableCell>
                                <TableCell>Protein</TableCell>
                                <TableCell>Fat</TableCell>
                                <TableCell>Carbohydrate</TableCell>
                                <TableCell>Created By</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                foodItems.map((ele, index) => (
                                    <TableRow key={ele._id}
                                        sx={{
                                            backgroundColor: index % 2 === 0 ? "#f7f7f7" : "#ffffff",
                                        }}
                                    >
                                        <TableCell>{ele.foodName}</TableCell>
                                        <TableCell>{ele.quantity}</TableCell>
                                        <TableCell>{ele.unit}</TableCell>
                                        <TableCell>{ele.calories}</TableCell>
                                        <TableCell>{ele.protein}</TableCell>
                                        <TableCell>{ele.fat}</TableCell>
                                        <TableCell>{ele.carbohydrate}</TableCell>
                                        <TableCell>{ele.isDefault ? (
                                            <Chip label="Default" color="primary" />
                                        ) : (
                                            <Chip label={ele.coach.firstName} color="success" />
                                        )}</TableCell>
                                        <TableCell sx={{ cursor: 'pointer', transition: 'background-color 0.3s ease, transform 0.2s ease', }}>
                                            {ele.coach._id === user.account._id ? (
                                                <IconButton size="small" sx={{ '&:hover': { borderRadius: '50%', } }}>
                                                    <MoreHorizIcon fontSize="small" />
                                                </IconButton>
                                            ) : null}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[2, 5, 10, 25]}
                    component="div"
                    count={totalFoodItems}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelDisplayedRows={({ from, to, count }) =>
                        `${from}–${to} of ${count} | Page ${currentPage} of ${totalPages}`
                    }
                />
            </Paper>
        </Container>
    );
}
