import LoginForm from "./LoginForm";
import { ReactComponent as LeftArrowIcon } from "../assets/LeftArrowIcon.svg";
import { Link } from "react-router-dom";
import lockIMG from "../assets/lock.jpg";
import "../stylesheets/AuthPanel.css";

function AuthPanel() {
  return (
    // Log In - Mobile
    <section className="auth-panel">
      <div className="container-lg">
        <div className="row">
          <div
            id="login-panel"
            className="col-12 mobile-side d-flex d-md-none flex-column justify-content-evenly align-items-center"
          >
            <p className="align-self-start">
              <Link
                to="/"
                className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
              >
                <LeftArrowIcon />
                Go Back
              </Link>
            </p>

            <LoginForm />

            <p className="text-center">
              Or Sign Up using{" "}
              <Link
                to="/logup"
                className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* Log In - Desktop-1 */}
          <div className="col-6 left-side d-none d-md-flex">
            <img className="lockIMG" src={lockIMG} alt="Lock Image" />
          </div>
          {/* Log In - Desktop-2 */}
          <div
            id="login-panel"
            className="col-6 right-side d-none d-md-flex flex-column justify-content-evenly align-items-center"
          >
            <p className="align-self-start">
              <Link
                to="/"
                className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
              >
                <LeftArrowIcon />
                Go Back
              </Link>
            </p>

            <LoginForm />

            <p className="text-center">
              Or Sign Up using{" "}
              <Link
                to="/logup"
                className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthPanel;
