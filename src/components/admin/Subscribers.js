import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSubscribers, notifySubscribers } from "../../store/actions/subscriber_actions";
import {firestoreLooper, reverseArray, validate} from "../utils/misc";
import FormField from "../utils/formFields";

class Subscribers extends Component {
    state = {
        success: '',
        formError: false,
        message: '',
        messageType: '',
        formData: {
            emailContent: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'Conținut e-mail',
                    name: 'email_content',
                    type: 'text',
                    placeholder: 'Introduceți conținutul e-mailului'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            }
        }
    };

    updateForm(element){
        const newFormData = {...this.state.formData};
        const newElement = { ...newFormData[element.id]};

        newElement.value = element.event.target.value;

        console.log('newElement: ', newElement);

        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormData[element.id] = newElement;

        this.setState({
            formError: false,
            formData: newFormData
        });
    }

    sendEmail(event) {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formData){
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if(formIsValid) {
            this.props.notifySubscribers(dataToSubmit.emailContent)
                .then(response => {
                    this.setState({
                        message: 'E-mailul a fost trimis.',
                        messageType: 'success'
                    });

                    setTimeout(() => {
                        this.setState({
                            message: '',
                            messageType: ''
                        });
                        this.props.history.push('/user_profile');
                    }, 2000);
                });
        }
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='wrapper form_wrapper'>
                            <h2 className='form_title'>Informare abonați</h2>
                            { this.state.message === '' ?
                                <div className='form_container'>
                                    <form onSubmit={(event) => this.sendEmail(event)}>
                                        <FormField
                                            id={'emailContent'}
                                            formData={this.state.formData.emailContent}
                                            change={(element)=> this.updateForm(element)}
                                        />
                                        <button className='btn btn-outline-success' onClick={(event)=> this.sendEmail(event)}>
                                            Trimiteți
                                        </button>
                                    </form>
                                </div>
                                : <p className={this.state.messageType}>{this.state.message}</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSubscribers: () => dispatch(getSubscribers()),
        notifySubscribers: (text, templateId) => dispatch(notifySubscribers(text, templateId))
    };
};

export default connect(null, mapDispatchToProps)(Subscribers);