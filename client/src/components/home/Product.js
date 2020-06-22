import React from 'react';

const Product = ({ img, price, id, handleAddToBasket, handleShow, name }) => {
  const hidden =
    localStorage.getItem('username') === null ? null : { visibility: 'hidden' };
  let basketArr = [];
  if (localStorage.getItem('basket')) {
    basketArr = JSON.parse(localStorage.getItem('basket'));
  }

  let greenBasket = null;
  if (basketArr.includes(id)) {
    greenBasket = { color: 'green' };
  }
  return (
    <div className="product">
      <div className="img-container">
        <img src={img} alt="" />
      </div>

      <div className="product-home-info">
        <div className="text">
          <h3>{name}</h3>
          <p>Price: {price} €</p>
        </div>

        <div className="icons">
          <div
            style={hidden}
            className="icon"
            onClick={() => handleAddToBasket(id)}
          >
            <i className="fas fa-shopping-basket" style={greenBasket}></i>
          </div>

          <div className="icon" onClick={() => handleShow(id)}>
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
