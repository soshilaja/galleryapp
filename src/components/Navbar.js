import { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useFirestoreContext } from "../context/FirestoreContext";

const LogIn = () => {
  const { login, currentUser } = useAuthContext();
  return (
    !currentUser && (
      <button type="button" className="btn btn-warning" onClick={login}>
        Login
      </button>
    )
  );
};

const LogOut = () => {
  const { logout, currentUser } = useAuthContext();
  return (
    !!currentUser && (
      <button type="button" className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    )
  );
};

function Navigation() {
  const { currentUser } = useAuthContext();
  const { pathname } = useLocation();
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      {/* remove all links except HOME */}
      <Link
        className={`nav-link ${pathname === "/" ? "active" : ""}`}
        aria-current="page"
        to="/"
      >
        <li className="nav-item">Home</li>
      </Link>
      {currentUser && (
        <Link
          className={`nav-link ${pathname === "/stocks" ? "active" : ""}`}
          aria-current="page"
          to="/stocks"
        >
          <li className="nav-item">My Stocks</li>
        </Link>
      )}
      {currentUser && (
        <Link
          className={`nav-link ${pathname === "/profile" ? "active" : ""}`}
          aria-current="page"
          to="/profile"
        >
          <li className="nav-item">Profile</li>
        </Link>
      )}
    </ul>
  );
}

function SearchForm() {
  const [text, search] = useState(null);
  const { filterItems: filter } = useFirestoreContext();
  const handleOnChange = (e) => {
    search(e.target.value);
    filter(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    filter(text);
  };
  return (
    <form className="d-flex" onSubmit={handleOnSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={handleOnChange}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
}

function Dropdown() {
  const { currentUser } = useAuthContext();

  const avatar = useMemo(() => {
    return !!currentUser ? (
      <img
        className="avatar"
        src={currentUser?.photoURL}
        alt={currentUser?.displayName}
        width="34"
        height="34"
      />
    ) : (
      "Login"
    );
  }, [currentUser]);

  const username = useMemo(() => {
    return currentUser?.displayName || "Profile";
  }, [currentUser]);
  return (
    <ul className="navbar-nav mb-2 mb-lg-0">
      {" "}
      {/* remove ms-auto */}
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {avatar}
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          {currentUser && (
            <li>
              <span className="dropdown-item text-center">
                <Link to="/profile">{username}</Link>
              </span>
              <span>
                <hr className="dropdown divider" />
              </span>
            </li>
          )}
          <div className="d-flex justify-content-center">
            <LogIn />
            <LogOut />
          </div>
        </ul>
      </li>
    </ul>
  );
}

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
      <div className="container-fluid">
        <a className="navbar-brand">⚡ Galleria</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Navigation />
          <SearchForm />
          <Dropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
