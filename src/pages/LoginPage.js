import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./login.css";

const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);
  return (
    <div>
      <Container>
        <div className="login-content">
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h1>Login</h1>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12} md={8} lg={6}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  className="username"
                />
                <br />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  className="password"
                  name="password"
                  placeholder="Enter password"
                />
                <br/>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Button variant="primary" type="submit" onClick={loginUser}>
              Submit
            </Button>
          </Col>
        </Row>
        </div>
        
      </Container>

      {/* <form onSubmit={loginUser}>
        <div className="container">
          <div className="header">
            <div classname="text">Login</div>
            <div className="underline"></div>
          </div>
        </div>
        <input
          type="text"
          className="username"
          name="username"
          placeholder="Enter Username"
        />
        <br></br>
        <input
          type="password"
          className="password"
          name="password"
          placeholder="Enter password"
        />
        <br></br>
        <button type="submit" className="submit">
          Login
        </button>
      </form> */}
    </div>
  );
};

export default LoginPage;
