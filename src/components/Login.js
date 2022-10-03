import React from 'react'

const Login = () => {
    return (
        <div class="container-fluid mt-5">
            <div class="row justify-content-center">
                <div class="col-10 col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4">
                    <div class="card">
                        <div class="card-header text-center">
                            <h1>Login</h1>
                        </div>
                        <div class="card-body">

                            <div class="modal fade" id="error-modal" data-bs-backdrop="static" data-bs-keyboard="false"
                                tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="staticBackdropLabel"> </h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <form method="post" action="/login" id="log-in-form" novalidate>

                                <div class="mb-3">
                                    <label for="email-input" class="form-label label-required">Email</label>
                                    <input type="email" class="form-control" id="email-input" name="email" required
                                        maxlength="256" />

                                    <div class="invalid-feedback" id="email-validation-error-hook"></div>
                                </div>


                                <div class="mb-3">
                                    <label for="password-input" class="form-label label-required">Password</label>
                                    <input type="password" class="form-control" id="password-input" name="password" required
                                        maxlength="256" />

                                    <div class="invalid-feedback" id="password-validation-error-hook"></div>
                                </div>


                                <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="remember-me" name="remember-me" />
                                    <label class="form-check-label" for="remember-me">Remember Me</label>
                                </div>


                                <div class="d-grid">
                                    <button type="submit" class="btn btn-primary mb-3" id="log-in-button">Login</button>
                                    <button type="reset" class="btn btn-secondary">Cancel</button>
                                </div>
                            </form>

                            <div class="text-center mt-3">
                                <a href="/register" class="text-decoration-none"><strong>Don't have an account
                                    yet?</strong></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login