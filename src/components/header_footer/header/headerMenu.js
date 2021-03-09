/*
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: '#27ae60',
            color: theme.palette.common.white,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function HeaderMenu(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const { isLoggedIn } = props;

    const matches = useMediaQuery('(min-width:992px)');
    const buttons = [
        {
            type: 'default',
            title: '>Adauga articol',
            linkTo: '/add_article',
            loggedIn: true
        },
        {
            type: 'default',
            title: 'Adauga imagine',
            linkTo: '/add_gallery_image',
            loggedIn: true
        },
        {
            type: 'default',
            title: 'Profil',
            linkTo: '/user_profile',
            loggedIn: true
        },
        {
            type: 'default',
            title: 'Sign In',
            linkTo: '/sign_in',
            loggedIn: false
        },
        {
            type: 'default',
            title: 'Register',
            linkTo: '/register',
            loggedIn: false
        }
    ];

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <nav className='menu-bottom test-menu row'>
            <div className='menu-items col-10'>
                {matches ?
                    buttons.map((menuButton, index) => {
                        return isLoggedIn ?
                        <NavLink
                            key={index}
                            className='link_default'
                            activeClassName='active'
                            exact
                            to={menuButton.linkTo}
                        >
                            {menuButton.title}
                        </NavLink>
                        : null;
                    })
                    :
                    <div>
                        <Button
                            aria-controls="customized-menu"
                            aria-haspopup="true"
                            variant="contained"
                            onClick={handleClick}
                        >
                            Config
                        </Button>
                        <StyledMenu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {buttons.map((menuButton, index) => {
                                return <NavLink
                                    key={index}
                                    className='link_default'
                                    activeClassName='active'
                                    exact
                                    to={menuButton.linkTo}
                                >
                                    <StyledMenuItem>
                                        {menuButton.title}
                                    </StyledMenuItem>
                                </NavLink>;
                            })}
                        </StyledMenu>
                    </div>
                }
            </div>
        </nav>
    );
};
*/
