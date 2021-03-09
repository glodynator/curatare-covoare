import React, { Component } from 'react';
import { connect } from 'react-redux';

import { resetPassword } from '../../store/actions/user_actions';

import FormField from "../utils/formFields";
import {validate} from "../utils/misc";

class ResetPassword extends Component {
  state = {
    isReset: false,
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

  submitForm(event) {
    event.preventDefault();

    let dataToSubmit = {};
    let formIsValid = true;

    for(let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
      formIsValid = this.state.formData[key].valid && formIsValid;
    }

    if(formIsValid) {
      this.props.resetPassword( dataToSubmit.email )
        .then(response => {
          if(response) {
            this.setState({
              isReset: true
            });
          }
        });
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
          <div className='wrapper auth_wrapper col-12 col-md-4 mx-auto'>
            <form onSubmit={(event)=> this.submitForm(event)}>
              <h2>Password reset</h2>
              <FormField
                id={'email'}
                formData={this.state.formData.email}
                change={(element)=> this.updateForm(element)}
              />
              <button className='btn btn-outline-primary' onClick={(event)=> this.submitForm(event)}>Reset</button>
              { this.state.isReset ?
                <div className='success_label'>The password has been reset. Please check your email.</div>
                :null
              }
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: user => dispatch(resetPassword(user))
  };
};

export default connect(null, mapDispatchToProps)(ResetPassword);
