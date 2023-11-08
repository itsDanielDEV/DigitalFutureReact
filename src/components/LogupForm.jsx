import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

let emailErrorMessage = "";
let passwordErrorMessage = "";
let verifyPasswordErrorMessage = "";
let firstNameErrorMessage = "";
let lastNameErrorMessage = "";

function LogupForm(props) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isPassValid, setIsPassValid] = useState(null);
  const [isVerifyPassValid, setIsVerifyPassValid] = useState(null);
  const [isFirstNameValid, setIsFirstNameValid] = useState(null);
  const [isLastNameValid, setIsLastNameValid] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (verifyPassword.length > 8)
      if (password === verifyPassword) {
        setIsVerifyPassValid(true);
      } else {
        setIsVerifyPassValid(false);
        verifyPasswordErrorMessage = "Passwords do not match";
      }
    // console.log("password: " + password + "\nverify: " + verifyPassword);
  }, [password, verifyPassword]);

  function inputHandler(e, setValueInput, newRegExp) {
    let input = null,
      inputType = null;
    try {
      input = e.target.value;
      inputType = e.target.name;
    } catch (error) {
      input = e.value;
      inputType = e.name;
    }

    setValueInput(input);

    if (!input) {
      if (inputType === "email") {
        setIsEmailValid(false);
        emailErrorMessage = "Email required";
      } else if (inputType === "password") {
        setIsPassValid(false);
        passwordErrorMessage = "Password required";
      } else if (inputType === "verifyPassword") {
        setIsVerifyPassValid(false);
        verifyPasswordErrorMessage = "Password required";
      } else if (inputType === "firstName") {
        setIsFirstNameValid(false);
        firstNameErrorMessage = "First Name required";
      } else if (inputType === "lastName") {
        setIsLastNameValid(false);
        lastNameErrorMessage = "Last Name required";
      }
      return;
    }

    if (newRegExp.test(input)) {
      if (inputType === "email") {
        setIsEmailValid(true);
      } else if (inputType === "password") {
        setIsPassValid(true);
      } else if (inputType === "firstName") {
        setIsFirstNameValid(true);
      } else if (inputType === "lastName") {
        setIsLastNameValid(true);
      }
    } else {
      if (inputType === "email") {
        setIsEmailValid(false);
        emailErrorMessage = "Email isn't valid";
      } else if (inputType === "password") {
        setIsPassValid(false);
        passwordErrorMessage = "Password must have 9 or more characters";
      } else if (inputType === "verifyPassword") {
        setIsVerifyPassValid(false);
        verifyPasswordErrorMessage = "Password must have 9 or more characters";
      }
    }
  }

  async function submitHandler(e) {
    e.preventDefault();
    if (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isPassValid &&
      isVerifyPassValid
    ) {
      //https://dummyjson.com/users/add
      await fetch("http://localhost:3001/logup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          address: address,
          // expiresInMins: 60, // optional
        }),
      })
        .then((res) => {
          if (!res.ok) {
            alert("Connection error");
            throw new Error("Connection error");
          }
          return res.json();
        })
        .then((response) => {
          alert(`Registered Successfully! Welcome ${firstName} ${lastName}`);
          navigate("/login");
          return response;
        })
        .catch((error) => console.error(error.message));
    }

    const $form = e.target.closest("form"),
      $firstName = $form.querySelector("input[name='firstName']"),
      $lastName = $form.querySelector("input[name='lastName']"),
      $email = $form.querySelector("input[name='email']"),
      $pass = $form.querySelector("input[name='password']"),
      $verifyPass = $form.querySelector("input[name='verifyPassword']");

    inputHandler($firstName, setFirstName, new RegExp(".{1,}"));
    inputHandler($lastName, setLastName, new RegExp(".{1,}"));

    inputHandler(
      $email,
      setEmail,
      new RegExp(
        "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
      )
    );
    inputHandler($pass, setPassword, new RegExp(".{9,}"));
    inputHandler($verifyPass, setVerifyPassword, new RegExp(".{9,}"));
  }

  return props.on ? (
    <form className="w-100" method="get" noValidate onSubmit={submitHandler}>
      <h1 className="text-primary text-center mt-3 mb-3">Sign up</h1>

      {/* Input name */}
      <div
        className={`input-group has-validation ${
          isFirstNameValid === null && isLastNameValid === null
            ? "mb-3"
            : isFirstNameValid || isLastNameValid
            ? "mb-2"
            : "mb-0"
        }`}
      >
        <div className="col col-group">
          <div className="form-floating">
            <input
              name="firstName"
              type="text"
              className={`form-control ${
                isFirstNameValid === null
                  ? ""
                  : isFirstNameValid
                  ? "is-valid"
                  : "is-invalid"
              }`}
              id="firstName"
              placeholder=""
              onChange={(e) =>
                inputHandler(e, setFirstName, new RegExp(".{1,}"))
              }
              required
            />
            <label htmlFor="firstName">First Name</label>
            <div
              className={`invalid-feedback m-0 ${
                isFirstNameValid ? "d-none" : ""
              }`}
            >
              {firstNameErrorMessage}
            </div>
          </div>
        </div>
        <div className="col col-group">
          <div className="form-floating">
            <input
              name="lastName"
              type="text"
              className={`form-control ${
                isLastNameValid === null
                  ? ""
                  : isLastNameValid
                  ? "is-valid"
                  : "is-invalid"
              }`}
              id="lastName"
              placeholder=""
              onChange={(e) =>
                inputHandler(e, setLastName, new RegExp(".{1,}"))
              }
              required
            />
            <label htmlFor="lastName">Last Name</label>
            <div
              className={`invalid-feedback m-0 ${
                isLastNameValid ? "d-none" : ""
              }`}
            >
              {lastNameErrorMessage}
            </div>
          </div>
        </div>
      </div>

      {/* Email */}
      <div
        className={`input-group has-validation ${
          isEmailValid === null ? "mb-3" : isEmailValid ? "mb-3" : "mb-0"
        }`}
      >
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
          <div
            className={`invalid-feedback m-0 ${isEmailValid ? "d-none" : ""}`}
          >
            {emailErrorMessage}
          </div>
        </div>
      </div>

      {/* Password */}
      <div
        className={`input-group has-validation ${
          isPassValid === null ? "mb-3" : isPassValid ? "mb-3" : "mb-0"
        }`}
      >
        <div className="col col-group">
          <div className="form-floating">
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
              onChange={(e) =>
                inputHandler(e, setPassword, new RegExp(".{9,}"))
              }
              required
            />
            <label htmlFor="inputPass">Pass</label>
            <div
              className={`invalid-feedback m-0 ${isPassValid ? "d-none" : ""}`}
            >
              {passwordErrorMessage}
            </div>
          </div>
        </div>

        <div className="col col-group">
          <div className="form-floating">
            <input
              name="verifyPassword"
              type="password"
              className={`form-control ${
                isVerifyPassValid === null
                  ? ""
                  : isVerifyPassValid
                  ? "is-valid"
                  : "is-invalid"
              }`}
              id="verifyInputPass"
              placeholder=""
              onChange={(e) =>
                inputHandler(e, setVerifyPassword, new RegExp(".{9,}"))
              }
              required
            />
            <label htmlFor="verifyInputPass">Verify Pass</label>
            <div
              className={`invalid-feedback m-0 ${
                isVerifyPassValid ? "d-none" : ""
              }`}
            >
              {verifyPasswordErrorMessage}
            </div>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="input-group has-validation mb-0">
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder=""
            autoComplete="off"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
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
          Sign up
        </button>
      </div>
      <p className="text-center">
        Or Log in using{" "}
        <Link
          to="/login"
          className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
        >
          Log in
        </Link>
      </p>
    </form>
  ) : (
    <div></div>
  );
}

export default LogupForm;
