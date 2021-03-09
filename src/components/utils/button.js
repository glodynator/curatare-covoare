import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faShoppingBag from '@fortawesome/fontawesome-free-solid/faShoppingBag';

export default function MyButton(props) {
    const buttons = () => {
        let template = '';

        switch (props.type) {
            case 'default':
                template = <Link
                    className={!props.activeClass !== '' && props.activeClass !== undefined ? `link ${props.activeClass}` : 'link'}
                    to={props.linkTo}
                    onClick={props.onClick}
                    {...props.addStyles}
                >
                    {props.title}
                </Link>;
                break;
            case 'bag_link':
                template = <div
                    className='bag_link'
                >
                    <FontAwesomeIcon
                        icon={faShoppingBag}
                    />
                </div>;
                break;
            default:
                template = '';
        }

        return template;
    };

    return (
        <div className='button-custom'>
            {buttons()}
        </div>
    );
};
