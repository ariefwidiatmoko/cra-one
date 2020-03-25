import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ProfileFormSidebar extends Component {
  render() {
    const { auth, pathname } = this.props;
    return (
      <div className="tabs">
        <ul>
          <li className={pathname === `/profile/${auth.userId}/basic` ? "is-active" : ""}>
            <Link to={`/profile/${auth.userId}/basic`}>
              <span className="icon is-small">
                <i className="fas fa-id-card-alt" aria-hidden="true"></i>
              </span>
              Basic
            </Link>
          </li>
          <li className={pathname === `/profile/${auth.userId}/about` ? "is-active" : ""}>
            <Link to={`/profile/${auth.userId}/about`}>
              <span className="icon is-small">
                <i className="fas fa-tasks" aria-hidden="true"></i>
              </span>
              About
            </Link>
          </li>
          <li className={pathname === `/profile/${auth.userId}/pictures` ? "is-active" : ""}>
            <Link to={`/profile/${auth.userId}/pictures`}>
              <span className="icon is-small">
                <i className="fas fa-image" aria-hidden="true"></i>
              </span>
              Pictures
            </Link>
          </li>
          <li className={pathname === `/profile/${auth.userId}/account` ? "is-active" : ""}>
            <Link to={`/profile/${auth.userId}/account`}>
              <span className="icon is-small">
                <i className="fas fa-user-edit" aria-hidden="true"></i>
              </span>
              Account
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
