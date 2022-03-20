import React, {FC, Suspense} from "react";
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";
import AppBar from '../app-bar/AppBar'
import {CircularProgress, LinearProgress, styled} from "@mui/material";
import {useAppSelector} from "../../hooks/redux.hooks";
import {getAccessToken} from "../../store/selectors/token.selector";

const AccountPage = React.lazy(() => import('../../pages/account/Account'));
const NotFound = React.lazy(() => import('../../pages/not-found/NotFound'));
const SignIn = React.lazy(() => import('../../pages/sign-in/SignIn'));
const SignUp = React.lazy(() => import('../../pages/sign-up/SignUp'));
const EmailActivate = React.lazy(() => import('../../utils/EmailActivate'));

const PageLoader = styled(LinearProgress)(({theme}) => ({
    borderRadius: 5,
    margin: '10px',
    height: '5px',
}))

const account = (
    <Suspense fallback={<PageLoader/>}>
        <AccountPage/>
    </Suspense>
);

const notFound = (
    <Suspense fallback={<PageLoader/>}>
        <NotFound/>
    </Suspense>
);

const signIn = (
    <Suspense fallback={<PageLoader/>}>
        <SignIn/>
    </Suspense>
);

const signUp = (
    <Suspense fallback={<PageLoader/>}>
        <SignUp/>
    </Suspense>
);

const emailActivate = (
    <Suspense fallback={<PageLoader/>}>
        <EmailActivate/>
    </Suspense>
)

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
        <Route path='/activation/:uuid' element={emailActivate}/>
    </Routes>
)


const AppRouter: FC = () => {
    const accessToken = useAppSelector(getAccessToken);
    return (
        <Router>
            {accessToken ? AppRoutes : AuthorizeRoutes}
        </Router>
    );
}

export default AppRouter;
