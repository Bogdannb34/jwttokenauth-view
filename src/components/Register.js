import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { CHECK_FIRST, CHECK_LAST, CHECK_EMAIL, CHECK_PWD, REGISTER_URL } from '../helpers/constant';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../styles/form.css";

const Register = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [pass, setPass] = useState('');
    const [validPass, setValidPass] = useState(false);
    const [matchPass, setMatchPass] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const errorRef = useRef();

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
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-10 col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4">
                    <div className="card mb-3">
                        <div className="card-header text-center">
                            <h1>Register</h1>
                        </div>
                        <div className="card-body">
                            <div ref={errorRef} className={errMsg ? "alert alert-danger my-3" : ""} role="alert">{errMsg}</div>

                            <form onSubmit={handleSubmit} novalidate>
                                <div className="row mb-3">
                                    <div className="col-6">
                                        <label htmlFor='first-name-input' className="form-label label-required">
                                            First Name
                                            <span className={validFirstName ? "valid" : "hide"}>
                                                <FontAwesomeIcon icon={faCheck} />
                                            </span>
                                            <span className={validFirstName || !firstName ? "hide" : "invalid"}>
                                                <FontAwesomeIcon icon={faTimes} />
                                            </span>
                                        </label>
                                        <input type="text" className="form-control" id="first-name-input" name="firstName" required
                                            minlength="3" onChange={(e) => setFirstName(e.target.value)} />

                                        <div className="invalid-feedback" id="first-name-validation-error-hook">
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                            The first name is required. <br />
                                            The first name must contain at least 3 characters. <br />
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <label htmlFor="last-name-input" className="form-label label-required">
                                            Last Name
                                            <span className={validLastName ? "valid" : "hide"}>
                                                <FontAwesomeIcon icon={faCheck} />
                                            </span>
                                            <span className={validLastName || !lastName ? "hide" : "invalid"}>
                                                <FontAwesomeIcon icon={faTimes} />
                                            </span>
                                        </label>
                                        <input type="text" className="form-control" id="last-name-input" name="lastName" required
                                            minlength="3" onChange={(e) => setLastName(e.target.value)} />

                                        <div className="invalid-feedback" id="last-name-validation-error-hook">
                                            <FontAwesomeIcon icon={faInfoCircle} />
                                            The last name is required. <br />
                                            The last name must contain at least 3 characters. <br />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email-input" className="form-label label-required">
                                        Email
                                        <span className={validEmail ? "valid" : "hide"}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                        <span className={validEmail || !email ? "hide" : "invalid"}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                    </label>
                                    <input type="email" className="form-control" id="email-input" name="email" required
                                        onChange={(e) => setEmail(e.target.value)} />

                                    <div className="invalid-feedback" id="email-validation-error-hook">
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        The email is required. <br />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password-input" className="form-label label-required">
                                        Password
                                        <span className={validPass ? "valid" : "hide"}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                        <span className={validPass || !pass ? "hide" : "invalid"}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                    </label>
                                    <input type="password" className="form-control" id="password-input" name="password" required
                                        onChange={(e) => setPass(e.target.value)} />

                                    <div className="invalid-feedback" id="password-validation-error-hook">
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label for="confirm-password-input" className="form-label label-required">
                                        Confirm Password
                                        <span className={validMatch ? "valid" : "hide"}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </span>
                                        <span className={validMatch || !matchPass ? "hide" : "invalid"}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                    </label>
                                    <input type="password" className="form-control" id="confirm-password-input"
                                        name="confirmPassword" required onChange={(e) => setMatchPass(e.target.value)} />

                                    <div className="invalid-feedback" id="confirm-password-validation-error-hook">
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                    </div>
                                </div>

                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="accepted-terms-and-conditions-check"
                                        name="acceptedTermsAndConditions" required />
                                    <label clclassNameass="form-check-label" for="accepted-terms-and-conditions-check">Accept&nbsp;<a
                                        className="text-decoration-none" href="/terms">Terms and Conditions</a></label>
                                    <div className="invalid-feedback"
                                        id="accepted-terms-and-conditions-validation-error-hook"></div>
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary mb-3" id="register-button" disabled>Register
                                    </button>
                                    <button type="reset" className="btn btn-secondary">Cancel</button>
                                </div>
                            </form>
                            <div className="text-center mt-3">
                                <a href="/login" className="text-decoration-none"><strong>Already have an account? Login!</strong></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register;
