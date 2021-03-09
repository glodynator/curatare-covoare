import {ADD_SUBSCRIBER, GET_SUBSCRIBERS} from './types';
import emailjs from 'emailjs-com';

const EMAILJS_USER_ID = 'user_LxJN73Usz2Pow57WMiKkz';
const EMAILJS_SERVICE_ID = 'service_3al3r5r';
const EMAILJS_TEMPLATE_ID = 'template_d05upxd';
const emailjsInitialized = false;

export const addSubscriber = subscriber => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();

        return firestore.collection('subscribers').get()
            .then(querySnapshot => {
                let isSubscribed = false;
                querySnapshot.forEach(doc => {
                    if(doc.data().email === subscriber.email) {
                        isSubscribed = true;
                    }
                });

                if(!isSubscribed) {
                    return firestore.collection('subscribers').add({
                        ...subscriber
                    }).then(() => {
                        dispatch({ type: ADD_SUBSCRIBER });
                        return { messageType: 'success', message: 'V-ati abonat cu succes.' };
                    }).catch(err => {
                        console.log('add subscriber error: ', err);
                    });
                } else {
                    let promise = new Promise((function (resolve, reject) {
                        resolve('Sunteti deja abonat!');
                    }));
                    return promise.then(response => {
                        return { messageType: 'fail', message: response };
                    });
                }
            });
    };
};

export const getSubscribers = () => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();

        return firestore.collection('subscribers').get()
            .then( response => {
                dispatch({ type: GET_SUBSCRIBERS, payload: response });
                return response;
            });
    };
};

export const notifySubscribers = (text, templateId = EMAILJS_TEMPLATE_ID) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();

        return firestore.collection('subscribers').get()
            .then( response => {
                if (response) {
                    if (!emailjsInitialized) {
                        emailjs.init(EMAILJS_USER_ID);
                    }

                    response.forEach((doc)=>{
                        emailjs.send(EMAILJS_SERVICE_ID, templateId, {message: text, reply_to: doc.data().email.toString()})
                            .then(emailResponse => console.log('success: ', emailResponse),
                                error => console.log(error));
                    });
                }

                return true;
            });
    };
};