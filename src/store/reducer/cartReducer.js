// cartReducer.js
const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CART_ITEM":
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item?.item.id === newItem?.item.id);

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      return { ...state };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((e) => e?.item.id !== action.payload),
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item?.item.id === action.payload) {
            console.log(item.stocky, 'item.stocky')
            console.log(item.quantity, 'item.quantity')
            return {
              ...item,
              quantity: item?.item?.stock > item.quantity ? item.quantity + 1 : item.quantity,
            };
          }
          return item;
        }),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item?.item.id === action.payload) {
            return {
              ...item,
              quantity: item?.item?.stock > 0 ? item.quantity - 1 : item.quantity,
            };
          }
          return item;
        }),
      };

    default:
      return state;
  }
};

export default cartReducer;

export const increaseQuantity = (productId) => ({
  type: "INCREASE_QUANTITY",
  payload: productId,
});

export const decreaseQuantity = (productId) => ({
  type: "DECREASE_QUANTITY",
  payload: productId,
});
