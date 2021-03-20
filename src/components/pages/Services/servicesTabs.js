import React, { useState } from 'react';
import { useParams, useRouteMatch, NavLink, Route, Switch } from "react-router-dom";

import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

import ServiceDescription from './serviceDescription';
import ServiceAbout from './serviceAbout';
import ServiceCarpet from './serviceCarpet';
import ServiceSofa from './serviceSofa';
import ServiceMattress from './serviceMattress';
import ServiceAuto from './serviceAuto';
import ServiceBabyChair from './serviceBabyChair';
import ServiceLeather from './serviceLeather';

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
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <div>{children}</div>}
        </Typography>
    );
}

function TabButton(props) {
    let { children, to, className, path, ...other } = props;
    let { serviceId } = useParams();
    let serviceLinkClass = path === serviceId ? `${className} active` : className;

    return (
        <NavLink
            to={to}
            className={serviceLinkClass}
            activeClassName='active'
            {...other}
        >
            {children}
        </NavLink>
    );
}

function ServiceTab(props) {
    let { services } = props;
    let { serviceId } = useParams();

    return services.map((service, index) => {
        return service.path === serviceId ?
            <TabPanel key={index}>
                {service.component}
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

export default function ServicesTabs() {
    const [anchorEl, setAnchorEl] = useState(null);
    const matches = useMediaQuery('(min-width:992px)');
    const classes = useStyles();
    const services = [
        {
            name: 'Descriere',
            component: <ServiceDescription/>,
            path: 'description'
        },
        {
            name: 'Covoare',
            component: <ServiceCarpet/>,
            path: 'carpets'
        },
        {
            name: 'Canapele',
            component: <ServiceSofa/>,
            path: 'sofas'
        },
        {
            name: 'Saltele',
            component: <ServiceMattress/>,
            path: 'mattresses'
        },
        {
            name: 'Tapiterii auto',
            component: <ServiceAuto/>,
            path: 'auto'
        },
        {
            name: 'Scaune copii',
            component: <ServiceBabyChair/>,
            path: 'kidschairs'
        },
        {
            name: 'Produse din piele',
            component: <ServiceLeather/>,
            path: 'leather'
        },
        {
            name: 'Cum facem',
            component: <ServiceAbout/>,
            path: 'about'
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
                <AppBar position='static' color='default' className='service-menu'>
                    {services.map((service, index) => {
                        return <TabButton
                            key={index}
                            className='service-menu__button'
                            to={`${url}/${service.path}`}
                            path={service.path}>{service.name}
                        </TabButton>;
                    })}
                </AppBar>
            :
                <div>
                    <Button
                        aria-controls="services-menu"
                        aria-haspopup="true"
                        variant="contained"
                        onClick={handleClick}
                    >
                        <MenuIcon/>
                    </Button>
                    <StyledMenu
                        id="services-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {services.map((service, index) => {
                            return <TabButton
                                key={index}
                                className='link_default'
                                activeClassName='active'
                                exact
                                to={`${url}/${service.path}`}
                                path={service.path}
                            >
                                <StyledMenuItem>
                                    {service.name}
                                </StyledMenuItem>
                            </TabButton>;
                        })}
                    </StyledMenu>
                </div>
            }

            <Switch>
                <Route exact path={path}>
                    <TabPanel>
                        <ServiceDescription/>
                    </TabPanel>
                </Route>
                <Route path={`${path}/:serviceId`}>
                    <ServiceTab services={services}/>
                </Route>
            </Switch>
        </div>
    );
}