import React, { useState, useContext, useEffect } from "react";
import paths from "../constants/paths";
import { Menu } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";

const NavBar = ({}) => {
  const [activeItem, setActiveItem] = useState({ active: paths.HOME });
  const history = useHistory();
  const user = useContext(UserContext);
  const currentPath = history.location.pathname;

  useEffect(() => {
    setActiveItem({ active: currentPath });
  }, [currentPath]);

  const handleItemClick = (e, { name }) => {
    setActiveItem({ active: currentPath });
    if (name === "home") history.push("/");
    else history.push(name);
  };

  const handleLogout = async () => {
    await auth.signOut();
  };
  const LoggedIn = (
    <>
      {user && <h4 className="item">Hello {user.email}!</h4>}
      <Menu.Menu position="right">
        <Menu.Item
          name="logout"
          active={activeItem.active === "logout"}
          onClick={handleLogout}
        />
      </Menu.Menu>
    </>
  );
  return (
    <Menu color="red" pointing secondary>
      <Menu.Item
        name={"home"}
        active={activeItem.active === paths.HOME}
        onClick={handleItemClick}
      />
      <Menu.Item
        name={"button"}
        active={activeItem.active === paths.BUTTON}
        onClick={handleItemClick}
      />
      {user && LoggedIn}
    </Menu>
  );
};
export default NavBar;
