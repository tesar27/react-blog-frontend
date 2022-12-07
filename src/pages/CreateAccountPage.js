import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';


const CreateAccountPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const register = async () => {
        try {
            if (password !== confirmPassword) setError('Passwords do not match!');
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (e) {
            setError(e.message);
        }
        
    }

    return (
        <>
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <input placeholder='Your email address'
        value={email}
        onChange={e => setEmail(e.target.value)}
        />
        <input placeholder='Your password'
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}/>
        <input placeholder='Confirm your password'
        type="password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}/>
        <button onClick={register}>Register</button>
        <Link to="/login">Already have an account? Login here</Link>
        </>
    );
}

export default CreateAccountPage;