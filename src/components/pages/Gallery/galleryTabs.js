import React, { useState } from 'react';
import { useParams, useRouteMatch, NavLink, Route, Switch } from 'react-router-dom';

import {makeStyles, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import GalleryTab from './galleryTab';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from '@material-ui/icons/Menu';
import Button from "@material-ui/core/Button";

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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <div>{children}</div>}
        </Typography>
    );
}

function TabButton(props) {
    let { children, to, className, path, ...other } = props;
    let { galleryId } = useParams();
    let galleryLinkClass = path === galleryId ? `${className} active` : className;

    return (
        <NavLink
            to={to}
            className={galleryLinkClass}
            activeClassName='active'
            {...other}
        >
            {children}
        </NavLink>
    );
}

function GalleryTabSection(props) {
    let { galleries } = props;
    let { galleryId } = useParams();

    return galleries.map((gallery, index) => {
        return gallery.path === galleryId ?
            <TabPanel key={index}>
                <GalleryTab section={gallery.component}/>
            </TabPanel>
            : null;
    })
}
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
    },
}));

export default function GalleryTabs() {
    const [anchorEl, setAnchorEl] = useState(null);
    const matches = useMediaQuery('(min-width:992px)');
    const classes = useStyles();
    const galleries = [
        {
            name: 'Canapele',
            component: 'canapea',
            path: 'canapele'
        },
        {
            name: 'Covoare',
            component: 'covor',
            path: 'covoare'
        },
        {
            name: 'Piele',
            component: 'piele',
            path: 'piele'
        },
        {
            name: 'Fotolii',
            component: 'fotoliu',
            path: 'fotolii'
        },
        {
            name: 'Coltare',
            component: 'coltar',
            path: 'coltare'
        },
        {
            name: 'Grădinițe',
            component: 'gradinita',
            path: 'gradinite'
        },
        {
            name: 'Saltele',
            component: 'saltea',
            path: 'saltele'
        },
        {
            name: 'Scaune',
            component: 'scaun',
            path: 'scaune'
        },
        {
            name: 'Auto',
            component: 'auto',
            path: 'auto'
        }
    ];
    let { path, url } = useRouteMatch();

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            {matches ?
                <AppBar position='static' color='default' className='gallery-menu'>
                    {galleries.map((gallery, index) => {
                        return <TabButton
                            key={index}
                            className='gallery-menu__button'
                            to={`${url}/${gallery.path}`}
                            path={gallery.path}>{gallery.name}
                        </TabButton>;
                    })}
                </AppBar>
            :
                <div>
                    <Button
                        aria-controls="gallery-menu"
                        aria-haspopup="true"
                        variant="contained"
                        onClick={handleClick}
                    >
                        <MenuIcon/>
                    </Button>
                    <StyledMenu
                        id="gallery-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {galleries.map((gallery, index) => {
                            return <TabButton
                                key={index}
                                className='link_default'
                                activeClassName='active'
                                exact
                                to={`${url}/${gallery.path}`}
                                path={gallery.path}
                            >
                                <StyledMenuItem>
                                    {gallery.name}
                                </StyledMenuItem>
                            </TabButton>;
                        })}
                    </StyledMenu>
                </div>
            }

            <Switch>
                <Route exact path={path}>
                    <TabPanel>
                        <GalleryTab section='canapea'/>
                    </TabPanel>
                </Route>
                <Route path={`${path}/:galleryId`}>
                    <GalleryTabSection galleries={galleries}/>
                </Route>
            </Switch>
        </div>
    );
}