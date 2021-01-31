import React, { useState, useContext } from "react";
import Form from "../components/Form";
import paths from "../constants/paths";
import { signInWithGoogle } from "../firebase/index";
import { UserContext } from "../providers/UserProvider";
import { Modal, Message } from "semantic-ui-react";
import { login } from "../firebase/index";
import Register from "./Register";

const Login = ({ open, setOpen, click }) => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  const user = useContext(UserContext);
  const [register, setRegister] = useState(false);
  const [error, setError] = useState("");

  if (user) window.location = paths.HOME;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    if (formData.email === "" || formData.password === "") {
      setError("All fields are required!");
      return;
    }
    e.preventDefault();
    const res = await login(formData.email, formData.password);
    setFormData({ email: "", password: "" });
    setError(res);
  };

  const handleGoogleSubmit = (e) => {
    signInWithGoogle();
  };
  return (
    <>
      {register ? (
        <Register open={register} setOpen={setRegister} />
      ) : (
        <>
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            style={{ width: "50%" }}
          >
            <Form
              heading="Login"
              onChange={handleChange}
              onSubmit={handleSubmit}
              onGoogleSubmit={handleGoogleSubmit}
              formData={formData}
            />
            <p style={{ textAlign: "center", paddingBottom: "10px" }}>
              New user?{" "}
              <a
                style={{ cursor: "pointer" }}
                onClick={() => setRegister(true)}
              >
                Sign up
              </a>
            </p>
            {error !== "" && (
              <Message negative>
                <Message.Header>{error}</Message.Header>
              </Message>
            )}
          </Modal>
        </>
      )}
    </>
  );
};
export default Login;
