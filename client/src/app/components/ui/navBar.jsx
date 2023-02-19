import React from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-ul">
                <li>
                    <Link to="/" className="nav-link">
                        Main
                    </Link>
                </li>
                <li>
                    <Link to="/cart" className="nav-link">
                        Cart
                    </Link>
                </li>
            </ul>
            <div className="nav-profile">
                <Link
                    to="/login"
                    className="nav-link"
                    aria-current="page"
                >
                    Login
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
