const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_JWT':
      return {
        ...state,
        jwt: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ALERT':
      return {
        ...state,
        alert: action.payload,
      };
    case 'SET_PARAMS':
      return {
        ...state,
        params: action.payload,
      };
    case 'SET_STATUS':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
