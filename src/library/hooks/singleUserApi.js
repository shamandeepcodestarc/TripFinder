import { useState, useReducer, useEffect } from 'react';
let token = localStorage.getItem("key");
var token1 = token.replace(/"/g, "");
async function SuperFetch(
  url,
  method = 'GET',
  headers = {
    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Authorization': `Bearer ${token1}`
  },
  body = {},
  
) {
  let options = {
    method,
    headers,
    
  };
  if (method === 'POST' || method === 'PUT') options = { ...options, body};

  // authentication
  // we will had custom headers here.
  var str = window.location.href;
  var array = str.split("/").pop();
  return fetch(`http://codestarc.com/client/newproject/api/properties/${array}`, options)
    .then(res => {
       
      return Promise.resolve(array);
    })
    .catch(error => Promise.reject(error));
}

function dataFetchReducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        loading: true,
        error: false,
      };
    case 'FETCH_SUCCESS':
      return {
        
        ...state,
        data: action.payload.data.slice(0, state.limit),
        total: action.payload.data,
        loading: false,
        error: false,
      };
     
    case 'FETCH_FAILURE':
      return {
        ...state,
        loading: false,
        error: true,
      };
    case 'LOAD_MORE':
      return {
        ...state,
        data: [
          ...state.data,
          ...state.total.slice(
            state.data.length,
            state.data.length + state.limit
          ),
        ],
        loading: false,
        error: false,
      };
    default:
      throw new Error();
  }
}

const useDataApi = (initialUrl, limit = 10, initialData = []) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    loading: false,
    error: false,
    data: initialData,
    total: initialData,
    limit: limit,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await SuperFetch(url);
        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);
  const loadMoreData = () => {
    dispatch({ type: 'LOAD_MORE' });
  };
  const doFetch = url => {
    setUrl(url);
  };

  return { ...state, doFetch, loadMoreData };
};

export default useDataApi;