export const accessDenied = () => {
    return {
        type: 'ACCESS_DENIED'
    }
}

export const apiError = () => {
    return {
        type: 'API_ERROR'
    }
}
export const apiStart = () => {
    return {
        type: 'API_START'
    }
}
export const apiEnd = () => {
    return {
        type: 'API_END'
    }
}

export const API = 'API';