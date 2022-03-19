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
    reducers: {
        testAccessToken: (state: AuthorizeState) => {
            localStorage.setItem(accessTokenName, 'aboba');
            state.accessToken = 'aboba'
            state.refreshToken = 'aboba'
        }
    },
    extraReducers: (builder) => {
        const isSuccessAuthAction = isAnyOf(authorizeApi.endpoints.login.matchFulfilled, authorizeApi.endpoints.registration.matchFulfilled, authorizeApi.endpoints.refresh.matchFulfilled);
        builder
            .addMatcher(
                isSuccessAuthAction,
                (state: AuthorizeState, action: PayloadAction<AuthorizeResponse>) => {
                    localStorage.setItem(accessTokenName, action.payload.access_token);
                    state.accessToken = action.payload.access_token;
                    state.refreshToken = action.payload.refresh_token;
                })
            .addMatcher(
                authorizeApi.endpoints.logout.matchFulfilled,
                (state: AuthorizeState) => {
                    localStorage.removeItem(accessTokenName);
                    localStorage.removeItem('theme');
                    state.refreshToken = null;
                    state.accessToken = null;
                });
    },
});

export const { testAccessToken } = AuthorizeSlice.actions

export default AuthorizeSlice.reducer;
