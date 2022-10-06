import { Link } from "react-router-dom";
import Users from './Users';

const Admin = () => {
    return (
        <section className="container mt-3 w-50">
            <div className="card bg-info">
                <h1>Admins Page</h1>
                <br />
                <Users />
                <br />
                <div className="flexGrow mb-2">
                    <Link className="text-white" to="/home">Home</Link>
                </div>
            </div>
        </section>
    )
}

export default Admin