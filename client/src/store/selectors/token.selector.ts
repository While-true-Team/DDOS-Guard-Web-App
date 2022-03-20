import {RootState} from "../index";

export const getAccessToken = (store: RootState) => {
    return store.authReducer.accessToken
}