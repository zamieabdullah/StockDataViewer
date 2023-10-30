import React from "react";
import { Link } from "react-router-dom";
import "./style.css"

function Navbar() {
    return (
        <header className="navbar navbar-expand-lg bg-light">
            <h1>Stock Data Viewer</h1>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Log In</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Navbar;