import logo from "./logo.svg";
import "./App.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {
  createBrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Users from "./Users";
import firebase from "./firebase";
import { getMessaging, getToken } from "firebase/messaging";
import { useEffect, useState } from "react";
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

export default function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const msg = getMessaging(firebase);
    getToken(msg, {
      vapidKey:
        "BBPheBQi6w9GQnn1oX9D7BwW720Sn1YPx4yxFGiSJe-tg9G7C7ijhQm6davHQ9rCHPnb0YtAnfaI56GM-_pok6Y",
    })
      .then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
          console.log(currentToken);
          setToken(currentToken);
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one."
          );
          // ...
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // ...
      });
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home token={token} />} />
          <Route path="about" element={<About />} />
          <Route path="users" element={<Users />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link style={{ margin: "4px", textDecoration: "none" }} to="/">
              {" "}
              Home
            </Link>
            <Link style={{ margin: "4px", textDecoration: "none" }} to="/about">
              About
            </Link>
            <Link style={{ margin: "4px", textDecoration: "none" }} to="/users">
              Users
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
