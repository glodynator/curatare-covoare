import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Truncate from 'react-truncate';

import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import firebase from '../../../firebase';
import { getArticles, deleteArticle } from '../../../store/actions/article_actions';
import { firestoreLooper, reverseArray } from '../../utils/misc';

import SideSection from '../SideSection';

export default function Articles(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [blogArticles, setBlogArticles] = useState([]);
    const dispatch = useDispatch();

    const getBlogArticles = useCallback(
        (limit) => dispatch(getArticles(limit)),
        [dispatch]
    );

    const deleteBlogArticle = useCallback(
        (id) => dispatch(deleteArticle(id)),
        [dispatch]
    );

    let limit = props.limit ? props.limit : 0;
    let user = firebase.auth().currentUser || '';

    useEffect(() => {
        console.log('check to see if reverse array is needed');
        getBlogArticles(limit)
            .then(response => {
                console.log('articles response: ', response);
                const articles = firestoreLooper(response);

                articles.forEach(article => {
                    console.log(article);
                    if(article.image) {
                        firebase.storage().ref('articles')
                            .child(article.image).getDownloadURL()
                            .then(url => {
                                article.imageUrl = url;
                                setBlogArticles(reverseArray(articles));
                            })
                            .catch(err => {
                                console.log('image not found');
                            });
                    }
                });

                setIsLoading(false);
                setBlogArticles(reverseArray(articles));
            });
    }, []);

    const onDeleteArticle = (id) => {
        deleteBlogArticle(id).then( () => {
            getBlogArticles()
                .then(response => {
                    const articles = firestoreLooper(response);

                    setBlogArticles(articles);
                });
        });
    };

    return (
        <section className='blog-articles container'>
            <div className='row'>
                <div className={props.limit ? 'col-12 px-0' : 'col-12 col-lg-8'}>
                    <div className='blog-articles__wrapper row'>
                        { blogArticles ?
                            //console.log('blogArticles: ', blogArticles);
                            ( blogArticles.length > 0 ?
                                blogArticles.map(article => (
                                    <article key={article.id} className='blog-article col-12 col-md-6'>
                                        <h3 className='blog-article__title'>
                                            <Link className='blog-article__link' to={`/article/${article.id}`}>
                                                { blogArticles ?
                                                    <Truncate lines={2} ellipsis='...' width={190}>
                                                        {article.title}
                                                    </Truncate>
                                                    :
                                                    article.title
                                                }
                                            </Link>
                                        </h3>
                                        { !article.imageUrl ?
                                            null
                                            :
                                            <div className='blog-article__image-container'>
                                                <CardMedia
                                                    component='img'
                                                    alt='Article image'
                                                    image={article.imageUrl}
                                                    className='blog-article__image'
                                                />
                                            </div>
                                        }
                                        <p className='blog-article__description'>
                                            { blogArticles ?
                                                <Truncate lines={5} ellipsis='...'>
                                                    {article.description}
                                                </Truncate>
                                                :
                                                article.description
                                            }
                                        </p>
                                        { user.uid === article.userId ?
                                            <div className='blog-article__buttons'>
                                                <Link className='article-button article-button__more btn btn-success' to={`/article/${article.id}`}>
                                                    Mai mult
                                                </Link>
                                                <Link className='article-button article-button__edit btn btn-info' to={`/edit_article/${article.id}`}>
                                                    Editeaza
                                                </Link>
                                                <Button className='article-button article-button__delete' variant='contained' color='secondary' onClick={() => onDeleteArticle(article.id)}>Sterge</Button>
                                            </div>
                                            :
                                            <div className='blog-article__buttons'>
                                                <Link className='article-button article-button__more btn btn-success' to={`/article/${article.id}`}>
                                                    Mai mult
                                                </Link>
                                            </div>
                                        }
                                    </article>
                                ))
                                : <p className='col-12'>Vă aducem informații și relatări interesante în curând...</p>
                            )
                            : null
                        }
                        <div className='progress_circle'>
                            { isLoading ?
                                <CircularProgress thickness={7} className='circle'/>
                                : ''
                            }
                        </div>
                    </div>
                </div>
                { !props.limit ?
                    <SideSection/>
                    : null
                }
            </div>
        </section>
    );
}