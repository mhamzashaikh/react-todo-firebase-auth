// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABTPWuD2qgih-VHwxCN0mCF3OPx1vWxso",
  authDomain: "react-todo-ef47a.firebaseapp.com",
  databaseURL: "https://react-todo-ef47a-default-rtdb.firebaseio.com",
  projectId: "react-todo-ef47a",
  storageBucket: "react-todo-ef47a.appspot.com",
  messagingSenderId: "735915280886",
  appId: "1:735915280886:web:38e3e865e436d65633dfd7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const database = getDatabase(app);

export default database;