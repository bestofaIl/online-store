import React from "react";
import { Link } from "react-router-dom";

const NavProfile = () => {
    return (
        <div className="dropdown">
            <button className="dropbtn">Profile</button>
            <div className="dropdown-content">
                <Link to="/logout" className="dropdown-item">
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
