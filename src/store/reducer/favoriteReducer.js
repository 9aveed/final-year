const initialState = {
    favorites: [],
    loader: false,
};

const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITES':
            return { ...state, favorites: [...state.favorites, action.payload] };
        case 'REMOVE_FROM_FAVORITES':
            const updatedFavorites = state.favorites.filter((item) => item.id !== action.payload);
            return { ...state, favorites: updatedFavorites };
        case "FAVORITE_LOADER":
            return { ...state, loader: action.payload };
        default:
            return state;
    }
};
export default favoriteReducer;
export const addToFavorites = (item) => ({
    type: 'ADD_TO_FAVORITES',
    payload: item,
});
export const removeFromFavorites = (item) => ({
    type: 'REMOVE_FROM_FAVORITES',
    payload: item,
});
