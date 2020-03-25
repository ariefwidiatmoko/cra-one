import React, { Component } from "react";
import { Link } from "react-router-dom";

class Submenu extends Component {

  render() {
    const { submenu, pathname } = this.props;
    let url = submenu.alias;
    const regex = new RegExp(url);
    const isActive = regex.test(pathname);
    return (
      <li>
        <Link
          to={submenu.subUrl}
          className={
            isActive === true
              ? "is-active has-background-primary custom-text-overflow"
              : "custom-text-overflow"
          }
        >
          {submenu.submenuTitle}
        </Link>
      </li>
    );
  }
}

export default Submenu;
