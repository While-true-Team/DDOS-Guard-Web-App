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
    isLoading: false,
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
        const isSuccessAuthAction = isAnyOf(authorizeApi.endpoints.login.matchFulfilled, authorizeApi.endpoints.registration.matchFulfilled, authorizeApi.endpoints.refresh.matchFulfilled);
        const isLogoutAction = isAnyOf(authorizeApi.endpoints.logout.matchFulfilled, authorizeApi.endpoints.logout.matchRejected)
        builder
            .addMatcher(
                isSuccessAuthAction,
                (state: AuthorizeState, action: PayloadAction<AuthorizeResponse>) => {
                    state.accessToken = action.payload.tokens.access;
                    state.userCredentials.email = jwtDecode<TokenPayload>(action.payload.tokens.access).email;
                    console.log(jwtDecode(action.payload.tokens.access));
                })
            .addMatcher(
                isLogoutAction,
                (state: AuthorizeState) => {
                    state.accessToken = null;
                });
    },
});
export default AuthorizeSlice.reducer;
