export const initialState = {
    isLoading: false,
}

const loaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'API_START':
            return {
                ...state,
                isLoading: true
            }

        case 'API_END':
            return {
                ...state,
                isLoading: false
            }

        default:
            return state
    }
}

export default loaderReducer;