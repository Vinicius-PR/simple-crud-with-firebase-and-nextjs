import firebase from "firebase/app";
import 'firebase/database'

// Put your firebase configuration here (change "Edit here" values)
const firebaseConfig = {
  apiKey: "Edit here",
  authDomain: "Edit here",
  projectId: "Edit here",
  storageBucket: "Edit here",
  messagingSenderId: "Edit here",
  appId: "Edit here"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

const database = firebase.database()

export { database, firebase }