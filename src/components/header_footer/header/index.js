import React, { useCallback } from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Button from '@material-ui/core/Button';

import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../../../store/actions/user_actions';

export default function Header() {
    const dispatch = useDispatch();
    const logoutUser = useCallback(
        () => dispatch(signOutUser()),
        [dispatch]
    );
    const auth = useSelector(state => state.firebase.auth);
    let { path, url } = useRouteMatch();
    const menuBtns = [
        {
            type: 'link',
            title: 'Config',
            linkTo: '/user_profile',
            className: 'site-header__user-button',
            restricted: true
        },
        {
            type: 'button',
            title: 'Sign Out',
            linkTo: '',
            className: 'site-header__user-button',
            restricted: true
        },
        {
            type: 'link',
            title: 'Sign In',
            linkTo: '/sign_in',
            className: 'site-header__user-button',
            restricted: false
        },
        {
            type: 'link',
            title: 'Register',
            linkTo: '/register',
            className: 'site-header__user-button',
            restricted: false
        }
    ];
    const socialBtns = [
        {
            icon: faFacebookF,
            color: '#3b5998',
            className: 'site-header__icon',
            href: 'https://www.facebook.com/sharer/sharer.php?u=https://curatarecovoaretapiterii.com'
        },
        {
            icon: faTwitter,
            color: '#0084b4',
            className: 'site-header__icon',
            href: 'https://twitter.com/home?status=https://curatarecovoaretapiterii.com'
        },
        {
            icon: faInstagram,
            color: '#3f729b',
            className: 'site-header__icon',
            href: 'https://www.linkedin.com/shareArticle?mini=true&url=https://curatarecovoaretapiterii.com&title=&summary=&source='
        },
        {
            icon: faYoutube,
            color: '#c4302b',
            className: 'site-header__icon',
            href: 'https://www.youtube.com/embed/tgbNymZ7vqY'
        }
    ];

    const logoutHandler = () => {
        logoutUser().then(() => {
            console.log('logout');
        });
    };

    return (
        <header className='site-header'>
            <div className='site-header__wrapper--grey-light container'>
                <nav className='site-header__container row'>
                    <div className='col-6 col-md-6'>
                        <div className='site-header__logo'>
                            <img src="/images/cleaning_logo.png" alt=""/>
                        </div>
                    </div>
                    <div className='col-6 col-md-6'>
                        <div className='row'>
                            <div className='site-header__buttons col-12 col-md-7'>
                                {window.location.pathname.search('site_admin') !== -1 || !auth.isEmpty ?
                                    menuBtns.map((menuBtn, index) => {
                                        const {type, title, linkTo, className, restricted} = menuBtn;
                                        let btn = null;

                                        if(type === 'link') {
                                            if(!auth.isEmpty && restricted) {
                                                btn = <Link key={index} to={linkTo}>
                                                    <Button className={className}>
                                                        {title}
                                                    </Button>
                                                </Link>
                                            } else if(auth.isEmpty && !restricted) {
                                                btn = <Link key={index} to={linkTo}>
                                                    <Button className={className}>
                                                        {title}
                                                    </Button>
                                                </Link>
                                            }
                                        } else {
                                            if(!auth.isEmpty && restricted) {
                                                btn = <Button key={index} className={className} onClick={() => logoutHandler()}>
                                                    {title}
                                                </Button>
                                            } else if(auth.isEmpty && !restricted) {
                                                btn = <Button key={index} className={className} onClick={() => logoutHandler()}>
                                                    {title}
                                                </Button>
                                            }
                                        }

                                        return btn;
                                    })
                                    : null
                                }
                            </div>
                            <div className='site-header__social col-12 col-md-5'>
                                {socialBtns.map((socialBtn, index) => {
                                    const {icon, color, className, href} = socialBtn;

                                    return <a
                                        key={index}
                                        href={href}
                                        className={className}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <FontAwesomeIcon
                                            icon={icon}
                                            color={color}
                                        /></a>;
                                })}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}