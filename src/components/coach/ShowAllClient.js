import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, TextField, Container, Grid, Button, Typography, Divider, Modal, Box, CircularProgress, FormControl, MenuItem, Select, Avatar, Tooltip, InputLabel } from '@mui/material'
import { useFormik } from 'formik';
import { inviteClientValidation } from '../../validations/inviteClientValidations';
import { loadingToast, updateToast, errorToast } from '../../utils/toastify';
import axios from '../../services/api/axios';
import moment from 'moment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpIcon from '@mui/icons-material/Help';
import { useNavigate } from 'react-router-dom';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '90%', sm: '80%', md: '60%', lg: '50%', xl: '30%',
    },
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
};

const ProgramStatus = ({ program }) => {
    if (program?.isActive !== undefined) {
        return program.isActive ? (
            <Tooltip title="Program is Active">
                <CheckCircleIcon sx={{ color: 'green', cursor: 'pointer' }} />
            </Tooltip>
        ) : (
            <Tooltip title="Program is not Active">
                <CancelIcon sx={{ color: 'red', cursor: 'pointer' }} />
            </Tooltip>
        )
    }
    return (
        <Tooltip title="Program Not Assigned Yet">
            <HelpIcon sx={{ color: 'grey', cursor: 'pointer' }} />
        </Tooltip>
    )
}

const AvatarDisplay = ({ user }) => {
    if (user.profilePicture) {
        return <Avatar src={user.profilePicture} alt={user.firstName} />;
    }
    return <Avatar alt={user.firstName}>{user.firstName.charAt(0).toUpperCase()}</Avatar>;
}


export default function ShowAllClients({ user }) {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [totalClients, setTotalClients] = useState(0)
    const [sortBy, setSortBy] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState('asc')
    const [totalPages, setTotalPages] = useState(null)
    const [currentPages, setCurrentPages] = useState(null)
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleClick = (id) => {
        navigate(`/client/${id}`)
    }

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
            console.log('response', response)
            setClients(response.data.client)
            setTotalClients(response.data.totalClients)
            setTotalPages(response.data.totalPages)
            setCurrentPages(response.data.currentPages)
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
        fetchClients()

    }, [page, rowsPerPage, sortBy, sortOrder, token])

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        fetchClients()
        setPage(0)
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: { email: '' },
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
                    updateToast(errorMessage, 'client-invite-toast', 'error')
                } else if (err.request) {
                    updateToast('No response from server', 'client-invite-toast', 'error')
                } else {
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

                <Grid sx={{ margin: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' } }} >
                    <FormControl variant="outlined" component={'form'} onSubmit={handleSearchSubmit} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', m: 2 }}>
                        <TextField
                            label="Search"
                            variant="outlined"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                            fullWidth
                        />
                        <Button variant="contained" color="primary" type='submit' sx={{ m: 2 }} fullWidth>
                            Search
                        </Button>
                    </FormControl>
                    <Grid >
                        <FormControl variant="outlined" sx={{ m: 2 }}>
                            <InputLabel id="sort-by">Sort by</InputLabel>
                            <Select
                                labelId="sort-by"
                                id="sort-by"
                                label="Sort By"
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
                        <FormControl variant="outlined" sx={{ m: 2 }}>
                            <InputLabel id="sort-order">Sort Order</InputLabel>
                            <Select
                                labelId="sort-order"
                                id="sort-order"
                                label="Sort By"
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
                                <TableCell></TableCell>
                                <TableCell>
                                    First Name
                                </TableCell>
                                <TableCell>
                                    Last Name
                                </TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Status</TableCell>
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
                                    <TableRow key={ele._id} sx={{
                                        backgroundColor: index % 2 === 0 ? "#f7f7f7" : "#ffffff",
                                        cursor: 'pointer',transition: 'background-color 0.3s ease, transform 0.2s ease','&:hover': {backgroundColor: index % 2 === 0 ? "#e0e0e0" : "#f0f0f0",},'&:active': {backgroundColor: index % 2 === 0 ? "#d0d0d0" : "#e0e0e0",}
                                    }} onClick={() => {
                                        return handleClick(ele._id)
                                    }}>
                                        <TableCell>
                                            <AvatarDisplay user={ele.user} />
                                        </TableCell>
                                        <TableCell>{ele.firstName}</TableCell>
                                        <TableCell>{ele.lastName}</TableCell>
                                        <TableCell>{ele.email}</TableCell>
                                        <TableCell>{moment(ele.createdAt).format("Do MMM YYYY")}</TableCell>
                                        <TableCell>
                                            <ProgramStatus program={ele.program} />
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
                    count={totalClients}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelDisplayedRows={({ from, to, count }) =>
                        `${from}–${to} of ${count} | Page ${currentPages} of ${totalPages}`
                    }
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

        </Container >
    );
}
