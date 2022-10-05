import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LOGIN_URL } from '../helpers/constant';
import axios from '../api/axios';

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const userRef = useRef();
    const errorRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg("");
    }, [email, pass])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email: email, password: pass }),
                {
                    headers: { 'Content-Type': "application/json" },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            setEmail('');
            setPass('');
            navigate(from, { replace: true });
        } catch (error) {
            if (!error?.response) {
                setErrMsg("No Server Response");
            } else if (error.response?.status === 400) {
                setErrMsg("Missing Email or Password");
            } else if (error.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
            errorRef.current.focus();
        }
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-10 col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4">
                    <div className="card">
                        <div className="card-header text-center">
                            <h1>Login</h1>
                        </div>
                        <div className="card-body">

                            <div ref={errorRef} className={errMsg ? "alert alert-danger my-3" : "offscreen"} role="alert">{errMsg}</div>

                            <form onSubmit={handleSubmit} noValidate>

                                <div className="mb-3">
                                    <label htmlFor="email-input" className="form-label">Email</label>
                                    <input type="email" autoComplete='off' ref={userRef} className="form-control"
                                        id="email-input" name="email" required onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        maxLength="256" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password-input" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password-input" name="password" required
                                        onChange={(e) => setPass(e.target.value)}
                                        value={pass}
                                        maxLength="40" />
                                </div>


                                <div className="mb-3 form-check text-start">
                                    <input type="checkbox" className="form-check-input" id="remember-me" name="remember-me" />
                                    <label className="form-check-label" htmlFor="remember-me">Remember Me</label>
                                </div>


                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary mb-3" id="log-in-button"
                                        disabled={!email || !pass ? true : false}>
                                        Login</button>
                                    <button type="reset" className="btn btn-secondary">Cancel</button>
                                </div>
                            </form>

                            <div className="text-center mt-3">
                                <Link to="/register" className="text-decoration-none"><strong>Don't have an account
                                    yet? Sign Up</strong></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login