import { Link, Navigate } from "react-router-dom"
import { isUserLoggedIn, getUserName, getUserEmail } from './Common'
import axios from 'axios'
import { Appconfig } from '../Appconfig'
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react"


function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    navigate('/login')
  }

  useEffect(() => {
    if (isUserLoggedIn() == null) {
      navigate('/login')
    }
  })

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <Link to="/" className="logo d-flex align-items-center">
          <img src="assets/img/logo.png" alt="" />
          <span className="d-none d-lg-block">React + WP</span>
        </Link>
      </div>
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">

          <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle " href="#">
              <i className="bi bi-search"></i>
            </a>
          </li>

          <li className="nav-item dropdown pe-3">
            {isUserLoggedIn() != '' && isUserLoggedIn() != null ? <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown"><span className="d-none d-md-block dropdown-toggle ps-2">Hello, {getUserName()}</span></a>
              : <span className="d-none d-md-block ps-2"><Link to="/login">Login</Link></span>}

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{isUserLoggedIn() != '' && isUserLoggedIn() != null ? getUserName().charAt(0).toUpperCase() + getUserName().slice(1) : null}</h6>

              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <Link to="/profile" className="dropdown-item d-flex align-items-center">
                  <i className="bi bi-person"></i>
                  <span>My Profile</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item d-flex align-items-center" href="#">
                  <i className="bi bi-box-arrow-right"></i>
                  <span onClick={handleLogout}>Sign Out</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>

  );
}

export default Header;
