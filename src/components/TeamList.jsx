import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getTeams} from "../utils/api/teamApi.js";

export default function TeamList({refreshKey}){
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchTeams = async() => {
        setLoading(true);
        try{
            const data = await getTeams();
            setTeams(data);
        }catch(e){
            setError(e.message);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() =>{
        fetchTeams();
    }, [refreshKey]);
    if(loading) return <p>Loading teams...</p>;
    if(error) return <p className="text-red-500">{error}</p>;
    return (
        <div>
            <h2 className="font-bold text-lg mb-2">Your Teams</h2>
            {/* <TeamForm onSuccess={fetchTeams}/> */}
            <div>
                {teams.map((team) => (
                    <div
                        key={team._id}
                        onClick={() => navigate(`/teams/${team._id}`)}
                    >
                        <h3> {team.name} </h3>
                        <p> Members: {team.members.length} </p>
                    </div>
                ))}
            </div>
        </div>
    );
}