import React, { useState } from "react";
import { connect } from "react-redux";

import Input from "../../UI/Input";
import * as actions from "../../../store/actions";
import "../Form.css";

const Login = ({ loading, error, errorMsg, onAuth }) => {
  const [formData, setFormData] = useState({
    username: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Username",
      },
      value: "",
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
    },
  });

  const changeHandler = (e, identifier) => {
    const updatedFormData = { ...formData };
    const updatedFormElement = { ...updatedFormData[identifier] };
    updatedFormElement.value = e.target.value;
    updatedFormData[identifier] = updatedFormElement;
    setFormData(updatedFormData);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onAuth(formData.username.value, formData.password.value);
  };

  const formElementArray = [];
  for (let key in formData) {
    formElementArray.push({ id: key, config: formData[key] });
  }

  return (
    <div>
      <h1>Login</h1>
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
        <button type="submit">Log In</button>
      </form>
      <p className="txt-center">
        Don't have an account? Register <a href="/register">here</a>
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
  onAuth: (email, password) => dispatch(actions.auth(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
