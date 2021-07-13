import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyCtRtMq3ft32oOlYZGgDU0rPdC-Zv5ReUQ",
  authDomain: "wily-9281e.firebaseapp.com",
  databaseURL: "https://wily-9281e.firebaseio.com",
  projectId: "wily-9281e",
  storageBucket: "wily-9281e.appspot.com",
  messagingSenderId: "604939375300",
  appId: "1:604939375300:web:f0666d8c04484e3e5fef91"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
  