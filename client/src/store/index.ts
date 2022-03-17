import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import exampleReducer from "./reducers/example.slice";

const rootReducer = combineReducers({
    exampleReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([]),
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export type { AppDispatch, RootState, AppThunk };
