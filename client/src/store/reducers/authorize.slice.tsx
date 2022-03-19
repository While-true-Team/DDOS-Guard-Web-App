import {createSlice, PayloadAction, isAnyOf} from '@reduxjs/toolkit';
import {authorizeApi} from "../../services/authorize.service";
import {AuthorizeResponse} from "../../models/authorize.model";
import {accessTokenName} from "../../http";

interface AuthorizeState {
    isLoading: boolean;
    refreshToken: string | null;
    accessToken: string | null;
    error: AuthResponseError | null;
}

interface AuthResponseError {
    message: string;
    error: any;
}

const initialState: AuthorizeState = {
    isLoading: false,
    accessToken: localStorage.getItem(accessTokenName),
    refreshToken: null,
    error: null,
};

const AuthorizeSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        const isSuccessAuthAction = isAnyOf(authorizeApi.endpoints.login.matchFulfilled, authorizeApi.endpoints.registration.matchFulfilled, authorizeApi.endpoints.refresh.matchFulfilled);
        builder
            .addMatcher(
                isSuccessAuthAction,
                (state: AuthorizeState, action: PayloadAction<AuthorizeResponse>) => {
                    localStorage.setItem(accessTokenName, action.payload.tokens.access);
                    state.accessToken = action.payload.tokens.access;
                })
            .addMatcher(
                authorizeApi.endpoints.logout.matchFulfilled,
                (state: AuthorizeState) => {
                    localStorage.removeItem('theme');
                    state.accessToken = null;
                });
    },
});

export default AuthorizeSlice.reducer;
