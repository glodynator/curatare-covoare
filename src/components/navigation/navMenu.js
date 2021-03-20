import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';



// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';

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

export default function NavMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const matches = useMediaQuery('(min-width:992px)');
    const buttons = [
        {
            type: 'default',
            title: 'Acasă',
            linkTo: '/'
        },
        {
            type: 'default',
            title: 'Despre noi',
            linkTo: '/about_us'
        },
        {
            type: 'default',
            title: 'Servicii',
            linkTo: '/services'
        },
        {
            type: 'default',
            title: 'Intrebări frecvente',
            linkTo: '/questions'
        },
        {
            type: 'default',
            title: 'Blog',
            linkTo: '/articles'
        },
        {
            type: 'default',
            title: 'Galerie',
            linkTo: '/gallery'
        },
        {
            type: 'default',
            title: 'Contact',
            linkTo: '/contact'
        }/*,
        {
            type: 'default',
            title: 'Programari',
            linkTo: '/reservations'
        }*/
    ];

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className='navigation__menu nav-menu row'>
            <div className='nav-menu__buttons col-10'>
                {matches ?
                    buttons.map((menuButton, index) => {
                    return <NavLink
                        key={index}
                        className='nav-menu__button'
                        activeClassName='active'
                        exact
                        to={menuButton.linkTo}
                    >
                        {menuButton.title}
                    </NavLink>;
                })
                :
                    <div className='nav-menu__burger'>
                        <Button
                            className='nav-menu__burger--button'
                            aria-controls="site-nav-menu"
                            aria-haspopup="true"
                            variant="contained"
                            onClick={handleClick}
                        >
                            <MenuIcon/>
                        </Button>
                        <StyledMenu
                            id="site-nav-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {buttons.map((menuButton, index) => {
                                return <NavLink
                                        key={index}
                                        className='nav-menu__button'
                                        activeClassName='active'
                                        exact
                                        to={menuButton.linkTo}
                                    >
                                        <StyledMenuItem className='nav-menu__button--inner' onClick={handleClose}>
                                            {menuButton.title}
                                        </StyledMenuItem>
                                    </NavLink>;
                            })}
                        </StyledMenu>
                    </div>
                }
            </div>
            {/*<div className='nav-menu__search col-2'>
                <FontAwesomeIcon
                    icon={faSearch}
                    className="icon"
                />
            </div>*/}
        </div>
    );
};
