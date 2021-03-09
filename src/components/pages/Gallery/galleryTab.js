import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Truncate from "react-truncate";

import CardMedia from '@material-ui/core/CardMedia';
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

import firebase from '../../../firebase';
import { getGalleryImages, deleteGalleryImage } from '../../../store/actions/gallery_actions';
import { firestoreLooper, reverseArray } from "../../utils/misc";

export default function GalleryTab(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [galleryImages, setGalleryImages] = useState([]);
    const dispatch = useDispatch();

    const getImages = useCallback(
        (limit, section) => dispatch(getGalleryImages(limit, section)),
        [dispatch]
    );

    const deleteImage = useCallback(
        (id) => dispatch(deleteGalleryImage(id)),
        [dispatch]
    );

    let limit = 0;
    let user = firebase.auth().currentUser || '';

    useEffect(() => {
        getImages(limit, props.section)
            .then(response => {
                const images = firestoreLooper(response);

                images.forEach(image => {
                    if(image.image) {
                        firebase.storage().ref('gallery')
                            .child(image.image).getDownloadURL()
                            .then(url => {
                                image.imageUrl = url;
                                setGalleryImages(reverseArray(images));
                            })
                            .catch(err => {
                                console.log('image not found');
                            });
                    }
                });
                setIsLoading(false);
                setGalleryImages(reverseArray(images));
            });
    }, []);

    const onDeleteGalleryImage = (id) => {
        deleteImage(id).then( () => {
            getImages(limit, props.section)
                .then(response => {
                    const images = firestoreLooper(response);

                    setGalleryImages(reverseArray(images));
                });
        });
    };

    return (
        <section>
            <div className='row'>
                { galleryImages ?
                    galleryImages.map(image => (
                        <div key={image.id} className='gallery-image col-12 col-md-6 col-lg-4'>
                            <h3 className='gallery-image__title'>
                                { galleryImages ?
                                    <Truncate lines={2} ellipsis='...' width={190}>
                                        {image.title}
                                    </Truncate>
                                    :
                                    image.title
                                }
                            </h3>
                            { !image.imageUrl ?
                                null
                                :
                                <div className='gallery-image__container'>
                                    <CardMedia
                                        component='img'
                                        alt='Gsllery image'
                                        image={image.imageUrl}
                                        className='image'
                                    />
                                </div>
                            }
                            { user.uid === image.userId ?
                                <div className='gallery-image__buttons'>
                                    <Link className='btn btn-info image-button edit_button' to={`/edit_gallery_image/${image.id}`}>
                                        Editeaza
                                    </Link>
                                    <Button className='image-button delete_button' variant='contained' color='secondary' onClick={() => onDeleteGalleryImage(image.id)}>Sterge</Button>
                                </div>
                                :
                                null
                            }
                        </div>
                    ))
                    : null
                }
            </div>
            <div className='progress_circle'>
                { isLoading ?
                    <CircularProgress thickness={7} className='circle'/>
                    : ''
                }
            </div>
        </section>
    );
};