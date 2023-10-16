function LoginForm() {
  return (
    <form className="w-100" action="./home.html" method="get">
      <h1 className="text-primary text-center mt-3 mb-3">Login</h1>
      <div className="input-group has-validation">
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder=""
            autoComplete="off"
            required
          />
          <label htmlFor="inputEmail" className="form-label">
            Email address
          </label>
        </div>
      </div>

      <div className="input-group has-validation">
        <div className="form-floating mt-3">
          <input
            type="password"
            className="form-control"
            id="inputPass"
            placeholder=""
            required
          />
          <label htmlFor="inputPass">Password</label>
        </div>
      </div>

      <p className="text-end">
        <a
          href="..."
          className="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
        >
          Forgot Password?
        </a>
      </p>

      <div className="d-flex justify-content-center mt-4 mb-4">
        <button
          id="btn-submit"
          type="submit"
          className="btn btn-primary flex-grow-1"
        >
          Log In
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
