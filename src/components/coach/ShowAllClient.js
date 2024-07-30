import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, Paper, TextField, Container, Grid, Button, Typography, Divider, Modal, Box, CircularProgress, FormControl, MenuItem, Select } from '@mui/material'
import { useFormik } from 'formik';
import { inviteClientValidation } from '../../validations/inviteClientValidations';
import { loadingToast, updateToast } from '../../utils/toastify';
import axios from '../../services/api/axios';
import moment from 'moment';

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

    const token = localStorage.getItem('token')

    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [totalClients, setTotalClients] = useState(0)
    const [sortBy, setSortBy] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState('asc')
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const handleToggle = () => {
        setOpen((ele) => {
            return !ele;
        });
    };

    const initialValues = {
        email: ''
    }

    const fetchClients = async () => {
        setLoading(true)
        try {
            const response = await axios.get('/coach/getAllClient', {
                headers: {
                    Authorization: token
                },
                params: {
                    page: page + 1,
                    limit: rowsPerPage,
                    sortBy: sortBy,
                    sortOrder: sortOrder,
                    search: search
                }
            });
            setClients(response.data.client)
            setTotalClients(response.data.totalClients)
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchClients()
    }, [page, rowsPerPage, sortBy, sortOrder, token])

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        fetchClients()
        setPage(0)
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: inviteClientValidation,
        onSubmit: async (value) => {
            try {

                setIsSubmitting(true)
                loadingToast("Sending Invitation", 'client-invite-toast')

                await axios.post('/coach/sendInvitationEmail', value, {
                    headers: {
                        Authorization: token
                    }
                })
                console.log('1')
                updateToast('Sent Invitation Successfully', 'client-invite-toast', 'success')
            } catch (err) {
                console.error('Error caught in catch block:', err)

                if (err.response) {
                    const errorMessage = err.response.data.errors?.[0]?.msg || err.response.data.errors || 'An error occurred'
                    console.log('2')
                    updateToast(errorMessage, 'client-invite-toast', 'error')
                } else if (err.request) {
                    console.log('3')
                    updateToast('No response from server', 'client-invite-toast', 'error')
                } else {
                    console.log('4')
                    updateToast('An unknown error occurred', 'client-invite-toast', 'error')
                }
            } finally {
                console.log('5')
                setIsSubmitting(false)
                handleToggle()
            }
        }
    });


    return (
        <Container id="clients" sx={{ py: { xs: 8, sm: 4 } }}>
            <Grid container alignItems="center" justifyContent="space-between" pb={4}>
                <Grid item>
                    <Typography component="h2" variant="h4" color="text.primary" fontWeight="medium">
                        Client List
                    </Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleToggle}>
                        Invite Client
                    </Button>
                </Grid>
            </Grid>

            <Paper>
                <Grid sx={{ margin: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', }} >
                    <FormControl variant="outlined" component={'form'} onSubmit={handleSearchSubmit} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', ml: 2, marginTop: 3 }}>
                        <TextField
                            label="Search"
                            variant="outlined"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                        />
                        <Button variant="contained" color="primary" type='submit' sx={{ ml: 2 }}>
                            Search
                        </Button>
                    </FormControl>
                    <Grid >
                        <FormControl variant="outlined" sx={{ mr: 2, marginTop: 3 }}>
                            <Select
                                value={sortBy}
                                onChange={(e) => {
                                    setSortBy(e.target.value)
                                }}
                            >
                                <MenuItem value="createdAt">Created At</MenuItem>
                                <MenuItem value="firstName">First Name</MenuItem>
                                <MenuItem value="lastName">Last Name</MenuItem>
                                <MenuItem value="email">Email</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" sx={{ mr: 2, marginTop: 3 }}>
                            <Select
                                value={sortOrder}
                                onChange={(e) => {
                                    setSortOrder(e.target.value)
                                }}
                            >
                                <MenuItem value="asc">Ascending</MenuItem>
                                <MenuItem value="desc">Descending</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    {/* <TableSortLabel
                                        active={sortBy === 'firstName'}
                                        direction={sortBy === 'firstName' ? sortOrder : 'asc'}
                                        onClick={() => setSortBy('firstName')}
                                    > */}
                                    First Name
                                    {/* </TableSortLabel> */}
                                </TableCell>
                                <TableCell>
                                    {/* <TableSortLabel
                                        active={sortBy === 'lastName'}
                                        direction={sortBy === 'lastName' ? sortOrder : 'asc'}
                                        onClick={() => setSortBy('lastName')}
                                    > */}
                                    Last Name
                                    {/* </TableSortLabel> */}
                                </TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Created At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                clients.map((ele, index) => (
                                    <TableRow key={ele._id} sx={{ backgroundColor: index % 2 === 0 ? "#f7f7f7" : "#ffffff" }}>
                                        <TableCell>{ele.firstName}</TableCell>
                                        <TableCell>{ele.lastName}</TableCell>
                                        <TableCell>{ele.email}</TableCell>
                                        <TableCell>{moment(ele.createdAt).format("Do MMM YYYY")}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalClients}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Modal open={open} onClose={handleToggle}>
                <Box sx={modalStyle} component="form" noValidate onSubmit={handleSubmit}>
                    <Typography variant="h6" component="h2">
                        Invite Client
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && !!errors.email}
                        helperText={(touched && errors.email)}
                    />
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button onClick={handleToggle} color="primary" sx={{ mr: 1 }}>
                            Cancel
                        </Button>
                        <Button type='submit' color="primary" variant="contained" disabled={isSubmitting}>
                            Send Invitation
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Divider variant="middle" />
        </Container>
    );
}
