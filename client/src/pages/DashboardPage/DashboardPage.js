import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

import './style.css'

function DashboardPage() {
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        symbols: [],
    })

    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/getuser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setUser((prevUser) => ({
                ...prevUser,
                first_name: data.user.first_name,
                last_name: data.user.last_name,
            }));
        })
        .catch((error) => {
            console.log(error)
        })

        fetch('http://localhost:5000/getsymbols', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setUser((prevUser) => ({
                ...prevUser,
                symbols: data.symbols
            }));
        })
    }, [])


    const goToStocks = () => {
        navigate('/search');
    }

    return (
        <Fragment>
            <Navbar/>
            <div className="text-center">
                <h1 className="mt-5 mb-5"> Welcome {user.first_name + ' ' + user.last_name}!</h1>
                {user.symbols.length > 0 ? <p className='mt-5'>Table in development</p> : <h2 className='mt-5'>You have not flagged any stocks! Search for stocks you're interested and flag them!</h2>}
                <button type='button' className="btn btn-primary mt-4" onClick={goToStocks}>Stock Search</button>
            </div>
        </Fragment>
    )
}

export default DashboardPage;