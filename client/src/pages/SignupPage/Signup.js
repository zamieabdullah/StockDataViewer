import React, { Fragment, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

import "./style.css"

function SignupPage() {
    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
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

        fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem('access', data.token)
            window.location.reload(false);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <Fragment>
            <Navbar />
            <div className="centered">
                <form onSubmit={handleSubmit}>
                    <h3 className="text-center mb-4">Sign Up</h3>
                    <div className="input-group mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="bi bi-person"></i>
                            </span>
                        </div>
                        <input type="text" className="form-control" name="first_name" value={user.first_name} onChange={handleChange} placeholder="First Name" required></input>
                    </div>
                    <div className="input-group mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="bi bi-person"></i>
                            </span>
                        </div>
                        <input type="text" className="form-control" name="last_name" value={user.last_name} onChange={handleChange} placeholder="Last Name" required></input>
                    </div>
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
                        <button type="submit" className="btn btn-primary d-inline-block mt-4">Create account</button>
                    </div>
                </form>
            </div>
        </Fragment>
    );
}

export default SignupPage;