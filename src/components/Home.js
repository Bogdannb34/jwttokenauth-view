import { Link, useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();

    const logout = async () => {
        navigate('/');
    }
    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow mt-3">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home