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
import type {RootState} from '../store'


const baseQuery = fetchBaseQuery({
    baseUrl: `${window.location.protocol + "//" + window.location.hostname}:8080/`,
    prepareHeaders: (headers, {
        endpoint, getState
    }) => {
        const tokenFromStore = (getState() as RootState).authReducer.accessToken;
        if (tokenFromStore && endpoint !== 'refresh') {
            headers.set('Authorization', `Bearer ${tokenFromStore}`);
        }
        return headers;
    },
    credentials: 'include',
});
console.log()
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
            // повторяем наш начальный запрос
            request = await baseQuery(args, api, extraOptions);
        } else {
            console.warn('Срок действия refresh токена истёк, необходимо авторизоваться!');
            api.dispatch(authorizeApi.endpoints.logout.initiate());
        }
    }
    return request;
};