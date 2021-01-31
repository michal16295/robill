import React from "react";

const Form = ({
  heading,
  onChange,
  onSubmit,
  onGoogleSubmit,
  formData,
  error,
}) => {
  return (
    <div className="ui segment">
      <div className="ui form">
        <h2 style={{ textAlign: "center" }}>{heading}</h2>
        <hr />
        <div className="field" style={{ paddingTop: "10px" }}>
          <label>Email</label>
          <input
            onChange={onChange}
            type="email"
            name="email"
            placeholder="ex: aaa@gmail.com"
            value={formData.email}
          />
        </div>
        <div className="field" style={{ paddingTop: "10px" }}>
          <label>Password</label>
          <input
            onChange={onChange}
            type="password"
            name="password"
            placeholder="*******"
            value={formData.password}
          />
        </div>
        <div style={{ paddingTop: "5px" }}>
          <button onClick={onSubmit} className="fluid ui button" type="submit">
            Submit
          </button>
          <br />
          <button
            onClick={onGoogleSubmit}
            className="fluid ui google plus button"
          >
            <i className="google plus icon"></i>
            {heading} with Google
          </button>
        </div>
      </div>
    </div>
  );
};
export default Form;
