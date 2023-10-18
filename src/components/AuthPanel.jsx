import LoginForm from "./LoginForm";
import LogupForm from "./LogupForm";
import { ReactComponent as LeftArrowIcon } from "../assets/LeftArrowIcon.svg";
import { Link } from "react-router-dom";
import lockIMG from "../assets/lock.jpg";
import "../stylesheets/AuthPanel.css";

function AuthPanel(props) {
  return (
    // Log In - Mobile
    <section className="auth-panel">
      <div className="container-lg">
        <div className="row">
          <div
            id="login-panel"
            className="col-12 mobile-side d-flex d-lg-none flex-column justify-content-evenly align-items-center"
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
            {props.type === "login" ? <LoginForm on={true} /> : ""}
            {props.type === "logup" ? <LogupForm on={true} /> : ""}
          </div>

          {/* Log In - Desktop-1 */}
          <div className="col-6 left-side d-none d-lg-flex">
            <img className="lockIMG" src={lockIMG} alt="Lock" />
          </div>
          {/* Log In - Desktop-2 */}
          <div
            id="login-panel"
            className="col-6 right-side d-none d-lg-flex flex-column justify-content-evenly align-items-center"
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

            {props.type === "login" ? <LoginForm on={true} /> : ""}
            {props.type === "logup" ? <LogupForm on={true} /> : ""}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthPanel;
