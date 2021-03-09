import firebase from 'firebase/app';
import 'firebase/firestore';
//import 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

/**
 * Test config
*/
/*const fbConfig = {
    apiKey: "AIzaSyBDC_XVjXywOa5VSlRsumPI8nlINkIDtSI",
    authDomain: "cleaning-site-7bf6e.firebaseapp.com",
    databaseURL: "https://cleaning-site-7bf6e.firebaseio.com",
    projectId: "cleaning-site-7bf6e",
    storageBucket: "cleaning-site-7bf6e.appspot.com",
    messagingSenderId: "461315227661",
    appId: "1:461315227661:web:336fdc44de24fda2"
};*/

/**
 * Live config
 */
const fbConfig = {
    apiKey: "AIzaSyDOjsvgvb5w82yMYyieYxzIu-t6jAyB1vU",
    authDomain: "curatare-covoare-tapiterii.firebaseapp.com",
    databaseURL: "https://curatare-covoare-tapiterii.firebaseio.com",
    projectId: "curatare-covoare-tapiterii",
    storageBucket: "curatare-covoare-tapiterii.appspot.com",
    messagingSenderId: "196496046228",
    appId: "1:196496046228:web:44ae6bf0a508a3b3505c81",
    measurementId: "G-2PCTJJKNB1"
};

firebase.initializeApp(fbConfig);
firebase.firestore();

export default firebase;