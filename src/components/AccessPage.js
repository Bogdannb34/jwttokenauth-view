import { Link } from 'react-router-dom';

const AccessPage = () => {
    return (
        <section className='container mt-3 w-50'>
            <div className='card bg-info'>
                <h1>Access Page</h1>
                <br />
                <h2>Public</h2>
                <Link className='text-white' to="/login">Login</Link>
                <Link className='text-white' to="/register">Register</Link>
                <br />
                <h2>Private</h2>
                <Link className='text-white' to="/home">Home</Link>
                <Link className='text-white' to="/admin">Admin Page</Link>
                <br />
            </div>
        </section>
    )
}

export default AccessPage