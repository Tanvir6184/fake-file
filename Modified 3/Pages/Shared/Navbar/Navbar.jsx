import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../Context/Auth Context/AuthContext";
import useAdmin from "../../../Hooks/useAdmin";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  console.log(user);
  const handleLogout = () => {
    logout()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [isAdmin] = useAdmin();
  console.log(isAdmin);

  const navOptions = (
    <>
      <li>
        <Link>
          <button>Home</button>
        </Link>
      </li>
      <li>
        <Link to="/add-articles">
          <button>Add Articles</button>
        </Link>
      </li>
      <li>
        <Link to="/approved-articles">
          <button>All Articles</button>
        </Link>
      </li>
      <li>
        <Link to="/subscription">
          <button>Subscriptions</button>
        </Link>
      </li>

      {isAdmin && (
        <li>
          <Link to="dashboard">
            <button>Dashboard</button>
          </Link>
        </li>
      )}
      <li>
        <Link to="my-articles">
          <button>My Articles</button>
        </Link>
      </li>
      <li>
        <Link>
          <button>Premium Articles</button>
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navOptions}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      {user ? (
        <>
          <div className="navbar-end">
            <div className="mr-3">
              <Link>
                <button
                  onClick={handleLogout}
                  className="btn rounded-full bg-red-400"
                >
                  Logout
                </button>
              </Link>
            </div>
            <div className="">
              <Link to="/my-profile">
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="rounded-full h-16 w-16"
                />
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="navbar-end">
            <div className="">
              <Link to="/login">
                <a className="btn">Login</a>
              </Link>
            </div>
            <div className="">
              <Link to="/register">
                <a className="btn">Sign Up</a>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
