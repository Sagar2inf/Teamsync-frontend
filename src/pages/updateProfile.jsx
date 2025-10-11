import {useState} from "react";
import {updateUser} from "../utils/userApi";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile(){
    const [name, setName] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const updated = await updateUser({name, profilePicture});
            setMessage("profile updated successfully");
            navigate("/dashboard");
        }catch(e){
            setMessage(e.message);
        }
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                <input type="text" placeholder="Profile Picture Url" value={profilePicture} onChange={e => setProfilePicture(e.target.value)}/>
                <button type="Submit">Update</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};