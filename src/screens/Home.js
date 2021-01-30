import React, { useContext, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import paths from "../constants/paths";
import { UserContext } from "../providers/UserProvider";
import { addEntry, getNumberOfClicks } from "../firebase/index";
import { Loader } from "semantic-ui-react";
import Login from "./Login";

const Home = ({}) => {
  const user = useContext(UserContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [x, setX] = useState(1);
  const [y, setY] = useState(2);
  const [open, setOpen] = useState(false);
  const [clicks, setClicks] = useState("");

  const fetchMyAPI = useCallback(async () => {
    let response = await getNumberOfClicks();
    setClicks(response.numberOfClicks);
  }, []);

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
      history.push(`${paths.HOME}?x=${x}&y=${y}`);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchMyAPI();
  }, [fetchMyAPI]);

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
export default Home;
