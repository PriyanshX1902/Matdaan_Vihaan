import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyCZgR80ABEEzJGs0yoiVWkj32MwhAFZNZc",
  authDomain: "matdaanvihaan.firebaseapp.com",
  projectId: "matdaanvihaan",
  storageBucket: "matdaanvihaan.appspot.com",
  messagingSenderId: "349057611760",
  appId: "1:349057611760:web:5c69e4ca19936b6b698f35",
  measurementId: "G-2TQ6H98L73"
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;