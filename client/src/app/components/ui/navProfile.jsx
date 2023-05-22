import React from "react";
import { Link, useHistory } from "react-router-dom";

const NavProfile = () => {
    const history = useHistory();
    return (
        <div className="dropdown">
            <button className="dropbtn" onClick={() => history.push("/profile")}>Profile</button>
            <div className="dropdown-content">
                <Link to="/logout" className="dropdown-item">
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
