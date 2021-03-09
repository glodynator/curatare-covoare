import React from 'react';

import Header from '../components/header_footer/header';
import Footer from '../components/header_footer/footer';
import Navigation from '../components/navigation';

export default function Layout(props) {
    return (
        <div className='page-wrapper page-wrapper--green'>
            <Header {...props}/>
            <div className='page-wrapper__main page-wrapper__main--white container'>
                <Navigation/>
                <div className='page-wrapper__container'>
                    {props.children}
                </div>
            </div>
            <Footer />
        </div>
    );
};