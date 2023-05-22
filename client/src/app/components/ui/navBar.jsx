import React from "react";
import { Link } from "react-router-dom";
import NavProfile from "./navProfile";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <nav className="_navbar">
            <ul className="_navbar-ul">
                <li>
                    <Link to="/" className="_nav-link">
                        Main
                    </Link>
                </li>
                <li>
                    <Link to="/cart" className="_nav-link">
                        Cart
                    </Link>
                </li>
            </ul>
            <div className="_nav-profile">
                {isLoggedIn ? (
                    <NavProfile />
                ) : (
                    <Link
                        to="/login"
                        className="_nav-link"
                        aria-current="page"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
