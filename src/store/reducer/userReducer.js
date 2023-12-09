
const initialState = {
  user: null,
  loader: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CURRENT_USER":
      return { ...state, user: action.payload };
    case "AUTH_LOADER":
      return { ...state, loader: action.payload };
    default:
      return state;
  }
};

export default userReducer;