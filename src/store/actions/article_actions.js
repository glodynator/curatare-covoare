import { ADD_ARTICLE_SUCCESS, ADD_ARTICLE_ERROR, GET_ARTICLES, GET_ARTICLE, UPDATE_ARTICLE, DELETE_ARTICLE } from './types';

export const addArticle = article => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    let userId = firebase.auth().currentUser.uid;

    console.log('addArticle -> article: ', article);
    console.log('addArticle -> userId: ', userId);

    return firestore.collection('accounts').doc(userId).get()
      .then(response => {
        let user = response.data().username;

        console.log('addArticle -> user: ', user);

        firestore.collection('articles').add({
          userId,
          user,
          ...article,
          timestamp: Date.now()
        }).then(response => {
          dispatch({ type: ADD_ARTICLE_SUCCESS, payload: response });
        }).catch(error => {
          dispatch({ type: ADD_ARTICLE_ERROR });
        });
      });
  };
};

export const getArticle = id => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    return firestore.collection('articles').doc(id).get()
      .then( response => {
        if(response.exists) {
          dispatch({ type: GET_ARTICLE, payload: response.data() });
          return {
              id,
              ...response.data()
          };
        } else {
          dispatch({ type: GET_ARTICLE, payload: "Article not found" });
          return "Article not found";
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const updateArticle = (id, article) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    return firestore.collection('articles').doc(id).update(article)
      .then( response => {
        dispatch({ type: UPDATE_ARTICLE, payload: true });
        return true;
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: UPDATE_ARTICLE, payload: false });
        return true;
      });
  };
};

export const deleteArticle = id => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    return firestore.collection('articles').doc(id).delete()
      .then( response => {
        dispatch({ type: DELETE_ARTICLE, payload: "Article deleted" });
        return "Article Deleted";
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const getArticles = (limit = 0) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    console.log('get limit: ', limit);

    if(limit !== 0) {
        return firestore.collection('articles').orderBy('timestamp', 'desc').limit(limit).get()
            .then( response => {
                dispatch({ type: GET_ARTICLES, payload: response });
                return response;
            });
    } else {
        return firestore.collection('articles').orderBy('timestamp', 'desc').get()
            .then( response => {
                dispatch({ type: GET_ARTICLES, payload: response });
                return response;
            });
    }
  };
};