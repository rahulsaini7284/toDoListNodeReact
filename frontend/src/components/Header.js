import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <Navbar bg="dark">
      <Container>
        <LinkContainer to={"/"}>
          <Navbar.Brand>
            <span style={{ color: "white" }}>ToDo</span>
          </Navbar.Brand>
        </LinkContainer>
      </Container>
    </Navbar>
  );
};

export default Header;
