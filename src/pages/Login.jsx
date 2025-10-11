import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";


const Login = () => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState("");
    const navigate = useNavigate();
    
    async function handleSubmit (e){
        e.preventDefault();
        setLoading(true);
        try{
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)){
                throw new Error("Invalid email format");
            }
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                credentials: "include",
            });
            if(!response.ok){
                throw new Error(`Server Error: ${response.status}`);
            }
            const data = await response.json();
            localStorage.setItem("accessToken", data.accessToken);
            navigate('/dashboard');

        } catch(error){
            setError(error.message);
            setLoading(false);
            console.log(`${error}`);
        } finally {
            console.log(`Email: ${email}`);
            setPassword('');
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>Email: </label>
                    <input 
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Registered Email'
                    value={email}
                    onChange ={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                <br />
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input 
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                <br />
                {error && <p style={{color: 'red'}}>{error}</p>}
                <button type='submit' disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p> Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
    )
}

export default Login;