import React from 'react';

import GalleryTabs from './galleryTabs';


export default function Gallery() {
    return (
        <section className='gallery-page'>
            <div className='row'>
                <div className='col-12'>
                    <h2 className='gallery-page__headline'>Galerie foto</h2>
                    <div className='gallery-page__wrapper container'>
                        <div className='row'>
                            <div className="col-12">
                                <GalleryTabs/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};