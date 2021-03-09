import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addSubscriber } from '../../../store/actions/subscriber_actions';
import FormField from '../../utils/formFields';
import { validate } from '../../utils/misc';

class SubscriptionSection extends Component {
    state ={
        message: '',
        messageType: '',
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    label: 'E-mail',
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Introduceți adresa e-mail'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            }
        }
    };

    updateForm(element) {
        const newFormData = {...this.state.formData};
        const newElement = { ...newFormData[element.id]};

        newElement.value = element.event.target.value;

        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormData[element.id] = newElement;

        this.setState({
            formError: false,
            formData: newFormData
        });
    }

    submitForm(event){
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if(formIsValid) {
            this.props.addSubscriber({ email: dataToSubmit.email })
                .then(response => {
                    this.setState({
                        message: response.message,
                        messageType: response.messageType
                    });

                    setTimeout(() => {
                        this.setState({
                            message: '',
                            messageType: ''
                        });
                    }, 2000);
                });
        }
    }
    render() {
        return (
            <form className='aside-section'>
                <h4 className='aside-section__headline'>Fi la curent cu oferte / sfaturi</h4>
                <p>Lasă-ne adresa ta de e-mail și te ținem la curent cu cele mai noi oferte. Nu rata o curățenie impecabilă la cel mai bun preț pentru tine!</p>
                <FormField
                    id={'email'}
                    formData={this.state.formData.email}
                    change={(element)=> this.updateForm(element)}
                />
                { this.state.message !== '' ?
                    <p className={this.state.messageType}>{this.state.message}</p>
                    : null
                }
                <button onClick={(event)=> this.submitForm(event)}>Înscriere</button>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addSubscriber: subscriber => dispatch(addSubscriber(subscriber))
    };
};

export default connect(null, mapDispatchToProps)(SubscriptionSection);