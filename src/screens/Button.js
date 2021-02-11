import React, { useContext, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import paths from "../constants/paths";
import { UserContext } from "../providers/UserProvider";
import { addEntry } from "../firebase/index";
import { useClicks } from "../hooks/useClicks";
import { Loader } from "semantic-ui-react";
import Login from "./Login";

const Button = ({}) => {
  const user = useContext(UserContext);
  const history = useHistory();
  const [clicks, setClicks] = useClicks();
  const [loading, setLoading] = useState(false);
  const [x, setX] = useState(1);
  const [y, setY] = useState(2);
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    setX(x + 1);
    setY(y + 1);
    if (!user) {
      setLoading(false);
      setOpen(true);
    } else {
      addEntry(user.email, x, y);
      setClicks(clicks + 1);
      history.push(`${paths.BUTTON}?x=${x}&y=${y}`);
    }
    setLoading(false);
  };

  return (
    <div
      className="ui segment"
      style={{
        width: "40%",
        margin: "auto",
        textAlign: "center",
        top: "200px",
      }}
    >
      {loading ? (
        <Loader active inline="centered" />
      ) : (
        <>
          {open ? (
            <Login open={open} setOpen={setOpen} click={true} />
          ) : (
            <>
              <h4>Number of clicks: {clicks}</h4>
              <button onClick={handleClick} className="fluid ui button">
                Click me!
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Button;
