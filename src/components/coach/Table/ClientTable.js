import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, TextField, Container, Grid, Button, Divider, CircularProgress, FormControl, MenuItem, Select, Avatar, Tooltip, InputLabel, Typography, Box } from '@mui/material'
import { errorToast } from '../../../utils/toastify';
import axios from '../../../services/api/axios';
import moment from 'moment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HelpIcon from '@mui/icons-material/Help';
import { useNavigate } from 'react-router-dom';
import AddClient from '../form/AddClient';



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
    const { profileImage, firstName } = user

    return (
        <Avatar
            src={profileImage ? profileImage : firstName}
            alt={firstName}
            sx={{
                width: 56,
                height: 56,
            }} />
    )
}


export default function ClientTable({ user }) {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [totalClients, setTotalClients] = useState(0)
    const [sortBy, setSortBy] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState('asc')
    const [totalPages, setTotalPages] = useState(null)
    const [currentPages, setCurrentPages] = useState(null)
    const [search, setSearch] = useState('')

    const handleClick = (userId) => {
        navigate(`/client/${userId}`)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
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

    return (
        <Container id="clients" sx={{ py: { xs: 8, sm: 4 } }}>

            <Grid container sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'space-between' }, alignItems: 'center' }} pb={3}>
                <Grid item margin={1}>
                    <Typography component="h2" variant="h4" color="text.primary" fontWeight="medium">
                        Client List
                    </Typography>
                </Grid>
                <Grid item margin={1}>
                    <AddClient title={"Add Client"} />
                </Grid>
            </Grid>

            <Paper elevation={3} sx={{ padding: '20px' }}>
                {loading ? (
                    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '200px' }}>
                        <CircularProgress />
                    </Grid>
                ) :
                    clients.length === 0 ?
                        (
                            <Grid>
                                <Typography variant="body1" fontWeight="bold">
                                    You don't have any clients.
                                </Typography>
                                <Box mt={2}>
                                    <AddClient title={'Invite First Client'} />
                                </Box>
                            </Grid>
                        ) : (
                            <>
                                <Grid sx={{ margin: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' } }} >
                                    <Grid>
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
                                    </Grid>
                                    <Grid >
                                        <FormControl variant="outlined" sx={{ m: 1 }}>
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
                                        <FormControl variant="outlined" sx={{ m: 1 }}>
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
                                            {clients.map((ele, index) => (
                                                <TableRow key={ele._id}
                                                    onClick={() => {
                                                        return handleClick(ele.user._id)
                                                    }}
                                                    sx={{
                                                        backgroundColor: index % 2 === 0 ? "#f7f7f7" : "#ffffff",
                                                        cursor: 'pointer', transition: 'background-color 0.3s ease, transform 0.2s ease', '&:hover': { backgroundColor: index % 2 === 0 ? "#e0e0e0" : "#f0f0f0", }, '&:active': { backgroundColor: index % 2 === 0 ? "#d0d0d0" : "#e0e0e0", }
                                                    }}
                                                >
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
                                            }
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
                            </>
                        )
                }

            </Paper>

            <Divider variant="middle" />

        </Container >
    );
}
