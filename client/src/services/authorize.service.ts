import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {AuthorizeResponse, RegistrationRequest, LoginRequest} from '../models/authorize.model';

export const authorizeApi = createApi({
    reducerPath: 'authorizeReducer',
    baseQuery: fetchBaseQuery({
        baseUrl: `${window.location.protocol + "//" + window.location.hostname}:5000/api/`,
        credentials: 'include',
        prepareHeaders: (headers, {endpoint}) => {
            const token = localStorage.getItem('token');
            if (token && endpoint === 'logout') {
                headers.set('Authorization', `Bearer ${token}`);
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
                url: 'registration',
                method: 'POST',
                body: credentials,
            }),
        }),
        refresh: builder.mutation<AuthorizeResponse, void>({
            query: () => ({
                url: 'refresh',
                method: 'GET',
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