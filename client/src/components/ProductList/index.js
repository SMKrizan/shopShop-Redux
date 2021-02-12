import React, { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';
import ProductItem from "../ProductItem";
import { QUERY_PRODUCTS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif";
// 'react-redux' enables interaction between React components and Redux store by reading state and dispatching actions
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";

function ProductList() {
  // uses 'react-redux' methods to enable state update via dispatch and display
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  // destructures needed data from state object so it can be used in filterProducts() fn
  const { currentCategory } = state;

  //'useQuery' hook responds to global state object
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  // implements 'useEffect' hook with response data using 'dispatch' method
  useEffect(() => {
    // if there's data to be stored
    if (data) {
      // once data is available, dispatch instructs reducer fn wrt action (save array of product data to local store)
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });

      // ...and also saves each item to IndexedDB using helper function 
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    // responds to prompt for data storage if server is offline (in which case 'useQuery' will not trigger `loading` response from Apollo) and runs idbPromise() to get data from products store and use returning array of product data to update global store
    } else if (!loading) {
      // since we're offline, get all of the data from the `products` store
      idbPromise('products', 'get').then((products) => {
        // use retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(product => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
            {filterProducts().map(product => (
                <ProductItem
                  key= {product._id}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                />
            ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      { loading ? 
      <img src={spinner} alt="loading" />: null}
    </div>
  );
}

export default ProductList;
