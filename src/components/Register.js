import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { CHECK_FIRST, CHECK_LAST, CHECK_EMAIL, CHECK_PWD, REGISTER_URL } from '../helpers/constant';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../styles/form.css";

const Register = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstFocus, setFirstFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastFocus, setLastFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pass, setPass] = useState('');
    const [validPass, setValidPass] = useState(false);
    const [passFocus, setPassFocus] = useState(false);

    const [matchPass, setMatchPass] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const userRef = useRef();
    const errorRef = useRef();

    useEffect(() => {
        userRef.current.focus()
    }, []);

    useEffect(() => {
        const result = CHECK_FIRST.test(firstName);
        setValidFirstName(result);
    }, [firstName]);

    useEffect(() => {
        const result = CHECK_LAST.test(lastName);
        setValidLastName(result);
    }, [lastName]);

    useEffect(() => {
        const result = CHECK_EMAIL.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = CHECK_PWD.test(pass);
        setValidPass(result);
        const match = pass === matchPass;
        setValidMatch(match);
    }, [pass, matchPass]);

    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, email, pass, matchPass]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValidFirst = CHECK_FIRST.test(firstName);
        const isValidLast = CHECK_LAST.test(lastName);
        const isValidEmail = CHECK_EMAIL.test(email);
        const isValidPass = CHECK_PWD.test(pass);
        if (!isValidFirst || !isValidLast || !isValidEmail || !isValidPass) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({
                    firstName: firstName, lastName: lastName, email: email, password: pass, confirmPassword: matchPass
                }),
                {
                    headers: { 'Content-Type': "application/json" },
                    withCredentials: true
                }
            );
            console.log(response.data);
            setFirstName('');
            setLastName('');
            setEmail('');
            setPass('');
            setMatchPass('');
            navigate("/login", { replace: true });
        } catch (error) {
            if (!error?.response) {
                setErrMsg("No Server Response");
            } else if (error.response?.status === 409) {
                setErrMsg("Username or Email already taken");
            } else {
                setErrMsg("Registration Failed!");
            }
            errorRef.current.focus();
        }
    };

    return (
        <div className="container-fluid mt-4">
            <div className="row justify-content-center">
                <div className="col-10 col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4">
                    <div className="card mb-3">
                        <div className="card-header text-center">
                            <h1>Register</h1>
                        </div>
                        <div className="card-body">
                            <div ref={errorRef} className={errMsg ? "alert alert-danger my-3" : "offscreen"} role="alert">{errMsg}</div>

                            <form onSubmit={handleSubmit} noValidate>
                                <div className="row mb-3">
                                    <div className="col-6">
                                        <label htmlFor='first-name-input' className="form-label">
                                            First Name
                                            <span className={validFirstName ? "valid" : "hide"}>
                                                <FontAwesomeIcon icon={faCheck} />
                                            </span>
                                            <span className={validFirstName || !firstName ? "hide" : "invalid"}>
                                                <FontAwesomeIcon icon={faTimes} />
                                            </span>
                                        </label>
                                        <input type="text" ref={userRef} className="form-control" id="first-name-input" name="firstName" required
                                            minLength="3" autoComplete='off' aria-describedby='first-name-validation-error-hook'
                                            onChange={(e) => setFirstName(e.target.value)}
                                            onFocus={() => setFirstFocus(true)}
                                            onBlur={() => setFirstFocus(false)}
                                        />

                                        <div className={firstFocus && !validFirstName ? "feedback" : "offscreen"}
                                            id="first-name-validation-error-hook">
                                            <FontAwesomeIcon icon={faInfoCircle} />&nbsp;
                                            The first name is required. <br />
                                            Must contain at least 3 characters. <br />
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <label htmlFor="last-name-input" className="form-label">
                                            Last Name
                                            <span className={validLastName ? "valid" : "hide"}>
                                                <FontAwesomeIcon icon={faCheck} />
                                            </span>
                                            <span className={validLastName || !lastName ? "hide" : "invalid"}>
                                                <FontAwesomeIcon icon={faTimes} />
                                            </span>
                                        </label>
                                        <input type="text" className="form-control" id="last-name-input" name="lastName" required
                                            minLength="3" autoComplete='off' aria-describedby='last-name-validation-error-hook'
                                            onChange={(e) => setLastName(e.target.value)}
                                            onFocus={() => setLastFocus(true)}
                                            onBlur={() => setLastFocus(false)}
                                        />

                                        <div className={lastFocus && !validLastName ? "feedback" : "offscreen"}
                                            id="last-name-validation-error-hook">
                                            <FontAwesomeIcon icon={faInfoCircle} />&nbsp;
                                            The last name is required. <br />
                                            Must contain at least 3 characters. <br />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email-input" className="form-label">
                                        Email
                                        <span className={validEmail ? "valid" : "hide"}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                        <span className={validEmail || !email ? "hide" : "invalid"}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                    </label>
                                    <input type="email" className="form-control" id="email-input" name="email" required
                                        autoComplete='off'
                                        onChange={(e) => setEmail(e.target.value)}
                                        aria-describedby='email-validation-error-hook'
                                        onFocus={() => setEmailFocus(true)}
                                        onBlur={() => setEmailFocus(false)}
                                    />

                                    <div className={emailFocus && !validEmail ? "feedback" : "offscreen"}
                                        id="email-validation-error-hook">
                                        <FontAwesomeIcon icon={faInfoCircle} />&nbsp;
                                        The email is required. <br />
                                        Must include at symbol: <span aria-label="at symbol">@</span> <br />
                                        Can contain letters, numbers, underscores, hyphens.
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password-input" className="form-label">
                                        Password
                                        <span className={validPass ? "valid" : "hide"}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                        <span className={validPass || !pass ? "hide" : "invalid"}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                    </label>
                                    <input type="password" className="form-control" id="password-input" name="password" required
                                        onChange={(e) => setPass(e.target.value)}
                                        aria-describedby='password-validation-error-hook'
                                        onFocus={() => setPassFocus(true)}
                                        onBlur={() => setPassFocus(false)}
                                    />

                                    <div className={passFocus && !validPass ? "feedback" : "offscreen"}
                                        id="password-validation-error-hook">
                                        <FontAwesomeIcon icon={faInfoCircle} />&nbsp;
                                        6 to 40 characters. <br />
                                        Must include uppercase and lowercase letters, a number and special character. <br />
                                        Allowed special characters: <span aria-label="exclamation mark">!</span>
                                        <span aria-label="at symbol">@</span><span aria-label="hashtag">#</span>
                                        <span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confirm-password-input" className="form-label">
                                        Confirm Password
                                        <span className={validMatch && matchPass ? "valid" : "hide"}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                        <span className={validMatch || !matchPass ? "hide" : "invalid"}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                    </label>
                                    <input type="password" className="form-control" id="confirm-password-input"
                                        name="confirmPassword" required onChange={(e) => setMatchPass(e.target.value)}
                                        aria-describedby='confirm-password-validation-error-hook'
                                        onFocus={() => setMatchFocus(true)}
                                        onBlur={() => setMatchFocus(false)}
                                    />

                                    <div className={matchFocus && !validMatch ? "feedback" : "offscreen"}
                                        id="confirm-password-validation-error-hook">
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        &nbsp;Must match the first password input field.
                                    </div>
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary mb-3" id="register-button"
                                        disabled={!validFirstName || !validLastName || !validEmail || !validPass || !validMatch ? true : false}>
                                        Register
                                    </button>
                                    <button type="reset" className="btn btn-secondary">Cancel</button>
                                </div>
                            </form>
                            <div className="text-center mt-3">
                                <Link to="/login" className="text-decoration-none"><strong>Already have an account? Sign In!</strong></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register;
