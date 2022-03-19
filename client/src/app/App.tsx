import {FC, useEffect} from "react";
import AppRouter from "../components/app-router/AppRouter";
import {authorizeApi} from "../services/authorize.service";
import {useAppSelector} from "../hooks/redux.hooks";
import {getAccessToken} from "../store/selectors/token.selector";

const App: FC = () => {
    const [checkAuth, {isLoading: checkAuthLoading, error: loginError, data}] = authorizeApi.useRefreshMutation();
    const accessTokenFromStore = useAppSelector(getAccessToken)

    useEffect(() => {
        if (accessTokenFromStore) {
            checkAuth();
        }
    }, []);

    return (
        <AppRouter/>
    );
};

export default App;
