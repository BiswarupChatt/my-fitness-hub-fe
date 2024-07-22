import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Button, Tooltip, Avatar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Login', path: '/login' },
    { name: 'About us', path: '/about' },
]

const userItems = [
    { name: 'Profile', path: '/profile' },
    { name: 'Account', path: '/account' },
    { name: 'Logout', path: '/logout' },
]

export default function Navbar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleToggleUserMenu = (event) => {
        setAnchorElUser((prev) => (prev ? null : event.currentTarget));
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} >
            <Button component={Link} to="/" sx={{ textDecoration: 'none', textTransform: 'none', display: 'flex', textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: 'inherit' }}>
                    MyFitnessHub
                </Typography>
            </Button>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton component={Link} to={item.path} sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Button component={Link} to="/" sx={{ textDecoration: 'none', textTransform: 'none', flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: {xs: 'center', sm: 'left'} }}>
                        <Typography variant="h6" sx={{ color: '#fff',}}>
                            MyFitnessHub
                        </Typography>
                    </Button>
                    <Box sx={{ display: { xs: 'none', sm: 'block' }, marginRight: 2 }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.name}
                                component={Link}
                                to={item.path}
                                sx={{ color: '#fff' }}
                            >
                                {item.name}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleToggleUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="https://picsum.photos/id/64/200" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleToggleUserMenu}
                        >
                            {userItems.map((setting) => (
                                <MenuItem key={setting.name} component={Link} to={setting.path} onClick={handleToggleUserMenu}>
                                    <Typography textAlign="center">{setting.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
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
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '60%' },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{ p: 3 }}>
            </Box>
        </Box>
    );
};

Navbar.propTypes = {
    window: PropTypes.func,
};
