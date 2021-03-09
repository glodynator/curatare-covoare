import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';
import { getFirebase, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import rootReducer from "./store/reducers/rootReducer";

import promiseMiddleware from 'redux-promise';

import './resources/scss/style.scss';

import Routes from './routes';
import firebase from './firebase';

const storeEnhancers = compose;
const initialState = {};

const rrfConfig = {
    userProfile: "accounts",
    useFirestoreForProfile: true,
};

const store = createStore(
    rootReducer,
    initialState,
    storeEnhancers(
        applyMiddleware(promiseMiddleware, thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(firebase),
    )
);

const App = (props) => {
    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider
                firebase={firebase}
                config={rrfConfig}
                dispatch={store.dispatch}
                createFirestoreInstance={createFirestoreInstance}
            >
                <BrowserRouter>
                    <Routes {...props}/>
                </BrowserRouter>
            </ReactReduxFirebaseProvider>
        </Provider>
    )
};

firebase.auth().onAuthStateChanged((user)=>{
    ReactDOM.render(<App user={user}/>, document.getElementById('root'));
});
