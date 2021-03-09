import React from 'react';

export default function NavHeader() {
    return (
        <div className='navigation__header nav-header row'>
            <div className='col-12 col-lg-6'>
                <h2 className='nav-header__site-title'>Curățare Covoare Tapițerii</h2>
                <h5 className='nav-header__site-subtitle'>Curăţenia — temeiul sanătăţii şi oglinda simţirii.</h5>
            </div>
            <div className='nav-header__contact col-12 col-md-6 col-lg-2'>
                <h4 className='nav-header__contact-title'>Sună acum</h4>
                <a className='nav-header__contact-link' href='tel:0785337467'>0785337467</a>
            </div>
            <div className='nav-header__contact col-12 col-md-6 col-lg-4'>
                <h4 className='nav-header__contact-title'>Intreabă-ne</h4>
                <a className='nav-header__contact-link' target='_blank' rel='noopener noreferrer' href='https://www.facebook.com/CuratareCovoareTapiterii'>facebook/CuratareCovoareTapiterii</a>
            </div>
        </div>
    );
}