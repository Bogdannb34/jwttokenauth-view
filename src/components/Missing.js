import { Link } from 'react-router-dom';

const Missing = () => {
    return (
        <article>
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div>
                <Link to="/home">Check our Homepage</Link>
            </div>
        </article>
    )
}

export default Missing