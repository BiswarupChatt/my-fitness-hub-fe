import moment from 'moment'
import { useState, useEffect } from 'react'
import axios from '../../../services/api/axios'
import AddWorkoutItem from '../form/AddWorkoutItem'
import { errorToast } from '../../../utils/toastify'
import EditWorkoutItem from '../form/EditWorkoutItem'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import DeleteWorkoutItem from '../form/DeleteWorkoutItem'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { useAuth } from '../../../services/context/AuthContext'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, TextField, Container, Grid, Button, CircularProgress, FormControl, MenuItem, Select, InputLabel, Chip, Switch, FormControlLabel, IconButton, Typography, Menu, Box } from '@mui/material'

export default function WorkoutItemTable() {

    const { user } = useAuth()
    const token = localStorage.getItem('token')

    const [workoutItems, setWorkoutItems] = useState([])
    const [totalFoodItems, setTotalFoodItems] = useState(0)
    const [currentPage, setCurrentPage] = useState(null)
    const [totalPages, setTotalPages] = useState(null)
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [sortBy, setSortBy] = useState('exerciseName')
    const [sortOrder, setSortOrder] = useState('asc')
    const [search, setSearch] = useState('')
    const [userFoodItem, setUserFoodItem] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const handleMenuToggle = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget)
    }

    const handleEdit = () => {
        setOpenEditModal(true)
        handleMenuToggle()
    }

    const handleDelete = () => {
        setOpenDeleteModal(true)
        handleMenuToggle()
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const fetchFoodItems = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/workout', {
                headers: { Authorization: token },
                params: { page: page + 1, limit: rowsPerPage, sortBy, sortOrder, search, userFoodItem }
            })
            setWorkoutItems(response.data.workoutItems)
            setTotalFoodItems(response.data.totalWorkoutItems)
            setTotalPages(response.data.totalPages)
            setCurrentPage(response.data.currentPage)
        } catch (err) {
            console.error('Error fetching data:', err)
            const errorMessage = err.response?.data?.errors?.[0]?.msg || err.response?.data?.errors || 'An error occurred'
            errorToast(errorMessage || 'An unknown error occurred')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchFoodItems()
    }, [page, rowsPerPage, sortBy, sortOrder, search, userFoodItem])

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        fetchFoodItems()
        setPage(0)
    }

    return (
        <Container id="food-items" sx={{ py: { xs: 8, sm: 4 } }}>
            <Grid container sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'space-between' }, alignItems: 'center' }} pb={3}>
                <Grid item margin={1}>
                    <Typography component="h2" variant="h4" color="text.primary" fontWeight="medium">
                        Workout Item List
                    </Typography>
                </Grid>
                <Grid item margin={1}>
                    <AddWorkoutItem onChange={() => fetchFoodItems()} title={"Add Workout Item"} />
                </Grid>
            </Grid>
            <Paper elevation={3} sx={{ padding: '20px' }}>
                <Grid sx={{ margin: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' } }}>
                    <Grid>
                        <FormControl variant="outlined" component={'form'} onSubmit={handleSearchSubmit} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', m: 2 }}>
                            <TextField
                                label="Search"
                                variant="outlined"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                fullWidth
                            />
                            <Button variant="contained" color="primary" type="submit" sx={{ m: 2 }} fullWidth>
                                Search
                            </Button>
                        </FormControl>
                    </Grid>
                    <Grid>
                        <FormControl variant="outlined" sx={{ m: 1 }}>
                            <InputLabel id="sort-by">Sort by</InputLabel>
                            <Select
                                labelId="sort-by"
                                id="sort-by"
                                label="Sort By"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <MenuItem value="exerciseName">Exercise Name</MenuItem>
                                <MenuItem value="createdAt">Created At</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" sx={{ m: 1 }}>
                            <InputLabel id="sort-order">Sort Order</InputLabel>
                            <Select
                                labelId="sort-order"
                                id="sort-order"
                                label="Sort Order"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
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
                {loading ? (
                    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '200px' }}>
                        <CircularProgress />
                    </Grid>
                ) : workoutItems.length === 0 ? (
                    <Grid>
                        <Typography variant="body1" fontWeight="bold">
                            You don't have any Workout items.
                        </Typography>
                        <Box mt={2}>
                            <AddWorkoutItem onChange={() => fetchFoodItems()} title={"Add First Workout Item"} />
                        </Box>
                    </Grid>
                ) : (
                    <>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Exercise Name</TableCell>
                                        <TableCell align='center'>Play Video</TableCell>
                                        <TableCell align='center'>Created by</TableCell>
                                        <TableCell align='center'>Created At</TableCell>
                                        <TableCell align='center'>Options</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {workoutItems.map((ele, index) => (
                                        <TableRow key={ele._id} sx={{ backgroundColor: index % 2 === 0 ? "#f7f7f7" : "#ffffff" }}>
                                            <TableCell>{ele.exerciseName}</TableCell>
                                            <TableCell align='center'>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => window.open(ele.videoLink, '_blank')}
                                                >
                                                    <PlayArrowIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align='center'>{ele.isDefault ? (
                                                <Chip label="Default" color="primary" />
                                            ) : (
                                                <Chip label={ele.coach.firstName} color="success" />
                                            )}</TableCell>
                                            <TableCell align='center'>{moment(ele.createdAt).format('Do MMMM YYYY')}</TableCell>
                                            <TableCell align='center'>
                                                {ele.coach._id === user.account._id ? (
                                                    <>
                                                        <IconButton size="small" onClick={(e) => handleMenuToggle(e, ele)}>
                                                            <MoreHorizIcon fontSize="small" />
                                                        </IconButton>
                                                        <Menu
                                                            anchorEl={anchorEl}
                                                            open={Boolean(anchorEl)}
                                                            onClose={handleMenuToggle}
                                                        >
                                                            <MenuItem onClick={() => handleEdit()}>Edit</MenuItem>
                                                            <MenuItem onClick={handleDelete}>Delete</MenuItem>
                                                        </Menu>
                                                    </>
                                                ) : null}
                                            </TableCell>
                                            <EditWorkoutItem
                                                open={openEditModal}
                                                handleClose={() => setOpenEditModal(false)}
                                                workoutItem={ele}
                                                onChange={() => fetchFoodItems()}
                                            />
                                            <DeleteWorkoutItem
                                                open={openDeleteModal}
                                                handleClose={() => setOpenDeleteModal(false)}
                                                workoutItem={ele}
                                                onChange={() => fetchFoodItems()}
                                            />
                                        </TableRow>
                                    ))
                                    }
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
                    </>
                )}
            </Paper>
        </Container>
    )
}
