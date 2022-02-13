import { Link } from "react-router-dom";
function Sidebar() {
  return (

    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <Link to="/" className="nav-link collapsed">
          <li className="nav-item">
            <i className="bi bi-grid"></i><span>Dashboard</span>
          </li>
        </Link>
        <li className="nav-item">
          <a className="nav-link collapsed" data-bs-toggle="collapse" data-bs-target="#post-nav">
            <i className="bi bi-menu-button-wide"></i><span>Posts</span><i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul id="post-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
            <li>
              <Link to="/post" className="nav-link collapsed">
                <i className="bi bi-circle"></i><span>Post List</span>
              </Link>
            </li>
            <li>
              <Link to="/addpost" className="nav-link collapsed">
                <i className="bi bi-circle"></i><span>Add Post</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </aside>

  );
}

export default Sidebar;
