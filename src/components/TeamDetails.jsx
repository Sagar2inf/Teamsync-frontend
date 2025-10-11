import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getTeams} from "../utils/api/teamApi.js";
import InviteForm from "./InviteForm.jsx";

export default function TeamDetails() {
    const {id} = useParams();
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    // console.log(id);
    const loadTeam = async() =>{
        try{
            const allTeams = await getTeams();
            const found = allTeams.find((t) => t._id === id);
            setTeam(found);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTeam();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!team) return <p>Team not found</p>;

    return (
        <div className="p-4">
        <h2 className="font-bold text-lg mb-2">{team.name}</h2>
        <p className="mb-4 text-gray-500">Owner: {team.owner.name}</p>

        <h3 className="font-semibold mb-2">Members</h3>
        <ul className="mb-4">
            {team.members.map((m) => (
                <li key={m._id} className="border-b py-1">
                    {m.id.name}: {m.id.email} ({m.role})
                </li>
            ))}
            
        </ul>

        <InviteForm teamId={id} onSuccess={loadTeam} />
        </div>
    );
}