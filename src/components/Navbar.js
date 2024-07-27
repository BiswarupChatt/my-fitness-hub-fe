import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Button, Tooltip, Avatar, Menu, MenuItem, useScrollTrigger, Slide, Fab, Fade } from '@mui/material';
import { useAuth } from '../services/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const userItems = [
    { name: 'Profile', path: '/profile' },
    { name: 'Account', path: '/account' },
    { name: 'Logout', path: '/logout' },
]

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Login', path: '/login' },
    { name: 'Sign Up', path: '/coach-signup' },
]

const coachItems = [
    { name: 'Client', path: '/client' },
    { name: 'Subscription', path: '/subscription' },
    { name: 'Food Item', path: '/food-item' },
    { name: 'Workout Item', path: '/workout-item' },
]
const clientItems = [
    { name: 'Training', path: '/training' },
    { name: 'Nutrition', path: '/nutrition' },
    { name: 'Progress', path: '/progress' },
    { name: 'My Coach', path: '/coach' },
    { name: 'My Program', path: '/program' },
]

const HideOnScroll = (props) => {
    const { children, window } = props
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const ScrollTop = (props) => {
    const { children, window } = props
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        )
        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    }
    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Fade>
    );
}

const ItemDisplay = ({ items }) => {
    return (<Box sx={{ display: { xs: 'none', md: 'block' } }}>
        {items.map((ele) => (
            <Button
                key={ele.name}
                component={Link}
                to={ele.path}
                sx={{
                    color: '#fff',
                    textTransform: 'none'
                }}
            >
                {ele.name}
            </Button>
        ))}
    </Box>)
}

const ItemDisplayDrawer = ({ items }) => {
    return (
        <List>
            {items.map((ele) => (
                <ListItem key={ele.name} disablePadding>
                    <ListItemButton component={Link} to={ele.path} sx={{ textAlign: 'center' }}>
                        <ListItemText primary={ele.name} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}


export default function Navbar(props) {

    const { user, dispatch } = useAuth()
    const { window } = props
    const [mobileOpen, setMobileOpen] = useState(false)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const navigate = useNavigate()

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    }

    const handleToggleUserMenu = (e) => {
        setAnchorElUser((prev) => (prev ? null : e.currentTarget));
    }

    const handleLogout = (e) => {
        localStorage.removeItem('token')
        dispatch({ type: 'LOGOUT' })
        navigate('/')
    }


    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', }}>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar component="nav">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Button component={Link} to="/" sx={{ textDecoration: 'none', textTransform: 'none', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: { xs: user.isLoggedIn ? 'center' : 'right', md: 'left' } }}>
                            <Typography variant="h6" sx={{ color: '#fff', }}>
                                MyFitnessHub
                            </Typography>
                        </Button>

                        {user.isLoggedIn ? (
                            user.account.role === 'client' ? (
                                <ItemDisplay items={clientItems} />
                            ) : (
                                <ItemDisplay items={coachItems} />
                            )
                        ) : (
                            <ItemDisplay items={navItems} />
                        )}
                        {user.isLoggedIn ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleToggleUserMenu} sx={{ p: 0, marginLeft: 2 }}>
                                        <Avatar alt="Remy Sharp" src="https://picsum.photos/id/64/200" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    keepMounted
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleToggleUserMenu}
                                >
                                    {userItems.map((ele) => (
                                        <MenuItem
                                            key={ele.name}
                                            onClick={ele.name === 'Logout' ? () => { handleLogout(); handleToggleUserMenu(); } : handleToggleUserMenu}
                                            component={ele.name !== 'Logout' ? Link : 'div'}
                                            to={ele.name !== 'Logout' ? ele.path : undefined}
                                        >
                                            <Typography textAlign="center">{ele.name}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        ) : (null)}
                    </Toolbar >
                </AppBar>
            </HideOnScroll >
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '60%' },
                    }}
                >
                    <Box onClick={handleDrawerToggle} >
                        <Button component={Link} to="/" sx={{ textDecoration: 'none', textTransform: 'none', display: 'flex', textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ color: 'inherit' }}>
                                MyFitnessHub
                            </Typography>
                        </Button>
                        <Divider />
                        {user.isLoggedIn ? (
                            user.account.role === 'client' ? (
                                <ItemDisplayDrawer items={clientItems} />
                            ) : (
                                <ItemDisplayDrawer items={coachItems} />
                            )
                        ) : (
                            <ItemDisplayDrawer items={navItems} />
                        )}
                    </Box>
                </Drawer>
            </nav>
            <Toolbar id="back-to-top-anchor" />

            <ScrollTop {...props}>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </Box>
    )
}

Navbar.propTypes = {
    window: PropTypes.func,
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
}