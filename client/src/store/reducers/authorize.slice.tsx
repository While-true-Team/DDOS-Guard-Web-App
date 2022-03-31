import {createSlice, PayloadAction, isAnyOf} from '@reduxjs/toolkit';
import {authorizeApi} from "../../services/authorize.service";
import {AuthorizeResponse} from "../../models/authorize.model";
import jwtDecode from "jwt-decode";

interface AuthorizeState {
    isLoading: boolean;
    refreshToken: string | null;
    accessToken: string | null;
    error: AuthResponseError | null;
    userCredentials: {
        email: string | null;
        userId: string | null;
    }
}

interface AuthResponseError {
    message: string;
    error: any;
}

const initialState: AuthorizeState = {
    isLoading: true,
    accessToken: null,
    refreshToken: null,
    error: null,
    userCredentials: {
        email: null,
        userId: null
    }
};

interface TokenPayload {
    email: string;
    exp: number;
    userid: number;
}

const AuthorizeSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        const isSuccessAuthAction = isAnyOf(authorizeApi.endpoints.login.matchFulfilled, authorizeApi.endpoints.refresh.matchFulfilled);
        const isLogoutAction = isAnyOf(authorizeApi.endpoints.logout.matchFulfilled, authorizeApi.endpoints.logout.matchRejected);
        const isErrorAuthAction = isAnyOf(authorizeApi.endpoints.login.matchRejected, authorizeApi.endpoints.refresh.matchRejected);
        builder
            .addMatcher(
                isSuccessAuthAction,
                (state: AuthorizeState, action: PayloadAction<AuthorizeResponse>) => {
                    state.accessToken = action.payload.access;
                    state.userCredentials.email = jwtDecode<TokenPayload>(action.payload.access).email;
                    state.isLoading = false;
                })
            .addMatcher(
                isLogoutAction,
                (state: AuthorizeState) => {
                    state.accessToken = null;
                    state.isLoading = false;
                })
            .addMatcher(
                isErrorAuthAction,
                (state: AuthorizeState) => {
                    state.accessToken = null;
                    state.isLoading = false;
                });
    },
});
export default AuthorizeSlice.reducer;
