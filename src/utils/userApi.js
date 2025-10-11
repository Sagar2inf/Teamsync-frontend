import {getAccessToken} from "./auth";

export async function updateUser(data){
    const token = await getAccessToken();
    const response  = await fetch("http://localhost:5000/api/user/update", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json", 
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        credentials: "include",
    });
    if(!response.ok){
        throw new Error(`Server Error: ${response.status}`);
    }

    return response.json();
};