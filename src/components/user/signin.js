import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import { signInUser } from '../../store/actions/user_actions';

import FormField from '../utils/formFields';
import { validate } from '../utils/misc';

class SignIn extends Component {
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
      this.props.signInUser({ email: dataToSubmit.email, password: dataToSubmit.password })
        .then(response => {
          if(!response.user) {
            this.setState({
              formError: response.message
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
              <h2>Please Login</h2>
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
              <div className='reset_container'>
                <p>Forgot password ?</p>
                <Link to="/reset_password">
                  <Button variant='contained' style={{fontWeight: 'bold', color: "black"}}>Reset</Button>
                </Link>
              </div>
              { this.state.formError ?
                <div className='error_label'>{this.state.formError}</div>
                :null
              }
              <button className='btn btn-outline-primary' onClick={(event)=> this.submitForm(event)}>Log in</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signInUser: user => dispatch(signInUser(user))
  };
};

export default connect(null, mapDispatchToProps)(SignIn);