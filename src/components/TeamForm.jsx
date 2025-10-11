import {useState} from "react";
import {createTeam} from "../utils/api/teamApi.js";

export default function TeamForm({onSuccess}){
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            await createTeam(name);
            setName("");
            setError("");
            if(onSuccess) onSuccess();
        }catch(err){
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
            <h2 className="font-semibold mb-2">Create New Team</h2>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <input
                type="text"
                placeholder="Team Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 rounded w-full mb-2"
                required
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Create
            </button>
        </form>
    );
}