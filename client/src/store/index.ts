import {configureStore, ThunkAction, Action, combineReducers} from "@reduxjs/toolkit";
import {authorizeApi} from "../services/authorize.service";
import {setupListeners} from "@reduxjs/toolkit/query";
import authReducer from "./reducers/authorize.slice";


export const store = configureStore({
    reducer: {
        authReducer,
        [authorizeApi.reducerPath]: authorizeApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authorizeApi.middleware),
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
setupListeners(store.dispatch);

export type {AppDispatch, RootState, AppThunk};
