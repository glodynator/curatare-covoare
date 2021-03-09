import React from 'react';

import ServicesTabs from './servicesTabs';

export default function Services() {
    return (
        <section className='services-page'>
            <div className='row'>
                <div className='col-12'>
                    <h2 className='services-page__headline'>Servicii</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <ServicesTabs/>
                </div>
            </div>
        </section>
    );
};