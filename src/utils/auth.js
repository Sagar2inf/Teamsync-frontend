import {jwtDecode} from "jwt-decode";
const backend_api = import.meta.env.VITE_API_URL;
function isTokenexpired(token){
    try{
        const decode = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decode.exp < currentTime;
    }catch(e){
        return true;
    }
}

export async function getAccessToken() {
    let accessToken = localStorage.getItem("accessToken");
    if(!accessToken || isTokenexpired(accessToken)){
        try{
            const response = await fetch(`${backend_api}//api/auth/refresh`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-type": "application/json",
                },
            });
            if(!response.ok){
                throw new Error("Faild to refresh token");
            }
            const data = await response.json();
            accessToken = data.accessToken;
            localStorage.setItem("accessToken",accessToken);
        } catch(e){
            console.log("Error refreshing token", e);
            return null;
        }
    }
    return accessToken;
}

export async function logout(navigate){
    try{
        localStorage.removeItem("accessToken");
        const res = await fetch(`${backend_api}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        if(!res.ok){
            console.error("Logout failed on server");
        }
        navigate("/login");

    }catch(err){
        console.error("Error during logout", err);
        navigate("/login");
    }
}