import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';

import firebase from '../../firebase';

import { addArticle, getArticle, updateArticle } from '../../store/actions/article_actions';
import ConfigMenu from './ConfigMenu';
import FileUploader from '../utils/fileUploader';
import FormField from '../utils/formField';

export default function AddEditArticleHook(props) {
    let history = useHistory();
    const [articleId, setArticleId] = useState('');
    const [formType, setFormType] = useState('');
    const [formError, setFormError] = useState(false);
    const [formSuccess, setFormSuccess] = useState('');
    const [defaultImg, setDefaultImg] = useState('');
    const [formData, setFormData] = useState({
        title: {
            element: 'input',
            value: '',
            config: {
                label: 'Titlu articol',
                name: 'title_input',
                type: 'text',
                placeholder: 'Introduceti titlul articolului'
            },
            validation: {
                required: true,
                message: 'Mesaj eroare'
            },
            valid: false,
            validationMessage: '',
            showLabel: true
        },
        description: {
            element: 'textarea',
            value: '',
            config: {
                label: 'Cuprins articol',
                name: 'description_input',
                type: 'text',
                placeholder: 'Introduceti cuprinsul articolului'
            },
            validation: {
                required: true,
                message: 'Mesaj eroare'
            },
            valid: false,
            validationMessage: '',
            showLabel: true
        },
        date: {
            element: 'input',
            value: '',
            config: {
                label: 'Article date',
                name: 'date_input',
                type: 'date'
            },
            validation: {
                required: true,
                message: 'Mesaj eroare'
            },
            valid: true
        },
        image: {
            element: 'image',
            value: '',
            validation: {
                required: false
            },
            valid: true
        }
    });
    const { handleSubmit } = useForm();
    const dispatch = useDispatch();

    const getBlogArticle = useCallback(
        (id) => dispatch(getArticle(id)),
        [dispatch]
    );

    const addBlogArticle = useCallback(
        (article) => dispatch(addArticle(article)),
        [dispatch]
    );

    const updateBlogArticle = useCallback(
        (id, article) => dispatch(updateArticle(id, article)),
        [dispatch]
    );


    useEffect(() => {
        const articleId = props.match.params.id;

        if(!articleId) {
            // Add article
            updateFields( false, 'Adauga Articol');
        } else {
            // Edit article
            getBlogArticle(props.match.params.id)
                .then(article => {
                    firebase.storage().ref('articles')
                        .child(article.image).getDownloadURL()
                        .then(url => {
                            updateFields(article, 'Editeaza Articol', articleId, url);
                        })
                        .catch(err => {
                            updateFields({...article, image: ''},  'Editeaza Articol', articleId);
                        });
                });
        }
    }, []);

    const updateFields = (article, formType, articleId, defaultImg) => {
        const newFormData = {...formData};

        for(let key in newFormData) {
            if(article) {
                newFormData[key].value = article[key];
                newFormData[key].valid = true;
            }
        }

        setArticleId(articleId);
        setDefaultImg(defaultImg);
        setFormType(formType);
        setFormData(newFormData);
    };

    const updateForm = (element, content = '') => {
        const newFormData = {...formData};
        const newElement = { ...newFormData[element.id]};

        if(content === '') {
            newElement.value = element.event.target.value;
        } else {
            newElement.value = content;
        }

        newFormData[element.id] = newElement;

        setFormData(newFormData);
    };


    const onSubmit = data => {
        console.log(data);

        if(formType === 'Editeaza Articol') {
            /*updateBlogArticle(articleId, data)
                .then(response => {
                    successForm('Articolul a fost modificat cu success!');
                })
                .catch(error => {
                    setFormError(true);
                });*/
        } else {
            /*addBlogArticle(data)
                .then(response => {
                    history.push('/articles');
                });*/
        }
    };

    const successForm = (message) => {
        //let history = useHistory();

        setFormSuccess(message);

        setTimeout(() => {
            setFormSuccess('');
            history.push(`/article/${articleId}`);
        }, 2000);
    };

    const resetImage = () => {
        const newFormData = {...formData};

        newFormData['image'].value = '';
        newFormData['image'].valid = false;

        setDefaultImg('');
        setFormData(newFormData);
    };

    const storeFilename = (filename) => {
        updateForm({id: 'image'}, filename);
    };

    return (
        /*<form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>First Name</label>
                <input type="text" name="firstName" ref={register({ required: true })} />
                {errors.firstName && <span>First name is required</span>}
                <label>Last Name</label>
                <input type="text" name="lastName" ref={register({ required: true })} />
                {errors.lastName && <span>Last name is required</span>}
            </div>
        </form>*/

        <div className='container'>
            <div className='row'>
                <div className="config-menu__wrapper col-12 col-md-3">
                    <ConfigMenu/>
                </div>
                <div className='col-12 col-md-9'>
                    <div className='wrapper form_wrapper'>
                        <h2 className='form_title'>{formType}</h2>
                        <div className='form_container'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FileUploader
                                    dir='articles'
                                    tag={'Imagine articol'}
                                    defaultImg={defaultImg}
                                    defaultImgName={formData.image.value}
                                    resetImage={() => resetImage()}
                                    filename={(filename) => storeFilename(filename)}
                                />
                                <FormField
                                    id={'title'}
                                    formData={formData.title}
                                    changeHandler={(element)=> updateForm(element)}
                                />
                                <FormField
                                    id={'description'}
                                    formData={formData.description}
                                    changeHandler={(element)=> updateForm(element)}
                                />
                                <div className="success_label">{formSuccess}</div>
                                {formError ?
                                    <div className="error_label">
                                        A avut loc o eroare! Incercati din nou.
                                    </div>
                                    : ''
                                }
                                <button className='btn btn-outline-success' type='submit'>
                                    {formType}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}