import {useState} from "react";
import {inviteUser} from "../utils/api/teamApi.js";

export default function InviteForm({teamId, onSuccess}) {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            await inviteUser(teamId, email, role);
            setEmail("");
            setError("");
            setRole("member");
            if(onSuccess) onSuccess();
        } catch(err){
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
            <h3 className="font-semibold mb-2">Invite Member</h3>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded w-full mb-2"
                required
            />
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border p-2 rounded w-full mb-2"
            >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
            </select>
            <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Invite
            </button>
        </form>
    );
}