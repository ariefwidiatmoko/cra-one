import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { formatDistance, parseISO } from "date-fns";
import profileDefault from "../../../images/user-default.png";
import background from "../../../images/default-background.jpg";
import ProfileForm from "./ProfileForm";
import { fetchProfile } from "../../api/profileApi";
import Tooltip from 'react-tooltip-lite';
import { Redirect } from "react-router-dom";

const mapState = state => ({
  profile: state.profile,
  auth: state.auth,
  loading: state.async.loading
});
const actions = {
  fetchProfile
};

class Profile extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidMount() {
    const userId = this.props.auth.userId;
    const token = this.props.auth.token;
    this.props.fetchProfile(userId, token);
  }

  render() {
    const { location, profile, auth, loading } = this.props;
    if (auth.isAuth === false) return <Redirect to="/" />;
    return (
      <div className="column is-10-desktop is-offset-2-desktop is-9-tablet is-offset-3-tablet is-12-mobile">
        <div className="p-1">
          <div className="columns is-variable">
            <div className="column">
              <div className="box">
                <nav className="breadcrumb" aria-label="breadcrumbs">
                  <ul>
                    <li>
                      <Link to={`/profile/${auth.userId}/basic`}>Profile</Link>
                    </li>
                    <li className="is-active">
                      <Link
                        to={`/profile/${auth.userId}/basic`}
                        aria-current="page"
                      >
                        Detail
                      </Link>
                    </li>
                  </ul>
                </nav>
                <div className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <div className="field has-addons">
                        <p className="control">
                          <input
                            className="input is-small is-rounded"
                            type="text"
                            placeholder="Search user"
                          />
                        </p>
                        <p className="control">
                          <button className="button is-small is-link is-rounded is-outlined">
                            <i className="fas fa-search" />
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-3-desktop is-12-mobile">
                    <div className="card" style={{ borderRadius: 7 }}>
                      <div className="card-image">
                        <figure className="image is-4by3">
                          <img
                            src={background}
                            alt=""
                            style={{
                              borderTopLeftRadius: 7,
                              borderTopRightRadius: 7
                            }}
                          />
                        </figure>
                        <div className="image custom-profile is-128x128">
                          <img
                            className="is-rounded"
                            src={
                              profile.imageURL
                                ? profile.imageURL
                                : profileDefault
                            }
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="card-content">
                        <div className="media">
                          <div className="media-content has-text-centered">
                            <p className="title is-5">{auth.name}</p>
                            <p className="subtitle is-6">{auth.email}</p>
                            <p className="subtitle is-6">{profile.profileType}</p>
                          </div>
                        </div>

                        <div className="content has-text-centered is-italic">
                          {profile.profileType ? profile.profileType : ""}
                        </div>
                        <br />
                        <div className="has-text-centered">
                          {profile.createdAt && (
                            <Tooltip content="Created at">
                              <i className="fas fa-user-clock icon" />
                            </Tooltip>
                          )}{" "}
                          {profile.createdAt &&
                            formatDistance(
                              Date.now(),
                              parseISO(profile.createdAt)
                            ) + " ago"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <ProfileForm
                      auth={auth}
                      profile={profile}
                      loading={loading}
                      pathname={location.pathname}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapState, actions)(Profile);
