import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

import MyButton from '../../utils/button';

const Footer = () => {
    const servicesBtns = [
        {
            type: 'default',
            title: 'Descriere',
            linkTo: '/services/description'
        },
        {
            type: 'default',
            title: 'Covoare',
            linkTo: '/services/carpets'
        },
        {
            type: 'default',
            title: 'Descriere',
            linkTo: '/services/description'
        },
        {
            type: 'default',
            title: 'Canapele',
            linkTo: '/services/sofas'
        },
        {
            type: 'default',
            title: 'Saltele',
            linkTo: '/services/mattresses'
        },
        {
            type: 'default',
            title: 'Tapițerii auto',
            linkTo: '/services/auto'
        },
        {
            type: 'default',
            title: 'Scaune bebe',
            linkTo: '/services/babychairs'
        },
        {
            type: 'default',
            title: 'Cum facem',
            linkTo: '/services/about'
        }
    ];

    const storyBtns = [
        {
            type: 'default',
            title: 'Despre noi',
            linkTo: '/about_us'
        },
        {
            type: 'default',
            title: 'Întrebări frecvente',
            linkTo: '/questions'
        },
        {
            type: 'default',
            title: 'Galerie',
            linkTo: '/gallery'
        },
        {
            type: 'default',
            title: 'Blog',
            linkTo: '/articles'
        },
        {
            type: 'default',
            title: 'Live chat',
            linkTo: 'https://www.facebook.com/CuratareCovoareTapiterii'
        }
    ];

    const socialBtns = [
        {
            icon: faFacebookF,
            color: '#ffffff',
            className: 'icon',
            href: 'https://www.facebook.com/sharer/sharer.php?u=https://curatarecovoaretapiterii.com'
        },
        {
            icon: faTwitter,
            color: '#ffffff',
            className: 'icon',
            href: 'https://twitter.com/home?status=https://curatarecovoaretapiterii.com'
        },
        {
            icon: faInstagram,
            color: '#ffffff',
            className: 'icon',
            href: 'https://www.linkedin.com/shareArticle?mini=true&url=https://curatarecovoaretapiterii.com&title=&summary=&source='
        },
        {
            icon: faYoutube,
            color: '#ffffff',
            className: 'icon',
            href: 'https://www.youtube.com/embed/tgbNymZ7vqY'
        }
    ];


    const buttonClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <footer className='site-footer'>
            <div className='site-footer__wrapper site-footer__wrapper--grey-dark container'>
                <div className='site-footer__container row'>
                    <div className='site-footer__links-section col-5 col-md-4'>
                        <div className='links links__services'>
                            <h2 className='headline'>Servicii</h2>
                            <div className='content'>
                                {servicesBtns.map((serviceBtn, index) => {
                                    const {type, title, linkTo} = serviceBtn;

                                    return <MyButton
                                        key={index}
                                        type={type}
                                        title={title}
                                        linkTo={linkTo}
                                        onClick={buttonClick}
                                    />;
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='site-footer__links-section col-7 col-md-4'>
                        <div className='links links__story'>
                            <h2 className='headline'>Povestea noastră</h2>
                            <div className='content'>
                                {storyBtns.map((storyBtn, index) => {
                                    const {type, title, linkTo} = storyBtn;

                                    return <MyButton
                                        key={index}
                                        type={type}
                                        title={title}
                                        linkTo={linkTo}
                                        onClick={buttonClick}
                                    />;
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='site-footer__links-section col-12 col-md-4'>
                        <div className='links links__social'>
                            <h2 className='headline'>Social media</h2>
                            <div className='content'>
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
                </div>
            </div>
        </footer>
    );
};

export default Footer;
