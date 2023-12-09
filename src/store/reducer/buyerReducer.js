
const initialState = {
    buyerProducts: null,
    loader: false,
    categoryProduct: null,
    message: null,
    notifications: null

};

const buyerProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ALL_BUYER_PRODUCTS":
            return { ...state, buyerProducts: action.payload };
        case "BUYER_CATEGORY_PRODUCTS":
            return { ...state, categoryProduct: action.payload };
        case "BUYER_LOADER":
            return { ...state, loader: action.payload };
        case "BUYER_NOTIFICATIONS":
            return { ...state, notifications: action.payload };
        case "ORDER_PLACED":
            return { ...state, message: action.payload };
        default:
            return state;
    }
};

export default buyerProductsReducer;
