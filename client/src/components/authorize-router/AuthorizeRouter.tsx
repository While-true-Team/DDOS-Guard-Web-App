import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignIn from "../../pages/sign-in/SignIn";
import SignUp from "../../pages/sign-up/SignUp";
import NotFound from "../../pages/not-found/NotFound";

const AuthorizeRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIn/>}/>
                <Route path='/sign-up' element={<SignUp/>}/>
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default AuthorizeRouter;