import {Navigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({children}) =>{
    const token = localStorage.getItem("accessToken");
    if(!token){
        return <Navigate to = "/login" replace/>;
    }
    try{
        const {exp} = jwtDecode(token);
        if(Date.now() >= exp * 1000){
            localStorage.removeItem("accessToken");
            return <Navigate to = "/login" replace/>;
        }
    } catch{
        return <Navigate to = "/login" replace/>;
    }
    return children;
};

export default ProtectedRoute;