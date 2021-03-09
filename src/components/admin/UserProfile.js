import React from 'react';

import ConfigMenu from './ConfigMenu';

export default function UserProfile() {

    return (
        <div className='container'>
            <div className='row'>
                <div className="config-menu__wrapper col-12 col-md-3">
                    <ConfigMenu/>
                </div>
                <div className="profile col-12 col-md-9">
                    Profil utilizator
                </div>
            </div>
        </div>
    );
}