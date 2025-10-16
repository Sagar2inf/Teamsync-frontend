import {useEffect, useState} from "react";
import {getAccessToken} from "../utils/auth.js";
import Navbar from "../components/Navbar.jsx";
import {Link} from "react-router-dom";
import TeamForm from "../components/TeamForm.jsx";
import TeamList from "../components/TeamList.jsx";
// import {UpdateProfile} from "./updateProfile.jsx";
// import useNavigate from "react-router-dom";

const backend_api = import.meta.env.VITE_API_URL;
const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [refreshTeams, setRefreshTeams] = useState(false);
    // const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchUser() {
            const token = await getAccessToken();
            if(!token){
                throw new Error("Something went wront. Please log in again.");
            }

            try {
                const response = await fetch(`${backend_api}/api/user/me`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                    credentials: "include",
                });
                if(!response.ok){
                    throw new Error(`Server Error: ${response.status}`);
                }
                const data = await response.json();
                setUser(data);
                 
            }catch(e){
                setError(e.message);
            }
        };

        fetchUser();
    }, []);

    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!user) return <p>Loading...</p>;
    
    return (
        <div className="p-6">
            {/* Navbar */}
            <Navbar />

            {/* User Info Section */}
            <div className="mb-6 p-4 bg-gray-100 rounded shadow">
                <h1 className="text-2xl font-bold mb-2">User Profile</h1>
                <img
                    src={user.profilePicture}
                    alt="Profile"
                    style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #ccc",
                    }}
                />
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>

                <Link to="/UpdateProfile">
                    <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded">
                        Edit Profile
                    </button>
                </Link>
            </div>

            {/* Team Management Section */}
            <div className="mb-6">
                {/* <h2 className="text-xl font-semibold mb-2">Create a New Team</h2> */}
                {/* When team is created successfully → re-fetch teams */}
                <TeamForm onSuccess={() => setRefreshTeams(!refreshTeams)} />
            </div>
            
            <div>
                {/* <h2 className="text-xl font-semibold mb-2">Your Teams</h2> */}
                {/* Pass refreshTeams as a dependency so it re-fetches */}
                <TeamList refreshKey={refreshTeams} />
            </div>
        </div>
    );
};

export default UserProfile;
