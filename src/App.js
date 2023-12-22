// App.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavbarComponent from "./components/NavbarComponent";
import "./App.css";
import Layout from "./components/Layout";

function App() {
  return (
    <Container fluid>
      <Row className="navbar-container">
        <Col>
          <NavbarComponent />
        </Col>
      </Row>
      <Row className="bottom-row">
        <Layout />
      </Row>
    </Container>
  );
}

export default App;
