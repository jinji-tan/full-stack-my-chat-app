

const Home = ({ setPage }) => {
    const fullName = localStorage.getItem("fullName");

    const handleLogout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("fullName");
        localStorage.removeItem("page");

        setPage("login")
    }

    return (
        <form className="home-page">
            <h1>Home</h1>
            <p className="home-page-greet-user">Hi, {fullName}</p>
            <button type="button" onClick={handleLogout}>Logout</button>
        </form>
    )
}

export default Home