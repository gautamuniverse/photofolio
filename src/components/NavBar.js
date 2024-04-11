import logo from "../images/logo.png";

function Navbar() {
  return (
      <nav className="navbar">
        <div className="brand-logo" onClick={() => window.location.replace('/')}>
          <img className="logo-img" src={logo} />
          <p className="brand-title" >PhotoFolio</p>
        </div>
      </nav>
  );
}


export default Navbar;