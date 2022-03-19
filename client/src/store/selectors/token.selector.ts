import {RootState} from "../index";

const getAccessToken = (store: RootState) => {
    return store.authReducer.accessToken
}

const getRefreshToken = (store: RootState) => {
    return store.authReducer.refreshToken
}

export {getAccessToken, getRefreshToken}