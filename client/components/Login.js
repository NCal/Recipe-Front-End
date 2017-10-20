import React from 'react';
import { Route, Redirect } from 'react-router';
export default class Login extends React.Component {
   constructor(props) {
      super(props);
      
      this.state = {
        loginMessage: null,
        emailMessage: null,
        passMessage: null,
        passValid: false,
        emailValid: false,
        color: 'red'
      };
   }

   regexEmail = (email) => {
      const emailRegex = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
      return emailRegex.test(email);
   }

   formSubmit = (e) => {
      e.preventDefault();
      this.validate();
   }

  validate = (e) => {
    const emailVal = e.target.value;
      if (this.regexEmail(emailVal)){
        this.setState({emailMessage: 'Email is valid!', emailValid: true, loginColor: '#91c11e'})
      }else {
        this.setState({emailMessage: 'Email is invalid', emailValid: false, loginColor: 'red'})
      }
  }

  validatePass = (e) => {
    const passVal = e.target.value;
    passVal !== '' ? this.setState({passMessage: 'valid', passValid: true}) : this.setState({passMessage: null, passValid: false});
  }

  login = (e) =>{
    e.preventDefault();
    if (this.state.emailValid && this.state.passValid){
      this.setState({loginMessage: 'user is validated', color: '#91c11e'});
    } else {
      this.setState({loginMessage: 'user is not validated', color: 'red'});
    }
  }

  render = () => {
      return (
        <div className='login-form-container'>
          <form className='login-form' onSubmit={this.formSubmit}>
            <fieldset>
                <legend>Login</legend> 
                <p>Delicious recipes and pre-measured ingredients delivered straight to your door</p>
                <img className='food-basket' src='../assets/basket.png' alt='food basket'/>
                <div className='login-inputs'>
                  <input className='email-input' type='text' name='email' placeholder='Email' onChange={this.validate}/>
                  <input className='password-input' type='password' name='password' placeholder='Password' onChange={this.validatePass}/>

                  <input className='login-button' type='submit' value='Login' onClick={this.login}/>
                </div>
                <div className='login-message' style={{color: `${this.state.color}`}}>
                  <p>{this.state.loginMessage}</p>
                </div>
              </fieldset>
           </form>
        </div>);
    }
}
