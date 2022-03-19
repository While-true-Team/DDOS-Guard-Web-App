import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query/react';
import {QueryReturnValue} from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {FetchBaseQueryMeta} from '@reduxjs/toolkit/query/react';
import {AuthorizeResponse} from "../models/authorize.model";
import {authorizeApi} from "../services/authorize.service";

export const accessTokenName: string = 'ddos_guard_app/access_token';


const baseQuery = fetchBaseQuery({
    baseUrl: `${window.location.protocol + "//" + window.location.hostname}:5000/api/`,
    prepareHeaders: (headers, {
        endpoint,
    }) => {
        const token = localStorage.getItem(accessTokenName);
        if (token && endpoint !== 'refresh') {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
    credentials: 'include',
});

export const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    let request = await baseQuery(args, api, extraOptions);
    if (request.error && request.error.status === 401) {
        type refreshRequest = QueryReturnValue<AuthorizeResponse, FetchBaseQueryError, FetchBaseQueryMeta>;
        const refresh: refreshRequest = await baseQuery('refresh', api, extraOptions) as refreshRequest;
        if (refresh.data) {
            localStorage.setItem(accessTokenName, refresh.data.access_token);
            // повторяем наш начальный запрос
            request = await baseQuery(args, api, extraOptions);
        } else {
            console.warn('Срок действия refresh токена истёк, необходимо авторизоваться!');
            api.dispatch(authorizeApi.endpoints.logout.initiate());
        }
    }
    return request;
};