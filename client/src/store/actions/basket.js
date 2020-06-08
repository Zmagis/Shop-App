import * as actionTypes from "./actionTypes";

export const initBasket = () => {
  return { type: actionTypes.INIT_BASKET };
};

export const addItemToBasket = (id) => {
  return { type: actionTypes.ADD_ITEM_TO_BASKET, id };
};

export const removeItemFromBasket = (id) => {
  return { type: actionTypes.REMOVE_ITEM_FROM_BASKET, id };
};
