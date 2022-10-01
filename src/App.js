
// import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { fakeAuthProvider } from './Auth';
import { Routes, Route } from 'react-router-dom';

import AuthContext from './AuthContext';
import ProtectedWrapper from './ProtectedWrapper';
import { useState } from 'react';
import List from './components/todos/List';


function App() {

  let [user, setUser] = useState(() => {
    const userObj = JSON.parse(localStorage.getItem("loginUser"));
    console.log("userObj", userObj);
    return userObj;
  }
  );

  function signin(newUser, callback) {
    console.log("CALLED FROM Login Page");
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });

  }

  function signout(callback) {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });

  }



  let value = { user, signin, signout };

  console.log("user is:", user);




  return (
    <AuthContext.Provider value={value} >



        <Routes>
          <Route path="/" element={
            <ProtectedWrapper name="hello">
              <Home />
            </ProtectedWrapper>
          } />

          <Route path='/*' element={<h1>404 page</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

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
