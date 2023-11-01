import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

import './style.css'

function LoginPage() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const [password, setPassword] = useState({
        icon: 'bi bi-eye',
        type: 'password'
    });

    const handleChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value});
    }

    const handlePassword = (event) => {
        if (password.type === 'password') {
            setPassword({
                icon: 'bi bi-eye-slash',
                type: 'text'
            })
        } else {
            setPassword({
                icon: 'bi bi-eye',
                type: 'password'
            })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem('access', data.token);
            window.location.reload(false);
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <Fragment>
            <Navbar />
            <div className="centered">
                <form onSubmit={handleSubmit}>
                    <h3 className="text-center mb-4">Log In</h3>
                    <div className="input-group mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="bi bi-envelope"></i>
                            </span>
                        </div>
                        <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} placeholder="Email Address" required></input>
                    </div>
                    <div className="input-group mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className={password.icon} onClick={handlePassword}></i>
                            </span>
                        </div>
                        <input type={password.type} className="form-control" name="password" value={user.password} onChange={handleChange} placeholder="Password" required></input>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary d-inline-block mt-4">Log In</button>
                        <Link to='/signup' className="d-block mt-3">Create a new account</Link>
                    </div>
                </form>
            </div>
        </Fragment>
    );
}

export default LoginPage;