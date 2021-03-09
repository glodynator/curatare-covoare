import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addAccount } from '../../store/actions/account_actions';
import { registerUser, signInUser } from '../../store/actions/user_actions';

import FormField from '../utils/formFields';
import { validate } from '../utils/misc';

class Register extends Component {
  state = {
    formError: false,
    formSuccess: '',
    formData: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Introduceti adresa email'
        },
        validation:{
          required: true,
          email: true
        },
        valid: false,
        validationMessage: ''
      },
      password:{
        element: 'input',
        value: '',
        config:{
          name: 'password_input',
          type: 'password',
          placeholder: 'Introduceti parola'
        },
        validation:{
          required: true
        },
        valid: false,
        validationMessage: ''
      },
      passwordConfirm:{
        element: 'input',
        value: '',
        config:{
          name: 'password_confirm_input',
          type: 'password',
          placeholder: 'Confirmati parola'
        },
        validation:{
          required: true
        },
        valid: false,
        validationMessage: '',
        confirmationMessage: 'Parola de confirmare nu coincide cu cea initiala'
      },
      username:{
        element: 'input',
        value: '',
        config:{
          name: 'name_input',
          type: 'text',
          placeholder: 'Introduceti nume utilizator'
        },
        validation:{
          required: true
        },
        valid: false,
        validationMessage: ''
      },
      phone:{
        element: 'input',
        value: '',
        config:{
          name: 'phone_input',
          type: 'text',
          placeholder: 'Introduceti nr de telefon'
        },
        validation:{
          required: false
        },
        valid: true,
        validationMessage: ''
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

  addAccountInfo(userId, email, username, phone) {
    this.props.addAccount({ userId, email, username, phone });
  }

  submitForm(event) {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;
    let formErrorMessage = '';

    for(let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if (dataToSubmit.password !== '' && dataToSubmit.passwordConfirm !== '' && dataToSubmit.password !== dataToSubmit.passwordConfirm) {
      formIsValid = false;
      formErrorMessage = this.state.formData.passwordConfirm.confirmationMessage;
    }

    if(formIsValid) {
      this.props.registerUser({ email: dataToSubmit.email, password: dataToSubmit.password })
        .then(response => {
          console.log('props.registerUser -> response: ', response);

          this.props.signInUser({ email: dataToSubmit.email, password: dataToSubmit.password })
              .then(userResponse => {
                console.log('props.signInUser -> userResponse: ', userResponse);
                console.log('props.signInUser -> userResponse uid: ', userResponse.user.uid);
                if (userResponse.user.uid) {
                  this.addAccountInfo(userResponse.user.uid, dataToSubmit.email, dataToSubmit.username, dataToSubmit.phone);
                } else {
                  this.setState({
                    formError: userResponse.message
                  });
                }
              })
              .catch(error => {
                console.log('error signIn -> ', error);
              });
        });
    } else {
      if (formErrorMessage !== '') {
        this.setState({
          formError: formErrorMessage
        });
      } else {
        this.setState({
          formError: true
        });
      }
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='wrapper auth_wrapper col-12 col-md-6 mx-auto'>
            <form onSubmit={(event)=> this.submitForm(event)}>
              <h2>Please Register</h2>
              <FormField
                id={'email'}
                formData={this.state.formData.email}
                change={(element)=> this.updateForm(element)}
              />
              <FormField
                id={'password'}
                formData={this.state.formData.password}
                change={(element)=> this.updateForm(element)}
              />
              <FormField
                id={'passwordConfirm'}
                formData={this.state.formData.passwordConfirm}
                change={(element)=> this.updateForm(element)}
              />
              <FormField
                id={'username'}
                formData={this.state.formData.username}
                change={(element)=> this.updateForm(element)}
              />
              <FormField
                id={'phone'}
                formData={this.state.formData.phone}
                change={(element)=> this.updateForm(element)}
              />
              { this.state.formError ?
                <div className='error_label'>{this.state.formError}</div>
                :null
              }
              <button className='btn btn-outline-primary' onClick={(event)=> this.submitForm(event)}>Sign up</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addAccount: member => dispatch(addAccount(member)),
    registerUser: user => dispatch(registerUser(user)),
    signInUser: user => dispatch(signInUser(user))
  };
};

export default connect(null, mapDispatchToProps)(Register);