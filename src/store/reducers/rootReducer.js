import userReducer from './userReducer';
import accountReducer from './accountReducer';
import subscriberReducer from './subscriberReducer';

import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  auth: userReducer,
  accountReducer,
  subscriberReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;