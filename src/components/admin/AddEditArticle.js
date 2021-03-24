import React, { Component } from 'react';
import { connect } from 'react-redux';

import firebase from '../../firebase';

import { addArticle, getArticle, updateArticle } from '../../store/actions/article_actions';

import FormField from '../utils/formFields';
import { validate } from '../utils/misc';
import FileUploader from '../utils/fileUploader';
import ConfigMenu from './ConfigMenu';

class AddEditArticle extends Component {
    state = {
        articleId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formData: {
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
                    required: true
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
                    required: true
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
                    required: true
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
        }
    };

    componentDidMount() {
        const articleId = this.props.match.params.id;

        if(!articleId) {
            // Add article
            this.updateFields( false, 'Adauga Articol');
        } else {
            // Edit article
            this.props.getArticle(articleId)
                .then(response => {
                    firebase.storage().ref('articles')
                        .child(response.image).getDownloadURL()
                        .then(url => {
                            this.updateFields(response, 'Editeaza Articol', articleId, url);
                        })
                        .catch(err => {
                            this.updateFields({...response, image: ''},  'Editeaza Articol', articleId);
                        });
                });
        }
    }

    updateFields(article, type, articleId, defaultImg) {
        const newFormData = {
            ...this.state.formData
        };

        for(let key in newFormData) {
            if(article) {
                newFormData[key].value = article[key];
                newFormData[key].valid = true;
            }
        }

        this.setState({
            articleId,
            defaultImg,
            formType: type,
            formData: newFormData
        });
    }

    updateForm(element, content = ''){
        const newFormData = {...this.state.formData};
        const newElement = { ...newFormData[element.id]};

        if(content === '') {
            newElement.value = element.event.target.value;
        } else {
            newElement.value = content;
        }

        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormData[element.id] = newElement;

        this.setState({
            formError: false,
            formData: newFormData
        });
    }

    successForm(message){
        this.setState({
            formSuccess: message
        });

        setTimeout(() => {
            this.setState({
                formSuccess: ''
            });
            this.props.history.push(`/article/${this.state.articleId}`);
        }, 2000);
    }

    resetImage = () => {
        const newFormData = {...this.state.formData};

        newFormData['image'].value = '';
        newFormData['image'].valid = false;
        this.setState({
            defaultImg: '',
            formData: newFormData
        });
    };

    storeFilename = (filename) => {
        this.updateForm({id: 'image'}, filename);
    };

    submitForm(event){
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formData){
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        dataToSubmit['date'] = new Date(Date.now()).toDateString();

        if(formIsValid){
            if(this.state.formType === 'Editeaza Articol') {
                this.props.updateArticle(this.state.articleId, dataToSubmit)
                    .then(response => {
                        this.successForm('Articolul a fost modificat cu success!');
                    })
                    .catch(error => {
                        this.setState({ formError: true })
                    });
            } else {
                this.props.addArticle(dataToSubmit)
                    .then(response => {
                        this.props.history.push('/articles');
                    });
            }
        } else {
            this.setState({
                formError: true
            });
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className="config-menu__wrapper col-12 col-md-3">
                        <ConfigMenu/>
                    </div>
                    <div className='col-12 col-md-9'>
                        <div className='wrapper form_wrapper'>
                            <h2 className='form_title'>{this.state.formType}</h2>
                            <div className='form_container'>
                                <form onSubmit={(event) => this.submitForm(event)}>
                                    <FileUploader
                                        dir='articles'
                                        tag={'Imagine articol'}
                                        defaultImg={this.state.defaultImg}
                                        defaultImgName={this.state.formData.image.value}
                                        resetImage={() => this.resetImage()}
                                        filename={(filename) => this.storeFilename(filename)}
                                    />
                                    <FormField
                                        id={'title'}
                                        formData={this.state.formData.title}
                                        change={(element)=> this.updateForm(element)}
                                    />
                                    <FormField
                                        id={'description'}
                                        formData={this.state.formData.description}
                                        change={(element)=> this.updateForm(element)}
                                    />
                                    <div className="success_label">{this.state.formSuccess}</div>
                                    {this.state.formError ?
                                        <div className="error_label">
                                            A avut loc o eroare! Incercati din nou.
                                        </div>
                                        : ''
                                    }
                                    <button className='btn btn-outline-success' onClick={(event)=> this.submitForm(event)}>
                                        {this.state.formType}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addArticle: article => dispatch(addArticle(article)),
        getArticle: id => dispatch(getArticle(id)),
        updateArticle: (id, article) => dispatch(updateArticle(id, article))
    };
};

export default connect(null, mapDispatchToProps)(AddEditArticle);