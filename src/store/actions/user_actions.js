import { LOGIN_USER, LOGIN_USER_ERROR, LOGOUT_USER, LOGOUT_USER_ERROR, REGISTER_USER, REGISTER_USER_ERROR, RESET_PASSWORD } from "./types";

export const registerUser = user => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        return firebase.auth().createUserWithEmailAndPassword(
            user.email,
            user.password
        ).then(response => {
            dispatch({ type: REGISTER_USER, payload: response.user });
            return response.user;
        }).catch(error => {
            dispatch({ type: REGISTER_USER_ERROR });
            return error;
        });
    };
};

export const signInUser = user => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        return firebase.auth().signInWithEmailAndPassword(
            user.email,
            user.password
        ).then(response => {
            dispatch({ type: LOGIN_USER, payload: response.user });
            return response;
        }).catch(error => {
            dispatch({ type: LOGIN_USER_ERROR });
            return error;
        });
    };
};

export const signOutUser = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        return firebase.auth().signOut().then(response => {
            dispatch({ type: LOGOUT_USER, payload: response });
        }).catch(error => {
            dispatch({ type: LOGOUT_USER_ERROR });
        });
    };
};

export const resetPassword = email => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        let reset = false;

        return firebase.auth().fetchSignInMethodsForEmail(email).then(response => {
            if(response.length > 0 && response[0] === 'password') {
                reset = firebase.auth().sendPasswordResetEmail(email).then(() => {
                    dispatch({ type: RESET_PASSWORD, payload: true });
                    return true;
                });
            }
            return reset;
        }).catch(error => {
            dispatch({ type: LOGOUT_USER_ERROR });
            return error;
        });
    };
};
