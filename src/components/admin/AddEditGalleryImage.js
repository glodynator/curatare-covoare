import React, { Component } from 'react';
import { connect } from 'react-redux';

import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';

import firebase from '../../firebase';

import { addGalleryImage, getGalleryImage, updateGalleryImage } from '../../store/actions/gallery_actions';

import FormField from '../utils/formFields';
import { validate } from '../utils/misc';
import FileUploader from '../utils/fileUploader';
import ConfigMenu from './ConfigMenu';

class AddEditGalleryImage extends Component {
    state = {
        imageId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        defaultImg: '',
        formData: {
            title: {
                element: 'input',
                value: '',
                config: {
                    label: 'Titlu imagine',
                    name: 'title_input',
                    type: 'text',
                    placeholder: 'Introduceti titlul imaginii'
                },
                validation: {
                    required: false
                },
                valid: true,
                validationMessage: '',
                showLabel: true
            },
            section: {
                element: 'select',
                value: '',
                config: {
                    label: 'Tip poza',
                    name: 'section_select',
                    type: 'select',
                    placeholder: 'Tip poza'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
            },
            date: {
                element: 'input',
                value: '',
                config: {
                    label: 'Data imagine',
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

    componentDidMount(){
        const imageId = this.props.match.params.id;

        if(!imageId) {
            // Add article
            this.updateFields( false, 'Adauga Imagine Galerie');
        } else {
            // Edit article
            this.props.getGalleryImage(imageId)
                .then(response => {
                    firebase.storage().ref('gallery')
                        .child(response.image).getDownloadURL()
                        .then(url => {
                            this.updateFields(response, 'Editeaza Imagine Galerie', imageId, url);
                        })
                        .catch(err => {
                            this.updateFields({...response, image: ''},  'Editeaza Imagine Galerie', imageId);
                        });
                });
        }
    }

    updateFields(image, type, imageId, defaultImg) {
        const newFormData = {
            ...this.state.formData
        };

        for(let key in newFormData) {
            if(image) {
                newFormData[key].value = image[key];
                newFormData[key].valid = true;
            }
        }

        this.setState({
            imageId,
            defaultImg,
            formType: type,
            formData: newFormData
        });
    }

    onTypeChange (name) {
        return event => {
            this.updateForm({
                event,
                id: event.target.id
            });
        };
    };

    updateForm(element, content = '') {
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
            this.props.history.push(`/gallery`);
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
            if(this.state.formType === 'Editeaza Imagine Galerie') {
                this.props.updateGalleryImage(this.state.imageId, dataToSubmit)
                    .then(response => {
                        this.successForm('Imaginea a fost modificata cu success!');
                    })
                    .catch(error => {
                        this.setState({ formError: true })
                    });
            } else {
                this.props.addGalleryImage(dataToSubmit)
                    .then(response => {
                        this.props.history.push('/gallery');
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
            <div className='container gallery-add'>
                <div className='row'>
                    <div className="config-menu__wrapper  col-12 col-md-3">
                        <ConfigMenu/>
                    </div>
                    <div className='col-12 col-md-9'>
                        <div className='wrapper form_wrapper'>
                            <h2 className='form_title'>{this.state.formType}</h2>
                            <div className='form_container'>
                                <form onSubmit={(event) => this.submitForm(event)}>
                                    <FileUploader
                                        dir='gallery'
                                        tag={'Imagine galerie'}
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
                                    <FormControl>
                                        <InputLabel>Tip poza</InputLabel>
                                        <NativeSelect
                                            value={this.state.formData.section.value}
                                            onChange={this.onTypeChange(this.state.formData.section.config.name)}
                                            inputProps={{
                                                name: this.state.formData.section.config.label,
                                                id: 'section'
                                            }}
                                        >
                                            <option value=''/>
                                            <option value='canapea'>Canapea</option>
                                            <option value='covor'>Covor</option>
                                            <option value='piele'>Piele</option>
                                            <option value='fotoliu'>Fotoliu</option>
                                            <option value='gradinita'>Gradinita</option>
                                            <option value='saltea'>Saltea</option>
                                            <option value='scaun'>Scaun</option>
                                            <option value='auto'>Auto</option>
                                        </NativeSelect>
                                    </FormControl>
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
        addGalleryImage: gallery_image => dispatch(addGalleryImage(gallery_image)),
        getGalleryImage: id => dispatch(getGalleryImage(id)),
        updateGalleryImage: (id, gallery_image) => dispatch(updateGalleryImage(id, gallery_image))
    };
};

export default connect(null, mapDispatchToProps)(AddEditGalleryImage);