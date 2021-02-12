// imports possible actions that can be performed and creates a fn called 'reducer()'
import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from './actions';

// 'state': most up-to-date version of global state object
const initialState = {
    // 'dispatch': method updates state - specifically looks for an action object passed as an argument
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: ''
};

// takes in state and updates using reducer()
export const reducer = (state = initialState, action) => {
    // action.type is passed to switch statement and compared with possible actions
    switch (action.type) {
        // if passed action.type value = `UPDATE_PRODUCTS`, returns a new state object with updated products array
        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: [...action.products],
            };
        // if passed action.type value = `UPDATE_CATEGORIES`, returns new state object with updated category contents
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            };
        // if passed action.type value = `UPDATE_CURRENT_CATEGORY`, returns new state object with updated category values
        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            };
        // if passed action.type value = `ADD_TO_CART`, returns new state object with product value added to array and enables users to view the cart
        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.product]
            };
        // if passed action.type value = `ADD_MULTIPLE_TO_CART`, returns new state object with products added to cart-array
        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.products],
            };
        // if passed action.type value = `REMOVE_FROM_CART`, returns new state object array with the identified product filtered out; if removed item was last item in the cart, will toggle the cart closed.
        case REMOVE_FROM_CART:
            let newState = state.cart.filter(product => {
                return product._id !== action._id;
            });

            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };
        // if passed action.type value = 'UPDATE_CART_QUANTITY', returns new state object product-array with an updated quantity to the selected product.
        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(product => {
                    if (action._id === product._id) {
                        product.purchaseQuantity = action.purchaseQuantity;
                    }
                    return product;
                })
            };
        // if passed action.type value = 'CLEAR_CART', returns new state object with cart emptied and no longer displayed to users.
        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            };
        // if passed action.type value = 'TOGGLE_CART', returns new state object with no longer displayed to users.
        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            };
        // otherwise, state et all remain the same
        default:
            return state;
    }
};

// not sure why this 'default' export is needed in addition to the const export above, but without it there's an error
export default reducer;