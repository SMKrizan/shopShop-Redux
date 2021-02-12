import React, { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';

// 'react-redux' enables interaction between React components and Redux store by reading state and dispatching actions
import { useDispatch, useSelector } from 'react-redux';

import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { QUERY_CATEGORIES } from "../../utils/queries";
// data persistence
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  // uses 'react-redux' methods to enable state update via dispatch and display
  const dispatch = useDispatch();
  
  // 'useSelector' hook enables data extraction from Redux store
  const state = useSelector(state => state);
  console.log('state: ', state)
  // destructures array from state
  const { categories } = state;

  // queries category data
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  // notices 'categoryData' is no longer undefined and runs 'dispatch()' fn, setting category data to global state
  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  // updates global state
  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
