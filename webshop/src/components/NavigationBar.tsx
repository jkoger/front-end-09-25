import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import { CartSumContext } from "../context/CartSumContext";
import { AuthContext } from "../context/AuthContext";
// import { useSelector } from 'react-redux';
import { useAppSelector } from "../store/store";
import { useTranslation } from "react-i18next";

import english from "../assets/english.png";
import estonian from "../assets/estonian.png";

function NavigationBar() {
  const { cartSum } = useContext(CartSumContext);
  const { loggedIn, logout } = useContext(AuthContext);
  const count = useAppSelector((state) => state.counter.value);
  const { t, i18n } = useTranslation();

  function updateLanguage(newLanguage: string) {
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Test Webstore
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/ostukorv">
              {t("nav.cart")}
            </Nav.Link>
            <Nav.Link as={Link} to="/kalkulaator">
              {t("nav.calculator")}
            </Nav.Link>
            <Nav.Link as={Link} to="/seaded">
              {t("nav.settings")}
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              {t("nav.contact")}
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/admin">
              Admin
            </Nav.Link>
            <Nav.Link as={Link} to="/kinkekaart">
              Giftcards
            </Nav.Link>
            <Nav.Link as={Link} to="/poed">
              Shops
            </Nav.Link>
            <Nav.Link as={Link} to="/map">
              Map
            </Nav.Link>
            <span>
              {" "}
              {cartSum >= 0 ? cartSum.toFixed(2) : 0} eur / {count} pcs
            </span>

            {loggedIn ? (
              <>
                <button onClick={() => logout()}> Logout </button>
                <Nav.Link as={Link} to="/profile">
                  {" "}
                  Profile{" "}
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            <img
              className="lang"
              src={english}
              onClick={() => updateLanguage("en")}
              alt=""
            />
            <img
              className="lang"
              src={estonian}
              onClick={() => updateLanguage("et")}
              alt=""
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
