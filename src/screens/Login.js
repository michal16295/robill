import React, { useState, useContext } from "react";
import Form from "../components/Form";
import paths from "../constants/paths";
import { addEntry, signInWithGoogle } from "../firebase/index";
import { UserContext } from "../providers/UserProvider";
import { Modal } from "semantic-ui-react";
import { login } from "../firebase/index";
import Register from "./Register";

const Login = ({ open, setOpen, click }) => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  const user = useContext(UserContext);
  const [register, setRegister] = useState(false);

  if (user) window.location = paths.HOME;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ email: "", password: "" });
    login(formData.email, formData.password);
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
          </Modal>
        </>
      )}
    </>
  );
};
export default Login;
