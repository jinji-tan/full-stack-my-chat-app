import { registerApi } from "../services/api";
import { useState, useRef, useEffect } from "react";

const Register = ({ setPage }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");

    const emailRef = useRef(null);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,7}$/.test(email);
    const validatePassword = (password) => password.length >= 8;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password || !firstName || !lastName) {
            setError("All fields are required.");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!validatePassword(password)) {
            setError("Password must be at least 8 characters.");
            return;
        }

        try {
            await registerApi(email, password, firstName, lastName);
            setPage("login")
        }

        catch {
            setError("Something went wrong");
        }
    }


    return (
        <>

            <form className="register-page" onSubmit={handleSubmit}>
                <h1>Register</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <input placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)} ref={emailRef} />

                <input type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                <input type="text" placeholder="First Name" value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} />

                <input type="text" placeholder="Last Name" value={lastName}
                    onChange={(e) => setLastName(e.target.value)} />

                <button type="submit">Submit</button>
                <div className="switch-text">
                    <p>
                        Already have account?{" "}
                        <button type="button" onClick={() => setPage("login")}>Login</button>
                    </p>
                </div>
            </form>

        </>
    )
}

export default Register