import React from "react";
import "./ProductDetails.css";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const ProductDetails = ({ data, children }) => {
  const makePayment = (token) => {
    const body = {
      token,
      total: data.Price,
      ids: data.idProducts,
      //total,
    };
    axios.post("/payment", body).then((result) => {
      if (result.status === 200) {
        alert("success");
      } else {
        alert("error");
      }
    });
  };

  return (
    <div className="product-details">
      <img src={data.image} alt="" />
      <div className="info">
        <h2>{data.Name}</h2>
        <p>{data.Description}</p>

        <div className="bottom">
          <div>
            <p>Price: {data.Price} €</p>
            <p>By: {data.user}</p>
            <p>Posted: {data.date}</p>
            <br />
            <p>Views: {data.views}</p>
          </div>
          <div className="buy-basket-icons">
            {children[0]}
            <StripeCheckout
              stripeKey="pk_test_OtPH56R0K9McMN5SdhabDEKC"
              token={makePayment}
              name={data.Name}
              amount={data.Price * 100}
              shippingAddress
              billingAddress
            >
              {children[1]}
            </StripeCheckout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
