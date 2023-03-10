import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyAbBTIUkWK--4QNOlYGgOpn-Btj1lrnWMc",
  authDomain: "exam-ease-f9b89.firebaseapp.com",
  projectId: "exam-ease-f9b89",
  storageBucket: "exam-ease-f9b89.appspot.com",
  messagingSenderId: "640558834287",
  appId: "1:640558834287:web:f6607d2f0f64e29099639a"
};

// initialize firebase
firebase.initializeApp(firebaseConfig)

// initialize services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }
