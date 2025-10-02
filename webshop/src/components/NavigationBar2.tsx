import { Link } from "react-router-dom";

function NavigationBar2() {
  return (
    <div>
      <Link to="/">
        <img
          className="logo"
          src="https://global.discourse-cdn.com/twitter/original/3X/d/c/dc02e4fff450a6306e045f5c26801ce31c3efaeb.jpeg"
          alt="Logo"
        />
      </Link>

      <Link to="/ostukorv">
        <button>Ostukorvi</button>
      </Link>

      <Link to="/lisa-toode">
        <button>Lisa toode</button>
      </Link>

      <Link to="/seaded">
        <button>Seaded</button>
      </Link>

      <Link to="/kinkekaart">
        <button>Kinkekaardid</button>
      </Link>

      <Link to="/poed">
        <button>Poed</button>
      </Link>

      <Link to="/kalkulaator">
        <button>Kalkulaator</button>
      </Link>

      <Link to="/supplier">
        <button>Tarnija1</button>
      </Link>

      <Link to="/supplier2">
        <button>Tarnija2</button>
      </Link>

      <Link to="/supplier3">
        <button>Tarnija3</button>
      </Link>
    </div>
  );
}

export default NavigationBar2;
