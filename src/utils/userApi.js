import {getAccessToken} from "./auth";
const backend_api = import.meta.env.VITE_API_URL;
export async function updateUser(data){
    const token = await getAccessToken();
    const response  = await fetch(`${backend_api}/api/user/update`, {
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