import { ADD_GALLERY_IMAGE_SUCCESS, ADD_GALLERY_IMAGE_ERROR, GET_GALLERY_IMAGES, GET_GALLERY_IMAGE, UPDATE_GALLERY_IMAGE, DELETE_GALLERY_IMAGE } from './types';

export const addGalleryImage = gallery_image => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        let userId = firebase.auth().currentUser.uid;

        console.log('addGalleryImage -> currentUser: ', firebase.auth().currentUser);

        return firestore.collection('accounts').doc(userId).get()
            .then(response => {
                console.log('addGalleryImage -> response: ', response);

                let user = response.data().username;

                firestore.collection('gallery').add({
                    userId,
                    user,
                    ...gallery_image,
                    timestamp: Date.now()
                }).then(response => {
                    dispatch({ type: ADD_GALLERY_IMAGE_SUCCESS, payload: response });
                }).catch(error => {
                    dispatch({ type: ADD_GALLERY_IMAGE_ERROR });
                });
            });
    };
};

export const getGalleryImage = id => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();

        return firestore.collection('gallery').doc(id).get()
            .then( response => {
                if(response.exists) {
                    dispatch({ type: GET_GALLERY_IMAGE, payload: response.data() });
                    return {
                        id,
                        ...response.data()
                    };
                } else {
                    dispatch({ type: GET_GALLERY_IMAGE, payload: "Gallery image not found" });
                    return "Gallery image not found";
                }
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const updateGalleryImage = (id, gallery_image) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();

        return firestore.collection('articles').doc(id).update(gallery_image)
            .then( response => {
                dispatch({ type: UPDATE_GALLERY_IMAGE, payload: true });
                return true;
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: UPDATE_GALLERY_IMAGE, payload: false });
                return true;
            });
    };
};

export const deleteGalleryImage = id => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();

        return firestore.collection('gallery').doc(id).delete()
            .then( response => {
                dispatch({ type: DELETE_GALLERY_IMAGE, payload: "Gallery image deleted" });
                return "Gallery image Deleted";
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const getGalleryImages = (limit = 0, section = '') => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();

        if(limit !== 0) {
            if(section !== '') {
                return firestore.collection('gallery').orderBy('timestamp', 'desc').where('section', '==', section).limit(limit).get()
                    .then( response => {
                        dispatch({ type: GET_GALLERY_IMAGES, payload: response });
                        return response;
                    });
            } else {
                return firestore.collection('gallery').orderBy('timestamp', 'desc').limit(limit).get()
                    .then( response => {
                        dispatch({ type: GET_GALLERY_IMAGES, payload: response });
                        return response;
                    });
            }
        } else {
            if(section !== '') {
                return firestore.collection('gallery').orderBy('timestamp', 'desc').where('section', '==', section).get()
                    .then( response => {
                        dispatch({ type: GET_GALLERY_IMAGES, payload: response });
                        return response;
                    });
            } else {
                return firestore.collection('gallery').orderBy('timestamp', 'desc').get()
                    .then( response => {
                        dispatch({ type: GET_GALLERY_IMAGES, payload: response });
                        return response;
                    });
            }
        }
    };
};