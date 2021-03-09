import React from 'react';
import { useParams, NavLink } from "react-router-dom";

function LinkTab(props) {
    let { children, to, className, path, ...other } = props;
    let { configId } = useParams();
    let configLinkClass = path === configId ? `${className} active` : className;

    return (
        <NavLink
            to={to}
            className={configLinkClass}
            activeClassName='config-menu__button--active'
            {...other}
        >
            {children}
        </NavLink>
    );
}

export default function ConfigMenu() {
    const configs = [
        {
            name: 'Profil',
            component: '',
            path: 'user_profile'
        },
        {
            name: 'Adaugă articol',
            component: '',
            path: 'add_article'
        },
        {
            name: 'Adaugă imagine',
            component: '',
            path: 'add_gallery_image'
        },
        {
            name: 'Trimite e-mail',
            component: '',
            path: 'send_email'
        }
    ];

    return (
        <div className='config-menu'>
            {configs.map((config, index) => {
                return <LinkTab
                    key={index}
                    className='config-menu__button'
                    to={`${config.path}`}
                    path={config.path}>{config.name}
                </LinkTab>;
            })}
        </div>
    );
}