import React, { useState } from 'react';
import { connect } from 'react-redux';

import Input from '../../UI/Input';
import * as actions from '../../../store/actions';
import { registerData } from '../formData';

const Register = ({ error, errorMsg, onRegister }) => {
  const [formData, setFormData] = useState(registerData);

  const changeHandler = (e, identifier) => {
    const updatedFormData = { ...formData };
    const updatedFormElement = { ...updatedFormData[identifier] };
    updatedFormElement.value = e.target.value;
    updatedFormData[identifier] = updatedFormElement;
    setFormData(updatedFormData);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { password, passwordConfirmation } = formData;
    // Check if password and passwordConfirmation matches
    if (password.value !== passwordConfirmation.value) {
      alert("Passwords don't match");
    } else {
      onRegister(formData.username.value, formData.password.value);
    }
  };

  const formElementArray = [];
  for (let key in formData) {
    formElementArray.push({ id: key, config: formData[key] });
  }

  return (
    <div>
      <h1>Register</h1>
      <form method="POST" onSubmit={submitHandler}>
        {formElementArray.map((element) => (
          <Input
            key={element.id}
            elementType={element.config.elementType}
            elementConfig={element.config.elementConfig}
            value={element.config.value}
            changeHandler={(e) => changeHandler(e, element.id)}
          />
        ))}
        {error ? <p className="error">{errorMsg}</p> : null}
        <button type="submit">Register</button>
      </form>
      <p className="txt-center">
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
  error: state.auth.error,
  errorMsg: state.auth.errorMsg,
});

const mapDispatchToProps = (dispatch) => ({
  onRegister: (email, password) => dispatch(actions.register(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
