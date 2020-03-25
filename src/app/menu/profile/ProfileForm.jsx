import React, { Component } from "react";
import { withRouter, Switch, Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
// import { withFirebase } from "react-redux-firebase";
import { updateProfile } from "./profileActions";
import ProfileTab from "./ProfileTab";
import ProfileBasic from "./ProfileBasic";
import ProfileAbout from "./ProfileAbout";
import ProfileAccount from "./ProfileAccount";
import ProfilePictures from "./Pictures/ProfilePictures";
import { updatePassword } from "./profileActions";

const actions = { updateProfile, updatePassword };

class ProfileForm extends Component {
  render() {
    const {
      pathname,
      profile,
      auth,
      updateProfile,
      updatePassword,
      loading
    } = this.props;
    return (
      <div className="box">
        <ProfileTab auth={auth} pathname={pathname} />
        <Switch>
          <Redirect
            exact
            from={`/profile/${auth.userId}`}
            to={`/profile/${auth.userId}/basic`}
          />
          <Route
            path={`/profile/${auth.userId}/basic`}
            render={() => (
              <ProfileBasic
                initialValues={profile}
                loading={loading}
                updateProfile={updateProfile}
              />
            )}
          />
          <Route
            path={`/profile/${auth.userId}/about`}
            render={() => (
              <ProfileAbout
                initialValues={profile}
                loading={loading}
                updateProfile={updateProfile}
              />
            )}
          />
          <Route
            path={`/profile/${auth.userId}/pictures`}
            render={() => (
              <ProfilePictures
                initialValues={profile}
                loading={loading}
                updateProfile={updateProfile}
              />
            )}
          />
          <Route
            path={`/profile/${auth.userId}/account`}
            render={() => (
              <ProfileAccount
                initialValues={profile}
                loading={loading}
                profile={profile}
                updatePassword={updatePassword}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(null, actions)(ProfileForm));
