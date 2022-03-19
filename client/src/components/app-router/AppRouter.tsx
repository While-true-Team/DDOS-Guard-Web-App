import React, {FC, Suspense} from "react";
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";
import AppBar from '../app-bar/AppBar'
import {CircularProgress} from "@mui/material";
import {useAppSelector} from "../../hooks/redux.hooks";
import {getAccessToken} from "../../store/selectors/token.selector";

const AccountPage = React.lazy(() => import('../../pages/account/Account'));
const NotFound = React.lazy(() => import('../../pages/not-found/NotFound'));
const SignIn = React.lazy(() => import('../../pages/sign-in/SignIn'));
const SignUp = React.lazy(() => import('../../pages/sign-up/SignUp'));

const account = (
    <Suspense fallback={<CircularProgress/>}>
        <AccountPage/>
    </Suspense>
);

const notFound = (
    <Suspense fallback={<CircularProgress/>}>
        <NotFound/>
    </Suspense>
);

const signIn = (
    <Suspense fallback={<CircularProgress/>}>
        <SignIn/>
    </Suspense>
);

const signUp = (
    <Suspense fallback={<CircularProgress/>}>
        <SignUp/>
    </Suspense>
);

const AppRoutes = (
    <>
        <AppBar/>
        <Routes>
            <Route path='/' element={account}/>
            <Route path="*" element={notFound}/>
        </Routes>
    </>
)

const AuthorizeRoutes = (
    <Routes>
        <Route path='/' element={signIn}/>
        <Route path='/sign-up' element={signUp}/>
        <Route path="*" element={notFound}/>
    </Routes>
)


const AppRouter: FC = () => {
    const accessToken = useAppSelector(getAccessToken)
    return (
        <Router>
            {accessToken ? AppRoutes : AuthorizeRoutes}
        </Router>
    );
}

export default AppRouter;
