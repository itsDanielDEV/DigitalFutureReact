import favicon from "../assets/favicon.png";
import "../stylesheets/NavbarGuest.css";
import { Link } from "react-router-dom";
import { ReactComponent as PersonCircleIcon } from "../assets/PersonCircleIcon.svg";
import { ReactComponent as CartIcon } from "../assets/CartIcon.svg";
import { ReactComponent as HamburguerIcon } from "../assets/HamburguerBarIcon.svg";
import { useState, useEffect } from "react";

function NavbarGuest(props) {
  const accountOptions =
    props.homeMode || props.adminMode
      ? ["Profile", "Admin", "Settings", "Log out"]
      : ["Log in", "Log up"];

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const $offcanvasElement = document.getElementById("offcanvasExample");

    const categoriesItems =
      $offcanvasElement.querySelectorAll(".categories-item");

    const closeOffcanvas = () => {
      $offcanvasElement.classList.remove("show");
    };

    const handleClick = (event) => {
      const { target } = event;
      if (target.matches(".categories-item")) {
        const $offcanvasBackdrop = document.querySelector(
          ".offcanvas-backdrop"
        );
        closeOffcanvas();
        $offcanvasBackdrop.classList.add("d-none");
        document.body.removeAttribute("style");
      } else if (target.matches(".offcanvas-backdrop")) {
        event.preventDefault();
      }
    };

    document.addEventListener("click", handleClick);

    if (!props.adminMode) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://fakestoreapi.com/products/categories"
          );
          const data = await response.json();
          setCategories(data);
        } catch (error) {
          // Manejar errores aquí
          // console.error("Error fetching data:", error);
        }
      };
      fetchData();
    } else {
      setCategories(["Inventory", "My Orders", "Record Sales"]);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <header className="w-100">
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
          {/* Hamburguer and logo */}
          <div className="navbar-brand d-flex justify-content-center align-items-center">
            <button
              className={`navbar-toggler me-3 ${
                props.homeMode || props.adminMode ? "" : "d-none"
              }`}
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExample"
              aria-controls="offcanvasExample"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link
              className="navbar-brand d-flex justify-content-center align-items-center"
              to={props.adminMode || props.homeMode ? "/home" : "/"}
            >
              <img
                className="me-1 d-inline-block align-text-top"
                src={favicon}
                alt="Logo"
                width="30"
                height="30"
              />
              <span className="d-none d-sm-inline">DigitalFuture</span>
            </Link>
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

      <div
        className={`container-fluid cta ${
          props.homeMode || props.adminMode ? "d-none" : ""
        }`}
      >
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
          props.homeMode || props.adminMode ? "d-lg-block" : "d-none"
        }`}
      >
        <section
          className={`inner-dkp d-flex justify-content-between align-items-strech d-none d-lg-flex`}
        >
          {props.adminMode ? null : (
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
          )}
          <div className="dkp-names d-flex justify-content-between align-items-center mx-auto">
            {/* {props.adminMode ? null : (
              <>
                <a href="#bestsellers" className="p-2 px-3">
                  Bestsellers
                </a>
                <a href="#trendingproducts" className="p-2 px-3">
                  Trending Products
                </a>
              </>
            )} */}
            {categories.map((category) => (
              <a key={category} className="p-2 px-3" href={`#${category}`}>
                {category}
              </a>
            ))}
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
              <p className="categories-title">Categories</p>
              {categories.map((category) => (
                <a
                  key={category}
                  className="categories-item"
                  href={`#${category}`}
                >
                  {category}
                </a>
              ))}
            </div>
            <div className="categories d-flex flex-column">
              <p className="categories-title">Help and Configuration</p>
              <a className="categories-item" href="#">
                Profile
              </a>
              <a className="categories-item" href="/admin">
                Admin
              </a>
              <a className="categories-item" href="#">
                Settings
              </a>
              <a className="categories-item" href="/">
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
