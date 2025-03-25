import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useEffect, useContext } from 'react';
import { User } from './User';
import { collection, getDoc, setDoc, query, doc, onSnapshot, deleteDoc, addDoc, orderBy } from "firebase/firestore";
import db from '../../db';


function Nav(props) {

  const { user, setUser } = useContext(User);
  const { userLat, userLng, p2r, restaurant } = props;

  // Configure Firebase.
  const config = {
    apiKey: import.meta.env.VITE_FIRESTORE_API_KEY,
    authDomain: import.meta.env.VITE_FIRESTORE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIRESTORE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIRESTORE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIRESTORE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIRESTORE_APP_ID,
    // ...
  };
  firebase.initializeApp(config);

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
  };

  useEffect(() => {

    const unregisteredAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      //console.log(user.uid);
      setUser(user);

    });

    return () => unregisteredAuthObserver

  }, [user]);

  //console.log(user);

  const saveP2R = async () => {
    //console.log('save!');

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //console.log(docSnap.data());
    } else {
      //console.log('adding user');
      await setDoc(doc(db, "users", user.uid), {});
    }

    const docRef2 = await addDoc(collection(db, "users", user.uid, "p2r-data"), {
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL,
      restaurant: restaurant,
      userLat: userLat,
      userLng: userLng,
      p2r: p2r,
      timestamp: new Date(),
  });

  }


  if (user) {

    return (
      <>
        {/* <p>Welcome <b>{user.displayName}!</b> <a onClick={
          () => { firebase.auth().signOut() }
        }>Log out</a></p> */}
        <button id="save-p2r" onClick={() => saveP2R()}>Save</button>
        {/* <img src={user.photoURL} />
        <h2>Firestore:</h2> */}
      </>

    )

  } else {

    return (
      <>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        {/* <h2>Firestore:</h2> */}
      </>
    )

  }

}

export default Nav;