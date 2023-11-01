import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";

import './style.css'

function DashboardPage() {
    const [user, setUser] = useState({
        first_name: '',
        last_name: ''
    })

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
            setUser({
                first_name: data.user.first_name,
                last_name: data.user.last_name,
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <Fragment>
            <Navbar/>
            <h1 className="text-center mt-5"> Welcome {user.first_name + ' ' + user.last_name}!</h1>
        </Fragment>
    )
}

export default DashboardPage;