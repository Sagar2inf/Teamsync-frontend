import React from "react";
import { useNavigate } from "react-router-dom";
import {logout} from "../utils/auth.js";

const Navbar = () =>{
    const navigate = useNavigate();

    return(
        <nav>
            <h3>Want to leave it?</h3>
            <button onClick={() => logout(navigate)}>Logout</button>
        </nav>
    );
}

export default Navbar;