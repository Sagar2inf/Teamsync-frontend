const backend_api = import.meta.env.VITE_API_URL;
export const getTeams = async() =>{
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`${backend_api}/api/team`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        // body: JSON.stringify(data),
        credentials: "include"
    });
    if(!res.ok){
        throw new Error(`Server Error: ${res.status}`);
    }
    return res.json();

};

export const createTeam = async(name) =>{
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`${backend_api}/api/team`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({name}),
        credentials: "include"
    });
    if(!res.ok){
        throw new Error(`Server Error: ${res.status}`);
    }
    return res.json();
};

export const inviteUser = async(teamId, email, role) => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`${backend_api}/api/team/${teamId}/invite`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({email, role}),
        credentials: "include"
    });
    if(!res.ok){
        throw new Error(`Server Error: ${res.status}`);
    }
    return res.json();
};