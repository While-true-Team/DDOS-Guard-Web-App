import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import authReducer from "./reducers/authorize.slice";
import {authorizeApi} from "../services/authorize.service";

export const store = configureStore({
    reducer: {
        [authorizeApi.reducerPath]: authorizeApi.reducer,
        authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authorizeApi.middleware),
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
setupListeners(store.dispatch);

export type {AppDispatch, RootState, AppThunk};
