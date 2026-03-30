import { useState, useRef, useEffect } from "react"
import { loginApi } from "../services/api"


const Login = ({ setPage }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const emailRef = useRef(null);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    const handleRegister = async () => {
        setPage("register")
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("All fields are required.");
            return;
        }

        try {
            const data = await loginApi(email, password);

            localStorage.setItem("token", data.token);
            localStorage.setItem("fullName", data.fullName);
            localStorage.setItem("userId", data.userId);

            setPage("home")
        } catch (error) {
            setError("Invalid email or password.");
        }
    }

    return (
        <>

            <form className="login-page">
                <h1>Login</h1>
                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
                <input placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)} ref={emailRef} />

                <input type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                <button type="button" onClick={handleLogin}>Login</button>

                <div className="switch-text">
                    <p>
                        Don’t have an account?{" "}
                        <button type="button" onClick={handleRegister}>Register</button>
                    </p>
                </div>
            </form>

        </>

    )
}

export default Login