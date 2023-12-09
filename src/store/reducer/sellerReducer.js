
const initialState = {
    sellerProducts: null,
    loader: false,
    orders: null

};

const sellerProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ALL_SELLER_PRODUCTS":
            return { ...state, sellerProducts: action.payload };
        case "SELLER_ORDERS":
            return { ...state, orders: action.payload };
        case "SELLER_LOADER":
            return { ...state, loader: action.payload };
        default:
            return state;
    }
};

export default sellerProductsReducer;
