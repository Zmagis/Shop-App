import React from "react";

const Input = (props) => {
  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          onChange={props.changeHandler}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          value={props.value}
          onChange={props.changeHandler}
        />
      );
      break;
    case "select":
      inputElement = (
        <select value={props.value} onChange={props.changed}>
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          onChange={props.changeHandler}
        />
      );
  }
  return (
    <div>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
