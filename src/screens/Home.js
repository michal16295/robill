import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { addEntry } from "../firebase/index";
import { getReferral } from "../services/referral.service";
import { useClicks } from "../hooks/useClicks";
import Login from "./Login";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [fromUrl, setFromUrl] = useState(null);
  const user = useContext(UserContext);
  const [clicks, setClicks] = useClicks();

  useEffect(() => {
    if (user === undefined) setOpen(true);
    else if (user) {
      const url = getReturningUrl();
      console.log(url);
      if (url !== "") {
        (async () => {
          await addEntry(user.email, url);
          window.location.href = url;
        })();
      }
    }
  }, [user]);

  const getReturningUrl = () => {
    const url = new URL(window.location);
    const params = new URLSearchParams(url.search);
    let from =
      params.getAll("from")[0] ||
      document.referrer.split("?from=")[1] ||
      document.referrer;
    from = getReferral(from, user.email);
    setFromUrl(from);
    return from;
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
      <>
        {open ? (
          <Login open={open} setOpen={setOpen} click={true} />
        ) : (
          <>
            <h2>WELCOME</h2>
            {fromUrl === "" && (
              <strong style={{ color: "red" }}>Missing Referral</strong>
            )}
            <div>Number of Entries: {clicks}</div>
            {!user && (
              <button
                className="ui red basic button"
                onClick={() => setOpen(true)}
              >
                Please sign in
              </button>
            )}
          </>
        )}
      </>
    </div>
  );
};
export default Home;
