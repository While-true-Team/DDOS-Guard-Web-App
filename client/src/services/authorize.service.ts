import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {AuthorizeResponse, RegistrationRequest, LoginRequest} from '../models/authorize.model';
import {RootState} from "../store";

export const authorizeApi = createApi({
    reducerPath: 'authorizeReducer',
    baseQuery: fetchBaseQuery({
        baseUrl: `${window.location.protocol + "//" + window.location.hostname}:8080/`,
        credentials: 'include',
        prepareHeaders: (headers, {endpoint, getState}) => {
            const tokenFromStore = (getState() as RootState).authReducer.accessToken;
            if (tokenFromStore && endpoint === 'logout') {
                headers.set('Authorization', `Bearer ${tokenFromStore}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<AuthorizeResponse, LoginRequest | any>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
        registration: builder.mutation<AuthorizeResponse, RegistrationRequest>({
            query: (credentials) => ({
                url: 'register',
                method: 'POST',
                body: credentials,
            }),
        }),
        refresh: builder.mutation<AuthorizeResponse, void>({
            query: () => ({
                url: 'refresh',
                method: 'POST',
            }),
        }),
        logout: builder.mutation<AuthorizeResponse, void>({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
        }),
    }),
});