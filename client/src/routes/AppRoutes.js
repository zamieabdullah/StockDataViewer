import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/Signup";
import DashboardPage from "../pages/DashboardPage/DashboardPage";

function AppRoutes () {
    const [auth, setAuth] = useState({
        isAuth: null,
    })
    
    useEffect(()=>{
        if (localStorage.getItem('access') === null || localStorage.getItem('access') === undefined) {
            setAuth({isAuth: false});
        } else {
            setAuth({isAuth: true})
        }
    }, [])

    if (auth.isAuth) {
        return (
            <Routes>
                <Route path='/' element={<DashboardPage/>}/>
                <Route path="*" element={<Navigate to="/" replace />}/>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/signup' element={<SignupPage/>}/>
            <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
    );
}

export default AppRoutes;