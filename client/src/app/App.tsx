import {FC, useEffect} from "react";
import AppRouter from "../components/app-router/AppRouter";
import "./App.scss";
import {authorizeApi} from "../services/authorize.service";
import AuthorizeRouter from "../components/authorize-router/AuthorizeRouter";
import {useAppSelector} from "../hooks/redux.hooks";
import {getAccessToken} from "../store/selectors/token.selector";

const App: FC = () => {
    const [login, {isLoading: loginLoading, error: loginError, data}] = authorizeApi.useRefreshMutation();
    const accessTokenFromStore = useAppSelector(getAccessToken)

    useEffect(() => {
        // if (accessToken) {
        //     login();
        // }
    }, []);

    if (!accessTokenFromStore) {
        localStorage.removeItem('theme');
        return <AuthorizeRouter/>
    }

    return (
        <AppRouter/>
    );
};

export default App;
