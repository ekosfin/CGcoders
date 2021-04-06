import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container, Spinner } from "react-bootstrap";
import { useData } from "./contexts/DataContext";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

export default function Login() {
  const passwordRef = useRef();
  const { REACT_APP_CLIENT_ID, setTokenObj } = useData();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const successGoogleLogin = (response) => {
    setTokenObj(response.tokenObj);
    history.push("/home");
  };

  const failedGoogleLogin = (response) => {
    setError("Sisäänkirjautuminen epäonnistui. Yritä uudelleen.");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("Tämä kirjautumis tapa ei ole käytössä");
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

                <GoogleLogin
                  clientId={REACT_APP_CLIENT_ID}
                  render={(renderProps) => (
                    <Button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className="w-100"
                    >
                      Google sisäänkirjautuminen
                    </Button>
                  )}
                  buttonText="Login"
                  onSuccess={successGoogleLogin}
                  onFailure={failedGoogleLogin}
                  cookiePolicy={"single_host_origin"}
                />
              </Card.Body>
            </Card>
          </div>
        </Container>
      </div>
    </>
  );
}
