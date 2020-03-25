import React, { useState, Fragment } from "react";
import profileDefault from "../../../../images/user-default.png";

const PictureGalleries = ({
  photos,
  profile,
  deletePhoto,
  setMainPhoto,
  loading
}) => {
  const [buttonId, setButtonId] = useState("");
  let filteredPhotos;
  if (photos) {
    filteredPhotos = photos.filter(photo => {
      return photo.url !== profile.photoURL;
    });
  }
  return (
    <Fragment>
      <div className="box is-12">
        <p className="title is-5">Galleries</p>
        <div className="columns">
          <div className="column is-one-quarter-desktop is-half-tablet">
            <div className="card">
              <div className="card-image">
                <figure className="image is-1by1">
                  <img alt="" src={
                    // profile.photoURL || 
                    profileDefault} />
                </figure>
              </div>
              <footer className="card-footer" style={{ marginTop: -27 }}>
                <button className="button is-small is-primary is-fullwidth">
                  Main
                </button>
              </footer>
            </div>
          </div>
        </div>
        <div className="columns is-multiline">
          {photos &&
            filteredPhotos.map(photo => (
              <div
                className="column is-one-quarter-desktop is-half-tablet"
                key={photo.id}
              >
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-1by1">
                      <img alt="" src={photo.url} />
                    </figure>
                  </div>
                  <footer className="card-footer" style={{ marginTop: -27 }}>
                    <button
                      disabled={
                        loading && photo.id && buttonId !== photo.id + "set" ? true : false
                      }
                      onClick={() => {
                        setMainPhoto(photo);
                        setButtonId(photo.id + "set");
                      }}
                      className={
                        buttonId === photo.id + "set"
                          ? "button is-small is-primary is-fullwidth is-loading"
                          : "button is-small is-primary is-fullwidth"
                      }
                    >
                      <i className="fas fa-check" />
                    </button>
                    <button
                      disabled={
                        loading && photo.id && buttonId !== photo.id + "del" ? true : false
                      }
                      onClick={() => {
                        deletePhoto(photo);
                        setButtonId(photo.id + "del");
                      }}
                      className={
                        buttonId === photo.id + "del"
                          ? "button is-small is-danger is-fullwidth is-loading"
                          : "button is-small is-danger is-fullwidth"
                      }
                    >
                      <i className="fas fa-trash" />
                    </button>
                  </footer>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default PictureGalleries;
