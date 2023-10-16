import favicon from "../assets/favicon.png";
import "../stylesheets/NavbarGuest.css";
import { Link } from "react-router-dom";
import { ReactComponent as PersonCircleIcon } from "../assets/PersonCircleIcon.svg";
import { ReactComponent as CartIcon } from "../assets/CartIcon.svg";

function NavbarGuest() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
          {/* Hamburguer and logo */}
          <div className="navbar-brand d-flex justify-content-center align-items-center">
            <button
              className="navbar-toggler me-3 d-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <a
              className="navbar-brand d-flex justify-content-center align-items-center"
              href="/"
            >
              <img
                className="me-1 d-inline-block align-text-top"
                src={favicon}
                alt="Logo"
                width="30"
                height="30"
              />
              <span className="d-none d-sm-inline">DigitalFuture</span>
            </a>
          </div>

          {/* Mobile Dropdown header */}
          <div className="btn-group d-flex d-lg-none">
            <button
              type="button"
              className="btn btn-outline-secondary dropdown-toggle rounded-end"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <PersonCircleIcon />
              <span className="visually-hidden">Button</span>
            </button>
            <ul className="dropdown-menu" style={{ left: "-100%" }}>
              <li>
                <Link to="/login" className="dropdown-item">
                  Log in
                </Link>
              </li>
              <li>
                <Link to="/logup" className="dropdown-item">
                  Sign up
                </Link>
              </li>
            </ul>

            <button type="button" className="btn btn-outline-secondary">
              <CartIcon />
              <span className="visually-hidden">Button</span>
            </button>
          </div>

          {/* Lateral bar */}
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body justify-content-end">
              <h5
                className="offcanvas-title flex-grow-1 text-center pe-3 d-lg-none d-block"
                id="offcanvasNavbarLabel"
              >
                Categories
              </h5>
              <div className="d-flex justify-content-center w-100">
                {/* Search-2 */}
                <form className="d-none d-lg-flex w-50" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-primary" type="submit">
                    Search
                  </button>
                </form>
              </div>
              <ul className="navbar-nav justify-content-center align-items-center pe-3">
                {/* Desktop Dropdown navbar*/}
                <div className="btn-group d-none d-lg-flex">
                  <button
                    type="button"
                    className="btn btn-outline-secondary account rounded-end dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <PersonCircleIcon />
                    Account
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/login" className="dropdown-item">
                        Log in
                      </Link>
                    </li>
                    <li>
                      <Link to="/logup" className="dropdown-item">
                        Sign up
                      </Link>
                    </li>
                  </ul>

                  <button type="button" className="btn btn-outline-secondary">
                    <CartIcon />
                    Cart
                  </button>
                </div>
              </ul>
              {/* Search bar */}
              <form
                className="d-flex align-items-center mt-3 mt-lg-0 d-none"
                role="search"
              >
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
        <form
          className="d-flex flex-grow-1 mx-3 mt-2 d-flex d-lg-none"
          role="search"
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </nav>

      <div className="container-fluid cta">
        <h5 className="m-0 text-center text-responsive">
          Tech Dreams Await 🚀{" "}
          <Link
            to="logup"
            className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fst-italic"
          >
            Sign Up Now!
          </Link>
        </h5>
      </div>
    </header>
  );
}

export default NavbarGuest;
