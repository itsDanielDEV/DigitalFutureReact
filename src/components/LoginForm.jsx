import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

let emailErrorMessage = "";
let passwordErrorMessage = "";

function LoginForm(props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isPassValid, setIsPassValid] = useState(null);

  function inputHandler(e, setValueInput, newRegExp) {
    let input = null,
      inputType = null;
    try {
      input = e.target.value;
      inputType = e.target.type;
    } catch (error) {
      input = e.value;
      inputType = e.type;
    }
    setValueInput(input);

    if (!input) {
      if (inputType === "email") {
        setIsEmailValid(false);
        emailErrorMessage = "Email required";
      } else if (inputType === "password") {
        setIsPassValid(false);
        passwordErrorMessage = "Password required";
      }
      return;
    }

    if (newRegExp.test(input)) {
      if (inputType === "email") {
        setIsEmailValid(true);
      } else if (inputType === "password") {
        setIsPassValid(true);
      }
    } else {
      if (inputType === "email") {
        setIsEmailValid(false);
        emailErrorMessage = "Email isn't valid";
      } else if (inputType === "password") {
        setIsPassValid(false);
        passwordErrorMessage = "Password must have 9 or more characters";
      }
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    if (isEmailValid && isPassValid) {
      await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            alert("Invalid email or password.");
            throw new Error("Invalid email or password.");
          }
          return res.json();
        })
        .then((response) => localStorage.setItem("token", response.token))
        .then((data) => {
          alert(`Welcome Back!`);
          navigate("/home");
        })
        .catch((error) => console.error(error.message));
    }
    const $form = e.target.closest("form"),
      $email = $form.querySelector("input[type='email']"),
      $pass = $form.querySelector("input[type='password']");
    inputHandler(
      $email,
      setEmail,
      new RegExp(
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
      )
    );
    inputHandler($pass, setPassword, new RegExp(".{9,}"));
  }

  return props.on ? (
    <form className="w-100" method="get" noValidate onSubmit={submitHandler}>
      <h1 className="text-primary text-center mt-3 mb-3">Login</h1>
      <div className="input-group has-validation">
        <div className="form-floating">
          <input
            name="email"
            type="email"
            onChange={(e) =>
              inputHandler(
                e,
                setEmail,
                new RegExp(
                  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
                )
              )
            }
            className={`form-control ${
              isEmailValid === null
                ? ""
                : isEmailValid
                ? "is-valid"
                : "is-invalid"
            }
            `}
            id="input"
            placeholder=""
            autoComplete="off"
            required
          />
          <label htmlFor="input" className="form-label">
            Email address
          </label>
          <div className={`invalid-feedback ${isEmailValid ? "d-none" : ""}`}>
            {emailErrorMessage}
          </div>
        </div>
      </div>

      <div className="input-group has-validation">
        <div className="form-floating mt-3">
          <input
            name="password"
            type="password"
            className={`form-control ${
              isPassValid === null
                ? ""
                : isPassValid
                ? "is-valid"
                : "is-invalid"
            }
            `}
            id="inputPass"
            placeholder=""
            onChange={(e) => inputHandler(e, setPassword, new RegExp(".{9,}"))}
            required
          />
          <label htmlFor="inputPass">Password</label>
          <div className={`invalid-feedback ${isPassValid ? "d-none" : ""}`}>
            {passwordErrorMessage}
          </div>
        </div>
      </div>

      <p className="text-end">
        <Link
          to="/"
          className="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
        >
          Forgot Password?
        </Link>
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
      <p className="text-center">
        Or Sign up using{" "}
        <Link
          to="/logup"
          className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
        >
          Sign up
        </Link>
      </p>
    </form>
  ) : (
    <div></div>
  );
}

export default LoginForm;
