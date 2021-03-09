import { ADD_ACCOUNT_SUCCESS, ADD_ACCOUNT_ERROR } from './types';

export const addAccount = account => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    console.log('add account: ', account);
    return firestore.collection('accounts').doc(`${account.userId}`).set({
      ...account
    }).then(() => {
      console.log('add account success');
      dispatch({ type: ADD_ACCOUNT_SUCCESS });
    }).catch(err => {
      console.log('add account error');
      dispatch({ type: ADD_ACCOUNT_ERROR });
    });
  };
};