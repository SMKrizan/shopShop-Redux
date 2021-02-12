// note: actions are capitalized in practice to denote GraphQL or action code

// utilized by 'ProductList' component: will store product data retrieved by Apollo and store in this global state
export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
// will take category list retrieved from server by Apollo and store in this global state
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
// connects category selection with the products for that category
export const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY";
// shopping cart actions
export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_MULTIPLE_TO_CART = 'ADD_MULTIPLE_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';
export const TOGGLE_CART = 'TOGGLE_CART';