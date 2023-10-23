import favicon from "../assets/favicon.png";
import "../stylesheets/NavbarGuest.css";
import { Link } from "react-router-dom";
import { ReactComponent as PersonCircleIcon } from "../assets/PersonCircleIcon.svg";
import { ReactComponent as CartIcon } from "../assets/CartIcon.svg";
import { ReactComponent as HamburguerIcon } from "../assets/HamburguerBarIcon.svg";
import { useEffect } from "react";

function NavbarGuest(props) {
  const accountOptions = props.homeMode
    ? ["Profile", "Admin", "Settings", "Log out"]
    : ["Log in", "Log up"];

  useEffect(() => {
    const d = document;
    d.addEventListener("click", (e) => {
      if (e.target.matches(".categories-item")) {
        const $canvasBody = d.querySelector(".ctm-offcanvas-dkp");
        const $canvasBackdrop = d.querySelector(".offcanvas-backdrop");
        d.body.removeAttribute("style");
        $canvasBody.classList.remove("show");
        $canvasBackdrop.remove();
      }
    });
  });

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
          {/* Hamburguer and logo */}
          <div className="navbar-brand d-flex justify-content-center align-items-center">
            <button
              className={`navbar-toggler me-3 ${
                props.homeMode ? "" : "d-none"
              }`}
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
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
              {accountOptions.map((op) => (
                <li key={op}>
                  <Link
                    to={`/${op.toLowerCase().replace(" ", "")}`}
                    className="dropdown-item"
                  >
                    {op}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasCart"
              aria-controls="offcanvasCart"
              type="button"
              className="btn btn-outline-secondary"
            >
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
                    {accountOptions.map((op) => (
                      <li key={op}>
                        <Link
                          to={`/${op.toLowerCase().replace(" ", "")}`}
                          className="dropdown-item"
                        >
                          {op}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <button
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasCart"
                    aria-controls="offcanvasCart"
                    type="button"
                    className="btn btn-outline-secondary"
                  >
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

      <div className={`container-fluid cta ${props.homeMode ? "d-none" : ""}`}>
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

      <article
        id="parent-canvas-dkp"
        className={`container-fluid categories-dkp  ${
          props.homeMode ? "d-lg-block" : "d-none"
        }`}
      >
        <section
          className={`inner-dkp d-flex justify-content-between align-items-strech d-none d-lg-flex`}
        >
          <button
            id="button-control-canva"
            className="btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <HamburguerIcon />
            All
          </button>
          <div className="dkp-names d-flex justify-content-between align-items-center mx-auto">
            <a href="#bestsellers" className="p-2 px-3">
              Bestsellers
            </a>
            <a href="#trendingproducts" className="p-2 px-3">
              Trending Products
            </a>
            <a href="#smartphones" className="p-2 px-3">
              Smartphones
            </a>
            <a href="#computers" className="p-2 px-3">
              Computers
            </a>
            <a href="#laptops" className="p-2 px-3">
              Laptops
            </a>

            <a href="#gaming" className="p-2 px-3">
              Gaming
            </a>
            <a href="#software" className="p-2 px-3">
              Software
            </a>
          </div>
        </section>

        <aside
          className="offcanvas offcanvas-start ctm-offcanvas-dkp"
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header pb-1">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          {/* Lateral bar desktop */}
          <div className="offcanvas-body pt-1">
            <div className="categories d-flex flex-column">
              <p className="categories-title">Featured Products</p>

              <a className="categories-item" href="#bestsellers">
                Bestsellers
              </a>
              <a className="categories-item" href="#newreleases">
                New Releases
              </a>
              <a className="categories-item" href="#trendingproducts">
                Trending Products
              </a>
            </div>
            <div className="categories d-flex flex-column">
              <p className="categories-title">Electronics</p>
              <a className="categories-item" href="#smartphones">
                Smartphones
              </a>
              <a className="categories-item" href="#computers">
                Computers
              </a>
              <a className="categories-item" href="#laptops">
                Laptops
              </a>
              <a className="categories-item" href="#accesories">
                Accessories
              </a>
              <a className="categories-item" href="#gaming">
                Gaming
              </a>
              <a className="categories-item" href="#software">
                Software
              </a>
              <a className="categories-item" href="#audioandsound">
                Audio and Sound
              </a>
            </div>
            <div className="categories d-flex flex-column">
              <p className="categories-title">Help and Configuration</p>
              <a className="categories-item" href="#">
                Profile
              </a>
              <a className="categories-item" href="./admin.html">
                Admin
              </a>
              <a className="categories-item" href="#">
                Settings
              </a>
              <a className="categories-item" href="./index.html">
                Log Out
              </a>
            </div>
          </div>
        </aside>
      </article>
    </header>
  );
}

export default NavbarGuest;
