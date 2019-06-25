export const openSnackBar = (data) => {
    return {
        type: 'OPEN_SNACK_BAR',
        data
    }
}

const defaultState = {
    snackBarOpen: false
};

const snackBarReducer = (state = defaultState, action) => {

    const {
        type,
        data
    } = action;

    switch (type) {
        case 'OPEN_SNACK_BAR':
            return {
                ...state,
                snackBarOpen: true,
                snackBarData: data
            }
        default:
            return state;
    }
};

export default snackBarReducer;