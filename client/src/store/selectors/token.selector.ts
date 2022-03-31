import {RootState} from "../index";

export const getAccessToken = (store: RootState): string | null => {
    return store.authReducer.accessToken
}

export const getAuthorizeLoading = (store: RootState): boolean => {
    return store.authReducer.isLoading
}