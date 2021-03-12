import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container, Spinner } from "react-bootstrap";
import { useData } from "./contexts/DataContext";
import { useHistory } from "react-router-dom";

export default function Login() {
  const passwordRef = useRef();
  const { login } = useData();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      let success = await login(passwordRef.current.value);
      setLoading(false);
      if (success) {
        history.push("/home");
      } else {
        setError("Väärä salasana");
      }
    } catch (error) {
      console.error(error);
      setError("Väärä salasana");
      setLoading(false);
    }
  }

  return (
    <>
      <div className="w-100">
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Remeo login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="password">
                    <Form.Label>Päivän salasana</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                  </Form.Group>
                  {loading && (
                    <Spinner animation="border" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  )}
                  <Button disabled={loading} className="w-100" type="submit">
                    Kirjaudu sisään
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
    </>
  );
}
