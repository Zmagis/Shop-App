import React, { useState } from 'react';
import { connect } from 'react-redux';

import Input from '../UI/Input';
import Backdrop from '../UI/backdrop/Backdrop';
import * as actions from '../../store/actions';
import { editFormData } from './formData';

const EditPrduct = (props) => {
  console.log(props.data);
  const [formData, setFormData] = useState(editFormData(props.data));
  const [file, setFile] = useState(props.data.image);

  const changeHandler = (e, identifier) => {
    const updatedFormData = { ...formData };
    const updatedFormElement = { ...updatedFormData[identifier] };
    updatedFormElement.value = e.target.value;
    updatedFormData[identifier] = updatedFormElement;
    setFormData(updatedFormData);
  };

  const uploadImageHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const today = new Date().toISOString().slice(0, 10);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('image', file);
    data.append('price', formData.price.value);
    data.append('keywords', formData.keywords.value);
    data.append('title', formData.title.value);
    data.append('description', formData.description.value);
    data.append('id', props.data.idProducts);
    data.append('username', localStorage.username);
    data.append('date', today);
    props.onEditProduct(data);

    props.setShowEdit(false);
  };

  const formElementArray = [];
  for (let key in formData) {
    formElementArray.push({ id: key, config: formData[key] });
  }

  return (
    <Backdrop width="600px">
      <div>
        <i
          className="fas fa-times leave-modal"
          onClick={() => props.setShowEdit(false)}
        ></i>

        <h1>Edit</h1>
        <form method="PUT" onSubmit={submitHandler}>
          {formElementArray.map((element) => (
            <Input
              key={element.id}
              elementType={element.config.elementType}
              elementConfig={element.config.elementConfig}
              value={element.config.value}
              label={element.config.label}
              changeHandler={
                element.config.elementConfig.type === 'file'
                  ? (e) => uploadImageHandler(e, element.id)
                  : (e) => changeHandler(e, element.id)
              }
            />
          ))}

          <div className="upload-btn-wrapper">
            <label>Change photo:</label>
            <button className={file !== null ? 'uploaded btn' : 'btn'}>
              Upload an image
            </button>
            <input
              type="file"
              name="image"
              onChange={(e) => uploadImageHandler(e)}
            />
          </div>

          <button type="submit">Edit</button>
        </form>
        <br />
      </div>
    </Backdrop>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onEditProduct: (data) => dispatch(actions.initEditProduct(data)),
});

export default connect(null, mapDispatchToProps)(EditPrduct);
