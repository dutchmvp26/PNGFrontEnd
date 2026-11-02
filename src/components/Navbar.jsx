import './Navbar.css';

const navItems = ['Home', 'Favourites', 'FAQ', 'Stats'];

function Navbar({ onHomeClick }) {
  function handleClick(event, item) {
    event.preventDefault();

    if (item === 'Home') {
      onHomeClick();
    }
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <nav className="nav-links">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className={`nav-link ${item === 'Home' ? 'active' : ''}`}
              onClick={(event) => handleClick(event, item)}
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
