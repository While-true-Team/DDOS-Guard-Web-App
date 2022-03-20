import {FC, useEffect} from "react";
import AppRouter from "../components/app-router/AppRouter";
import {authorizeApi} from "../services/authorize.service";

const App: FC = () => {
    const [checkAuthorization, {
        isLoading: checkAuthLoading,
        error: loginError,
    }] = authorizeApi.useRefreshMutation();

    useEffect(() => {
        checkAuthorization();
    }, []);

    return (
        <AppRouter/>
    );
};

export default App;
