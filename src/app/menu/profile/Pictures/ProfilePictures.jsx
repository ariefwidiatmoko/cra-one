import React, { useState, useEffect, Fragment } from "react";
import DropzoneInput from "./DropzoneInput";
import CropperInput from "./CropperInput";
import { connect } from "react-redux";
import { compose } from "redux";
// import { firestoreConnect } from "react-redux-firebase";
import {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto
} from "../profileActions";
import { toastr } from "react-redux-toastr";
import PictureGalleries from "./PictureGalleries";

const mapState = state => ({
  // auth: state.firebase.auth,
  // profile: state.firebase.profile,
  // photos: state.firestore.ordered.photos,
  loading: state.async.loading
});

const actions = {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto
};

// const authSession = JSON.parse(sessionStorage.getItem("authSession"));

// const query = ({ auth }) => {
//   return [
//     {
//       collection: "users",
//       doc: auth.uid || authSession.uid,
//       subcollections: [{ collection: "photos" }],
//       storeAs: "photos"
//     }
//   ];
// };

const ProfilePictures = ({
  uploadProfileImage,
  // photos,
  // profile,
  deletePhoto,
  setMainPhoto,
  loading
}) => {
  const [files, setFiles] = useState([]);
  const [cropResult, setCropResult] = useState("");
  const [addPic, setAddPic] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files, cropResult]);

  const handleUploadImage = async () => {
    try {
      await uploadProfileImage(image, files[0].name);
      handleCancelCrop();
      toastr.success("Success", "Photo has been uploaded");
    } catch (error) {
      console.log(error);
      toastr.error("Oops", "Something went wrong");
    }
  };

  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
    setCropResult("");
  };

  const handleDeletePhoto = async photo => {
    try {
      await deletePhoto(photo);
    } catch (error) {
      toastr.error("Oops", error.message);
    }
  };

  const handleSetMainPhoto = async photo => {
    try {
      await setMainPhoto(photo);
    } catch (error) {
      toastr.error("Oops", error.message);
    }
  };

  const handleAddPic = () => {
    setAddPic(!addPic);
  };

  return (
    <Fragment>
      {/* {photos && Object.keys(photos).length < 5 && ( */}
        <div>
          <div className="columns">
            <div className="column">
              <button
                onClick={handleAddPic}
                className={
                  addPic
                    ? "button custom-grey is-small is-rounded is-outlined"
                    : "button is-small is-link is-rounded is-outlined"
                }
              >
                {addPic ? "Cancel" : "Add Pictures"}
              </button>
            </div>
          </div>
          <div
            className={addPic ? "" : "is-hidden"}
            style={{ marginBottom: 15 }}
          >
            <div className="columns">
              <div className="column is-half is-offset-one-quarter has-text-centered">
                {files.length === 0 && (
                  <Fragment>
                    Add & Upload
                    <DropzoneInput setFiles={setFiles} />
                  </Fragment>
                )}
                {files.length > 0 && (
                  <Fragment>
                    Add & Upload
                    <CropperInput
                      setImage={setImage}
                      setCropResult={setCropResult}
                      imagePreview={files[0].preview}
                    />
                    <div
                      className="field has-addons"
                      style={{
                        display: "block",
                        marginTop: "-32px",
                        marginLeft: "auto",
                        marginRight: "auto"
                      }}
                    >
                      <button
                        onClick={handleUploadImage}
                        className={
                          loading
                            ? "button is-small is-link is-rounded is-loading"
                            : "button is-small is-link is-rounded"
                        }
                        style={{ marginRight: "10px" }}
                      >
                        Upload
                      </button>
                      <button
                        disabled={loading}
                        onClick={handleCancelCrop}
                        className="button custom-grey is-small is-rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      {/* )} */}
      <PictureGalleries
        // photos={photos}
        // profile={profile}
        setMainPhoto={handleSetMainPhoto}
        deletePhoto={handleDeletePhoto}
        loading={loading}
      />
    </Fragment>
  );
};

export default compose(
  connect(
    mapState,
    actions
  )
  // ,
  // firestoreConnect(auth => query(auth))
)(ProfilePictures);
