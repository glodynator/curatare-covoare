import React from 'react';

import NavHeader from './navHeader';
import NavMenu from './navMenu';

export default function Navigation() {
    return (
        <nav className='navigation container'>
            <NavHeader/>
            <NavMenu/>
        </nav>
    );
};