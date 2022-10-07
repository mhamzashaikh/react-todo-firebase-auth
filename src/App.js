
// import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { Routes, Route } from 'react-router-dom';
import AuthContext from './AuthContext';
import ProtectedWrapper from './ProtectedWrapper';
import { useState, useEffect } from 'react';
import List from './components/todos/List';
import { getAuth, onAuthStateChanged } from "firebase/auth";


function App() {

  let [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log("ON MOUNT user:", user);
      if (user) {
        // const uid = user.uid;
        setUser(user);
        setLoader(false);
        // ...
      } else {
        // User is signed out
        // ...
        setLoader(false);
      }
    });
  }, []);



  function signin(newUser, callback) {
    setUser(newUser);
    callback();

  }

  function signout() {
    setUser(null);

  }




  let value = { user, signin, signout };

  console.log("app page value", value);

  if (loader)
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>LOADING...</h1>
      </div>
    );




  return (
    <AuthContext.Provider value={value} >

      <Routes>
        <Route exact path="/" element={
          <ProtectedWrapper name="hello">
            <Home />
          </ProtectedWrapper>
        } />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='*' element={<h1>404 page</h1>} />

        <Route path="/todolist" element={
          <ProtectedWrapper name="hello">

            <List />

          </ProtectedWrapper>

        } />

      </Routes>

    </AuthContext.Provider>



  );
}

export default App;
