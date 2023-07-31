import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC09RI_PAS_bpjtQ6osZ1-jGZjdGAInynA",
  authDomain: "drag-drop-b46af.firebaseapp.com",
  databaseURL: "https://drag-drop-b46af-default-rtdb.firebaseio.com",
  projectId: "drag-drop-b46af",
  storageBucket: "drag-drop-b46af.appspot.com",
  messagingSenderId: "1037836392996",
  appId: "1:1037836392996:web:bf5c33bcb08fdadf1b16b1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export default database;