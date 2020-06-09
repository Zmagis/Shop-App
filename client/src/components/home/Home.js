import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import "./Home.css";

import axios from "axios";

import ProductDetails from "./ProductDetails/ProductDetails";
import Product from "./Product";
import Backdrop from "../UI/backdrop/Backdrop";
import Spinner from "../UI/Spinner/Spinner";
import Input from "../UI/Input";

const Home = ({
  products,
  loading,
  basket,
  onFetchProducts,
  onAddToBasket,
  onInitBasket,
}) => {
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const [filter, setFilter] = useState("");

  useEffect(() => {
    onFetchProducts();
  }, [onFetchProducts]);

  if (localStorage.getItem("basket") === null) {
    localStorage.setItem("basket", []);
  }

  const handleAddToBasket = (id) => {
    if (localStorage.getItem("basket") === null) {
      localStorage.setItem("basket", JSON.stringify([]));
    }
    if (!localStorage.getItem("basket").includes(id)) {
      if (localStorage.getItem("basket").length >= 1 && basket.length === 0) {
        onInitBasket();
      }
      onAddToBasket(id);
    } else {
      console.log("already added");
    }
  };

  const handleShow = (id) => {
    setShowProductDetails(true);
    const click = products.find((el) => el.idProducts === id);
    if (click !== undefined) {
      setSelectedItem(click);
      axios.post("/view", click);
    }
  };

  const filterHandler = (e) => {
    setFilter(e.target.value.toUpperCase().trim());
  };
  let filtered = products;
  if (filter !== "") {
    filtered = products.filter(
      (el) =>
        el.Keywords.toUpperCase() === filter ||
        el.Keywords.toUpperCase().split(/[ ,]+/).includes(filter)
    );
  }

  const hidden =
    localStorage.getItem("username") === null ? null : { visibility: "hidden" };

  return (
    <div>
      {showProductDetails ? (
        <Backdrop width="95vw">
          <i
            className="fas fa-times leave-modal"
            onClick={() => setShowProductDetails(false)}
          ></i>
          <ProductDetails data={selectedItem}>
            <i
              style={hidden}
              className="fas fa-shopping-basket icon"
              onClick={() => handleAddToBasket(selectedItem.idProducts)}
            ></i>
            <i style={hidden} className="far fa-credit-card icon"></i>
          </ProductDetails>
        </Backdrop>
      ) : null}

      <div className="search">
        <Input
          key="search"
          value={filter}
          elementConfig={{ type: "text", placeholder: "SEARCH" }}
          changeHandler={(e) => filterHandler(e)}
        />
        <i className="fas fa-search"></i>
      </div>

      <div className="container">
        {loading ? (
          <Spinner />
        ) : (
          filtered.map((product) => (
            <Product
              key={product.idProducts}
              id={product.idProducts}
              name={product.Name}
              img={product.image}
              price={product.Price}
              handleShow={handleShow}
              handleAddToBasket={handleAddToBasket}
            />
          ))
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.home.products,
  loading: state.home.loding,
  basket: state.basket.basket,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchProducts: () => dispatch(actions.initFetchProducts()),
  onAddToBasket: (id) => dispatch(actions.addItemToBasket(id)),
  onInitBasket: () => dispatch(actions.initBasket()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
