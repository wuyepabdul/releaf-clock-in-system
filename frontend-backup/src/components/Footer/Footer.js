import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col data-test="Copyright © Dulstech" className="text-center py-3">
            Copyright &copy; Dulstech
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
