import React, { Component, Fragment } from "react";
import Menu from "./menu/Menu";
import UserProfile from "../../../images/user-default.png";

class SideMenu extends Component {
  state = {
    selected: ""
  };

  handleSelected = menu => {
    this.setState({
      selected: menu
    });
  };

  render() {
    const { selected } = this.state;
    const { toggler, pathname, auth, logout, loading, elementName, history } = this.props;
    const regex = new RegExp(`profile/${auth.userId}`);
    const isActive = regex.test(pathname);
    return (
      <Fragment>
        <div
          className={
            toggler === true
              ? "menu-container active px-1 has-background-white"
              : "menu-container px-1 has-background-white"
          }
        >
          <div className="menu-wrapper py-1">
            <aside className="menu">
              <ul className="menu-list profile-sidebar">
                <div className="media profile">
                  <div className="media-left">
                    <figure className="image is-48x48">
                      <img
                        className="is-rounded"
                        alt="profile-pic"
                        src={
                          // profile.photoURL ? profile.photoURL :
                          UserProfile
                        }
                      />
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-6 is-capitalized">{auth.name}</p>
                    <p
                      className="subtitle is-7 custom-text-overflow"
                      style={{ paddingBottom: 8 }}
                    >
                      {auth.email}
                    </p>
                  </div>
                </div>
                <div className="profile-icon">
                  {/* <span
                    onClick={() => history.push(`/profile/${auth.userId}`)}
                    className={
                      isActive === true ? "has-text-primary" : "shortcut-grey"
                    }
                  >
                    <i className="fas fa-user-edit icon" />
                  </span>
                  <span className="shortcut-grey">
                    <i className="fas fa-bell icon" />
                  </span>
                  <span disabled={loading} onClick={() => logout(auth.userId)} className="shortcut-red">
                    <i className={loading === true ? "fas fa-ellipsis-h icon" : "fas fa-power-off icon"} />
                  </span> */}
                  <div className="field has-addons">
                    <p className="control">
                      <button onClick={() => history.push(`/profile/${auth.userId}`)} disabled={loading === true && elementName === "logoutSide"} className={isActive === true ? "button has-text-primary" : "button"}>
                        <span className="icon shortcut-grey">
                          <i className="fas fa-user-edit icon"></i>
                        </span>
                      </button>
                    </p>
                    <p className="control">
                      <button disabled={loading === true && elementName === "logoutSide"} className="button">
                        <span className="icon shortcut-grey">
                          <i className="fas fa-bell icon"></i>
                        </span>
                      </button>
                    </p>
                    <p className="control">
                      <button disabled={loading === true && elementName === "logoutSide"} onClick={() => logout(auth.userId, "logoutSide")} className="button">
                        <span className="icon shortcut-red">
                          <i className={loading === true && elementName === "logoutSide" ? "fas fa-circle-notch fa-spin icon" : "fas fa-power-off icon"}></i>
                        </span>
                      </button>
                    </p>
                  </div>
                </div>
              </ul>
              <ul className="menu-list">
                {menus.map(item => (
                  <Menu
                    handleSelected={this.handleSelected}
                    pathname={pathname}
                    selected={selected}
                    key={item.id}
                    menu={item}
                  />
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SideMenu;

const menus = [
  {
    id: "dashboard",
    icon: "th-large",
    title: "Dashboard",
    alias: "dashboard",
    submenu: [],
    url: "/dashboard"
  },
  // {
  //   id: "profile",
  //   icon: "user-cog",
  //   title: "Profile",
  //   alias: "profile",
  //   submenu: [],
  //   url: "/profile"
  // },
  {
    id: "contents",
    icon: "pen-square",
    title: "Contents",
    alias: "contents",
    submenu: [
      {
        id: "a",
        menu: "content",
        submenuTitle: "Posts",
        alias: "contents/posts",
        subUrl: "/contents/posts"
      },
      {
        id: "b",
        menu: "content-management",
        submenuTitle: "Authors",
        alias: "contents/authors",
        subUrl: "/contents/authors"
      },
      {
        id: "c",
        menu: "content-management",
        submenuTitle: "Configuration",
        alias: "contents/configuration",
        subUrl: "/contents/configuration"
      }
    ],
    url: "/contents"
  },
  {
    id: "users-management",
    icon: "users-cog",
    title: "Users Management",
    alias: "users-management",
    submenu: [
      {
        id: "a",
        menu: "users-management",
        submenuTitle: "Users",
        alias: "users-management/users",
        subUrl: "/users-management/users"
      },
      {
        id: "b",
        menu: "users-management",
        submenuTitle: "Activation",
        alias: "users-management/activation",
        subUrl: "/users-management/activation"
      },
      {
        id: "c",
        menu: "users-management",
        submenuTitle: "Authority",
        alias: "users-management/authority",
        subUrl: "/users-management/authority"
      }
    ],
    url: "/users-management"
  },
  {
    id: "settings",
    icon: "cog",
    title: "Settings",
    alias: "settings",
    submenu: [
      {
        id: "a",
        menu: "settings",
        submenuTitle: "School Profile",
        alias: "settings/school-profile/detail",
        subUrl: "/settings/school-profile/detail"
      },
      {
        id: "b",
        menu: "settings",
        submenuTitle: "Change Password",
        alias: "settings/change-password",
        subUrl: "/settings/change-password"
      }
    ],
    url: "/settings"
  },
  {
    id: 6,
    icon: "flask",
    title: "Test Area",
    alias: "testarea",
    submenu: [],
    url: "/testarea"
  }
];
