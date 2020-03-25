import React, { Component, Fragment } from "react";
import Submenu from "./Submenu";
import { Link } from "react-router-dom";

class Menu extends Component {
  state = {
    openDropdown: false
  };

  handleToggleSubmenu = () => () => {
    this.setState({
      openDropdown: !this.state.openDropdown
    });
  };

  render() {
    const { pathname, menu } = this.props;
    const { openDropdown } = this.state;
    let url = menu.alias;
    const regex = new RegExp(url);
    const isActive = regex.test(pathname);
    return (
      <Fragment>
        <li>
          {menu.submenu.length === 0 &&
          <Link
            to={menu.url}
            className={pathname === menu.url ? "is-active has-background-primary is-size-6 custom-text-overflow" : "is-size-6 custom-text-overflow"}
          >
            <i className={`fas fa-${menu.icon} icon`} /> {menu.title}
          </Link>}
          {menu.submenu.length > 0 &&
          <div
            onClick={this.handleToggleSubmenu('')}
            className={isActive === true ? "has-background-white-ter has-text-primary is-size-6 custom-text-overflow" : "is-size-6 custom-text-overflow"}
          >
            <i className={`fas fa-${menu.icon} icon`} /> {menu.title}
          </div>}
          <ul className={openDropdown === true || isActive === true ? "" : "is-hidden"}>
            {menu.submenu.map(item => (
                <Submenu
                  key={item.id}
                  submenu={item}
                  pathname={pathname}
                />
              ))}
          </ul>
        </li>
      </Fragment>
    );
  }
}

export default Menu;
