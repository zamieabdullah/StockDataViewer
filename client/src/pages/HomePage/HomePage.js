import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function HomePage () {
    const navigate = useNavigate();

    const signUp = (event) => {
        event.preventDefault();
        return navigate('/signup');
    }

    return (
        <Fragment>
            <Navbar/>
            <div className="text-center">
                <h1 className="mt-5" style={{fontSize: 84}}>Welcome to Data Stock Viewer!</h1>
                <p className="mt-5 mb-5" style={{fontSize: 24}}>
                    Interested in stocks and learning more about how different companies's publicly traded shares are performing.<br/>
                    By signing up for free with our web application, you can take a look at a company's OCHLV data and observe<br/>
                    their performance throughout the last five months using their company symbol name. To take a look at these<br/>
                    OCHLV data charts, please join and sign up with us with a click of a button below!
                </p>
                <button className="btn btn-primary btn-lg mt-5" onClick={signUp}>Sign Up!</button>
            </div>
        </Fragment>
    )
}

export default HomePage;