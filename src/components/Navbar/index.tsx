import { useState } from "react";
import {
  Container,
  Row,
  Col,
  DropdownButton,
  InputGroup,
  Dropdown,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

// Components
import Register from "../Register";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="text-white">
      <Row>
        {/* Logo */}
        <Col className="my-3">
          <h1 className="fw-bold h3">Egypt Railways</h1>
        </Col>

        {/* Nav Links */}
        <Col className="my-3 d-flex align-items-center">
          <Link to="trains" className="text-white text-decoration-none me-2">
            Trains
          </Link>
          <Link to="buses" className="text-white text-decoration-none me-2">
            Buses
          </Link>
        </Col>

        {/* Currencies and languages */}
        <Col className="my-3">
          <InputGroup>
            <DropdownButton
              variant="outline-light"
              title="$"
              id="input-group-dropdown-1"
              defaultValue="$"
            >
              <Dropdown.Item href="#">
                USD <span>$</span>
              </Dropdown.Item>
            </DropdownButton>
          </InputGroup>
        </Col>

        {/* User area */}
        <Col className="my-3">
          <Button
            style={{
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            <Link to="/dashboard" className="text-decoration-none text-white">
              Your bookings
            </Link>
          </Button>
          <Button
            style={{
              backgroundColor: "transparent",
              border: "none",
            }}
            onClick={handleShow}
          >
            Register
          </Button>
          <Register show={show} handleClose={handleClose} />
        </Col>
      </Row>
    </Container>
  );
};

export default Navbar;
