import { NavLink } from 'react-router-dom';
import './Navbar.css';

// These pages don't exist yet
const otherNavItems = ['Favourites', 'FAQ', 'Stats'];

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>

          {otherNavItems.map((item) => (
            <a
              key={item}
              href="#"
              className="nav-link"
              onClick={(event) => event.preventDefault()}
            >
              {item}
            </a>
          ))}
        </nav>

        <button className="logout-button">
          <span className="avatar">T</span>
          <span className="logout-text">Log Out</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;