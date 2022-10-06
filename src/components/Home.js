import { Link, useNavigate } from "react-router-dom";
import useLogout from '../hooks/useLogout';

const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/');
    }
    return (
        <section className="container mt-3 w-50">
            <div className="card bg-info">
                <h1>Home</h1>
                <br />
                <p>You are logged in!</p>
                <br />
                <Link to="/admin">Go to Admin Page</Link>
                <br />
                <div className="flexGrow mb-3">
                    <button onClick={signOut}>Sign Out</button>
                </div>
            </div>
        </section>
    )
}

export default Home