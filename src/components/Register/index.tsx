import React, { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Modal, Form, Button, Alert } from "react-bootstrap";
import { useRegisterMutation } from "../../generated/schema";

interface registerProps {
  show: boolean;
  handleClose: () => void;
}

const Register: React.FC<registerProps> = ({ show, handleClose }) => {
  let email: HTMLInputElement;
  let password: HTMLInputElement;

  const [registerMutation, { data, loading, error }] = useRegisterMutation();

  let navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      let result = await registerMutation({
        variables: {
          email: email.value,
          password: password.value,
        },
      });
      if (result.data?.register.registered === true) {
        return navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
    }
  };

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
          <div className="p-2">
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label=" Send me travel offers, trip reminders and other updates by
                  email."
              />
            </Form.Group>
          </div>

          {/* Form */}
          <Form className="p-3" onSubmit={handleSubmit}>
            {/* Email */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-bold">Email address</Form.Label>
              <Form.Control
                type="text"
                size="lg"
                ref={(value: HTMLInputElement) => {
                  email = value;
                }}
              />
              {/* Errors */}
              {data && data.register.errors?.field === "email" ? (
                <Alert variant="danger" className="p-2 mt-1 text-center">
                  {data.register.errors.message}
                </Alert>
              ) : null}
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control
                type="password"
                size="lg"
                ref={(value: HTMLInputElement) => {
                  password = value;
                }}
              />
              {/* Errors */}
              {data && data.register.errors?.field === "password" ? (
                <Alert variant="danger" className="p-2 mt-1 text-center">
                  {data.register.errors.message}
                </Alert>
              ) : null}
            </Form.Group>
            {/* Test */}
            <Button
              type="submit"
              className="w-100 mt-2 py-2 fw-bold"
              disabled={loading}
            >
              Register
            </Button>

            {/* Main Error */}
            {error && (
              <Alert variant="danger" className="mt-1">
                Server is down right now, try again in few moments
              </Alert>
            )}

            <Form.Text className="text-muted text-center d-block mt-4 w-75 mx-auto">
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
