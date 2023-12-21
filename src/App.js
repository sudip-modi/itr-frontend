// App.js
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavbarComponent from "./components/NavbarComponent";
import SidebarComponent from "./components/SidebarComponent";
import ChartComponent from "./components/ChartComponent";
import "./App.css";
import Layout from "./components/Layout";

function App() {
  const [analyzedData, setAnalyzedData] = useState(null);

  const handleAnalysisData = (data) => {
    setAnalyzedData(data);
    console.log(data);
  };

  

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
