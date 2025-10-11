import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

const SignUp_form = () =>{

    let [username, setUsername] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [error, setError] = useState('');
    let [loading, setLoading] = useState(false);
    let [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            if(confirmPassword !== password) {
                throw new Error("Passwords do not match");
            }
            if(password.length < 6) {
                throw new Error("Password must be at least 6 characters long");
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(email)) {
                throw new Error("Invalid email format");
            }
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: username,
                    email: email,
                    password: password
                })
            });
            if(!response.ok) {
                throw new Error(`Server Error: ${response.status}`);
            }else{
                const data = await response.json();
                console.log("User signed up successfully:", data);
                navigate("/login");
            }
        } catch(e) {
            setError(e.message);
            setLoading(false);
            console.log(`${e}`);
        }finally{
            console.log(`Form submitted with username: ${username}, email: ${email}`);
            setLoading(false);
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='username'>Username: </label>
                <input 
                    id='username'
                    name='username'
                    type='text'
                    placeholder='Enter your username'
                    value = {username}
                    onChange = {(e) => {
                        setUsername(e.target.value);
                        setError('');
                    }}
                    required
                />
            </div>
            <div>
                <label htmlFor='email'>Email: </label>
                <input 
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Enter your email'
                    value = {email}
                    onChange = {(e) => {
                        setEmail(e.target.value)
                        setError('');
                    }}
                    required
                />
            </div>  
            <br/>
            <div>
                <label htmlFor='password'>Password: </label>
                <input 
                    id='password'
                    name='password'
                    type='password'
                    placeholder='Enter your password'
                    value = {password}
                    onChange = {(e) => {
                        setPassword(e.target.value);
                        setError('');
                    }}
                    required
                />
                <p>Password must be atleast 6 character long</p>
            </div>
            <br/>
            <div>
                <label htmlFor='confirmPassword'>Confirm Password: </label>
                <input 
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    placeholder='Confirm your password'
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setError('');
                    }}
                    required
                />
            </div>
            <br/>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <button type='submit' disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
        </form>
    )
}

const SignUp = () => {
    return (
        <>
            <h1>Sign Up</h1>
            <SignUp_form />
            <p>Already have an account? <a href="/login">Login here</a></p> 
        </>
    )
}

export default SignUp;