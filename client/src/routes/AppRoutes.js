import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignupPage from "../pages/SignupPage/Signup";
import SearchStock from "../pages/SearchStock/SearchStock";

function AppRoutes () {
    const [auth, setAuth] = useState({
        isAuth: null,
    })
    
    useEffect(()=>{
        const parseJwt = (token) => {
            try {
              return JSON.parse(atob(token.split(".")[1]));
            } catch (e) {
              return null;
            }
        };
        const decodedJwt = parseJwt(localStorage.getItem('access'));
        if (localStorage.getItem('access') === null || localStorage.getItem('access') === undefined) {
            setAuth({isAuth: false});
        } else if (decodedJwt.exp * 1000 < Date.now()) {
            localStorage.removeItem('access');
            setAuth({isAuth: false});
        } else {
            setAuth({isAuth: true});
        }
    }, [])

    if (auth.isAuth) {
        return (
            <Routes>
                <Route exact path='/' element={<SearchStock/>}/>
                <Route path='*' element={<Navigate to='/' replace/>}/>
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route exact path='/' element={<HomePage/>}/>
                <Route exact path='/login' element={<LoginPage/>}/>
                <Route exact path='/signup' element={<SignupPage/>}/>
                <Route path='*' element={<Navigate to='/' replace/>}/>
            </Routes>
        );
    }
}

export default AppRoutes;