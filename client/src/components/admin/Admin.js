import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../../store/actions";

import "./Admin.css";

import AddProduct from "./AddProduct";
import Backdrop from "../UI/backdrop/Backdrop";
import ProductDetails from "../home/ProductDetails/ProductDetails";
import EditProduct from "./EditProduct";

const Admin = ({ products, onFetchProducts }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteTitle, setDeleteTitle] = useState("");

  const [showEdit, setShowEdit] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    onFetchProducts();
  }, [onFetchProducts]);

  let filteredArr;
  if (products !== 0) {
    let array = [...products];
    filteredArr = array.filter(
      (item) => item.user === localStorage.getItem("username")
    );
  }
  const handleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  let itemToEdit;
  const handleEdit = (id) => {
    itemToEdit = products.filter((item) => item.idProducts === id);
    setShowEdit(true);
    setEditProduct({ ...itemToEdit });
  };

  const handleDelete = (id, name) => {
    setShowConfirmDelete(true);
    setDeleteTitle(name);
    setDeleteId(id);
  };
  const confirmDelete = () => {
    axios.delete("/deleteproduct/" + deleteId, {
      data: { id: deleteId },
    });
    setShowConfirmDelete(false);
  };

  return (
    <div>
      {showAddForm ? (
        <Backdrop width="600px">
          <i className="fas fa-times leave-modal" onClick={handleAddForm}></i>
          <AddProduct setShow={setShowAddForm} />
        </Backdrop>
      ) : null}
      {showConfirmDelete ? (
        <Backdrop width="500px">
          <i
            className="fas fa-times leave-modal"
            onClick={() => setShowConfirmDelete(false)}
          ></i>
          <p>Are you sure want to delete {deleteTitle}?</p>
          <button onClick={confirmDelete}>Delete</button>
        </Backdrop>
      ) : null}
      {showEdit ? (
        <EditProduct setShowEdit={setShowEdit} data={editProduct[0]} />
      ) : null}

      <h1>
        Add more items for sell{" "}
        <span>
          <i
            className="fas fa-plus"
            style={{ cursor: "pointer", color: "grey", marginLeft: "10px" }}
            onClick={handleAddForm}
          ></i>
        </span>
      </h1>
      {filteredArr.map((item, i) => (
        <div key={i} className="box">
          <ProductDetails data={item}>
            <i
              className="far fa-edit icon"
              onClick={() => handleEdit(item.idProducts)}
            ></i>
            <i
              className="far fa-trash-alt icon"
              onClick={() => handleDelete(item.idProducts, item.Name)}
            ></i>
          </ProductDetails>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.home.products,
  loading: state.home.loding,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchProducts: () => dispatch(actions.initFetchProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
