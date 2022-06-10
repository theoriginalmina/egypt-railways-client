import React from "react";
import { Row, Col, Modal, Form, Button } from "react-bootstrap";
import { useRegisterMutation } from "../../generated/schema";

interface registerProps {
  show: boolean;
  handleClose: () => void;
}

const Register: React.FC<registerProps> = ({ show, handleClose }) => {
  let email: any;
  let password: any;

  const [registerMutation, { data, loading, error }] = useRegisterMutation({
    variables: {
      email,
      password,
    },
  });

  console.log(loading);

  console.log("Data", data);

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
            onSubmit={async (e: any) => {
              e.preventDefault();
              await registerMutation({
                variables: {
                  email: email.value,
                  password: password.value,
                },
              });
            }}
          >
            {/* Email */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="main-label fw-bold">
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                size="lg"
                className="main-input"
                ref={(value: HTMLInputElement) => {
                  email = value;
                }}
              />
            </Form.Group>
            {/* Password */}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="main-label fw-bold">Password</Form.Label>
              <Form.Control
                type="password"
                className="main-input"
                ref={(value: HTMLInputElement) => {
                  password = value;
                }}
              />
            </Form.Group>
            {/* Test */}
            <Button
              type="submit"
              className="main-button w-100 mt-2 py-2 fw-bold"
              disabled={loading}
            >
              Submit
            </Button>
            {error && (
              <div>Server is down right now, try again in few moments</div>
            )}

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
