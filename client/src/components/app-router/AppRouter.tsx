import React, {FC, Suspense} from "react";
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";
import AppBar from '../app-bar/AppBar'
import SignIn from "../../pages/sign-in/SignIn";
import {CircularProgress} from "@mui/material";
import NotFound from "../../pages/not-found/NotFound";
const AccountPage = React.lazy(() => import('../../pages/account/Account'))

const account = (
    <Suspense fallback={<CircularProgress/>}>
        <AccountPage/>
    </Suspense>
);

const AppRouter: FC = () => (
    <Router>
        <AppBar/>
        <Routes>
            <Route path="/" element={<SignIn/>}/>
            <Route path='/account' element={account}/>
            <Route path="*" element={<NotFound/>} />
        </Routes>
    </Router>
);

export default AppRouter;
