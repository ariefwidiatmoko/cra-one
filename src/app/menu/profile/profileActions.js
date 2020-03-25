// import { SubmissionError, reset } from "redux-form";
import { toastr } from "react-redux-toastr";
import { asyncActionStart, asyncActionFinish, asyncActionError } from "../../async/asyncActions";
// import cuid from "cuid";
// import firebase from "../../app/config/firebase";

export const updateProfile = user => async (
    dispatch,
    getState,
    // {getFirebase}
) => {
    // const firebase = getFirebase();
    // const {isLoaded, isEmpty, ...updatedUser} = user;
    // try {
    //     dispatch(asyncActionStart());
    //     await firebase.updateProfile(updatedUser);
    //     toastr.success("Success", "Profile has been updated");
    //     dispatch(asyncActionFinish());
    // } catch (error) {
    //     dispatch(asyncActionError())
    //     console.log(error);
    // }
}

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  // { getFirebase, getFirestore }
) => {
  // const imageName = cuid() + fileName;
  // const firebase = getFirebase();
  // const firestore = getFirestore();
  // const user = firebase.auth().currentUser;
  // const path = `${user.uid}/user_images`;
  // const options = {
  //   name: imageName
  // };
  try {
    dispatch(asyncActionStart());
    // upload file to firebase storage
    // let uploadedFile = await firebase.uploadFile(path, file, null, options);
    // get url of image
    // let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
    // get userdoc
    // let userDoc = await firestore.get(`users/${user.uid}`);
    // check if user has photo, if not update profile
    // if (!userDoc.data().photoURL) {
    //   await firebase.updateProfile({
    //     photoURL: downloadURL
    //   });
    //   await user.updateProfile({
    //     photoURL: downloadURL
    //   });
    // }
    // add the image to firestore
    // await firestore.add(
    //   {
    //     collection: "users",
    //     doc: user.uid,
    //     subcollections: [{ collection: "photos" }]
    //   },
    //   {
    //     name: imageName,
    //     url: downloadURL
    //   }
    // );
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const deletePhoto = photo => async (
  dispatch,
  getState,
  // { getFirebase, getFirestore }
) => {
  // const firebase = getFirebase();
  // const firestore = getFirestore();
  // const user = firebase.auth().currentUser;
  try {
    dispatch(asyncActionStart());
    // await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    // await firestore.delete({
    //   collection: "users",
    //   doc: user.uid,
    //   subcollections: [{ collection: "photos", doc: photo.id }]
    // });
    toastr.error("Success", "Picture has been deleted");
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    throw new Error("Problem deleting the photo");
  }
};

export const setMainPhoto = photo => async ( dispatch, getState ) => {
  // const firestore = firebase.firestore();
  // const user = firebase.auth().currentUser;
  // const today = new Date();
  // let userDocRef = firestore.collection('users').doc(user.uid);
  // let eventAttendeeRef = firestore.collection('event_attendee');

  try {
    dispatch(asyncActionStart());
    // let batch = firestore.batch();

    // batch.update(userDocRef, {
    //   photoURL: photo.url
    // })

    // let eventQuery = await eventAttendeeRef
    //   .where('userUid', '==', user.uid)
    //   .where('eventDate', '>=', today);

    // let eventQuerySnap = await eventQuery.get();

    // for (let i = 0; i < eventQuerySnap.docs.length; i++) {
    //   let eventDocRef = await firestore
    //     .collection('events')
    //     .doc(eventQuerySnap.docs[i].data().eventId);
    //   let event = await eventDocRef.get();
    //   if (event.data().hostUid === user.uid) {
    //     batch.update(eventDocRef, {
    //       hostPhotoURL: photo.url,
    //       [`attendees.${user.uid}.photoURL`]: photo.url
    //     })
    //   } else {
    //     batch.update(eventDocRef, {
    //       [`attendees.${user.uid}.photoURL`]: photo.url
    //     })
    //   }
    // }
    // await batch.commit();
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    throw new Error("Problem setting main photo");
  }
};

export const updatePassword = (creds) => 
  async (dispatch, getState
    // , {getFirebase}
    ) => {
    // const firebase = getFirebase();
    // const user = firebase.auth().currentUser;
    // try {
    //   await user.updatePassword(creds.newPassword1);
    //   await dispatch(reset('profileAccount'));
    //   toastr.success('Success', 'Your password has been updated')
    // } catch (error) {
    //   throw new SubmissionError({
    //     _error: error.message
    //   })
    // }
  }