import {RootState, store} from "../index";

export const getUserMail = (store: RootState) => {
    return store.authReducer.userCredentials.email
}