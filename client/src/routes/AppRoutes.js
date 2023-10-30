import React from "react";
import { Routes, Route } from 'react-router-dom';
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/Signup";

function AppRoutes () {
    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/signup' element={<SignupPage/>}/>
        </Routes>
    );
}

export default AppRoutes;