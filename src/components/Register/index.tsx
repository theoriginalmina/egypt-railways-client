import React, { useState, useEffect } from "react";
import { Row, Col, Modal, Form, Button, Alert } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

interface registerProps {
  show: boolean;
  handleClose: () => void;
}

const Register: React.FC<registerProps> = ({ show, handleClose }) => {
  const ADD_USER = gql`
    mutation ($password: String!, $email: String!) {
      register(password: $password, email: $email) {
        errors {
          field
          message
        }
        registered
      }
    }
  `;

  let email: any;
  let password: any;
  const [addUser, { data, loading }] = useMutation(ADD_USER);

  // console.log(data);

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (data !== undefined) {
      let key = `${data.register.errors.field}`;
      let value = `${data.register.errors.message}`;
      setFormErrors({
        [key]: value,
      });
    }

    console.log("Use Effect");
  }, [data]);

  console.log(formErrors);

  return (
    <Modal show={show} size="lg" onHide={handleClose}>
      <Row>
        {/* Left Column */}
        <Col
          className="text-center p-4"
          lg={5}
          style={{ backgroundColor: "rgb(241, 242, 246)" }}
        >
          <img
            src="https://www.omio.com/gcs-proxy/omio-fc-assets/illustrations/account-benefits-phone.svg"
            alt="s"
            className="my-3"
          />
          <h3 className="fw-bold">Get the full Omio experience</h3>
          <p>
            Enjoy faster bookings and refunds as well as access to discounts
            with our referral program.
          </p>
        </Col>

        {/* Right Column */}
        <Col className="p-4">
          <Button
            onClick={handleClose}
            variant="light"
            style={{ position: "absolute", right: "5px", top: "5px" }}
          >
            X
          </Button>
          <div>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label=" Send me travel offers, trip reminders and other updates by
                  email."
              />
            </Form.Group>
          </div>

          {/* Form */}
          <Form
            className="p-3"
            onSubmit={(e: any) => {
              e.preventDefault();
              addUser({
                variables: { email: email.value, password: password.value },
              });
            }}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="main-label fw-bold">
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                size="lg"
                className="main-input"
                ref={(node: any) => {
                  email = node;
                }}
              />
            </Form.Group>
            {data && (
              <Alert variant="danger">{data.register.errors.message}</Alert>
            )}

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="main-label fw-bold">Password</Form.Label>
              <Form.Control
                type="password"
                className="main-input"
                ref={(node: any) => {
                  password = node;
                }}
              />
            </Form.Group>
            <Button
              type="submit"
              className="main-button w-100 mt-2 py-2 fw-bold"
            >
              Submit
            </Button>

            <Form.Text className="text-muted text-center d-block mt-4 w-75">
              By creating an account you agree to our Terms of Use and Privacy
              Policy
            </Form.Text>
          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default Register;
