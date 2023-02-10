import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyB-OJn29-O8M99WPqJwFzBT10CQAfbcOHM",
    authDomain: "exam-ease-a59be.firebaseapp.com",
    projectId: "exam-ease-a59be",
    storageBucket: "exam-ease-a59be.appspot.com",
    messagingSenderId: "623304814609",
    appId: "1:623304814609:web:f797d996f01096386101b0"
  };

// initialize firebase
firebase.initializeApp(firebaseConfig)

// initialize services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage ,timestamp }
