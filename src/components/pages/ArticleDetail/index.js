import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";

import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button/Button';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

import firebase from '../../../firebase';

import { getArticle, deleteArticle } from '../../../store/actions/article_actions';
import SideSection from '../SideSection';

export default function ArticleDetail(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [article, setArticle] = useState([]);
    const dispatch = useDispatch();

    const getBlogArticle = useCallback(
        (id) => dispatch(getArticle(id)),
        [dispatch]
    );

    const deleteBlogArticle = useCallback(
        (id) => dispatch(deleteArticle(id)),
        [dispatch]
    );

    let user = firebase.auth().currentUser || '';

    useEffect(() => {
        getBlogArticle(props.match.params.id)
            .then(article => {
                if(article.image) {
                    firebase.storage().ref('articles')
                        .child(article.image).getDownloadURL()
                        .then(url => {
                            console.log('image url: ', url);
                            article.imageUrl = url;
                            setArticle(article);

                        })
                        .catch(err => {
                            console.log('image not found');
                        });
                }

                setIsLoading(false);
                //setArticle(article);
            });
    }, []);

    const onDeleteArticle = (id) => {
        deleteBlogArticle(id).then( () => {
            props.history.push('/articles');
        });
    };

    return (
        <section className='article-detail-page'>
            <div className='row'>
                <div className='col-8'>
                    { article && article.id ?
                        <article key={article.id} className='blog-article'>
                            <h3 className='blog-article__title'>
                                <Link className='blog-article__link' to={`/article/${article.id}`}>
                                    {article.title}
                                </Link>
                            </h3>
                            { !article.imageUrl ?
                                null
                                :
                                <div className='blog-article__image-container blog-article__image-container--full'>
                                    <CardMedia
                                        component='img'
                                        alt='Article image'
                                        image={article.imageUrl}
                                        className='blog-article__image'
                                    />
                                </div>
                            }
                            <p className='blog-article__description'>
                                {article.description}
                            </p>
                            { user.uid === article.userId ?
                                <div className='blog-article__buttons'>
                                    <Link className='article-button article-button__edit btn btn-info' to={`/edit_article/${article.id}`}>
                                        Editeaza
                                    </Link>
                                    <Button className='article-button article-button__edit' variant='contained' color='secondary' onClick={() => onDeleteArticle(article.id)}>Sterge</Button>
                                </div>
                                : null
                            }
                        </article>
                        : null
                    }
                    <div className='progress_circle'>
                        { isLoading ?
                            <CircularProgress thickness={7} className='circle'/>
                            : ''
                        }
                    </div>
                </div>
                <SideSection/>
            </div>
        </section>
    );
}