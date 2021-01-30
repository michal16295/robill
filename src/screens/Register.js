import React, { useState } from "react";
import Form from "../components/Form";
import { auth } from "../firebase";
import { Message, Modal } from "semantic-ui-react";
import { signInWithGoogle } from "../firebase/index";

const Register = ({ open, setOpen }) => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        formData.email,
        formData.password
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSubmit = (e) => {
    signInWithGoogle();
  };
  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ width: "50%" }}
      >
        <Form
          heading="Register"
          onChange={handleChange}
          onSubmit={handleSubmit}
          onGoogleSubmit={handleGoogleSubmit}
          formData={formData}
          error={error}
        />
      </Modal>
    </div>
  );
};
export default Register;
