import "./Form.css";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import app from '../firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {

    const navigate = useNavigate();
    const [userData, setUserInput] = useState({});

    const {email, password} = userData; // destructuring

    console.log("email: ", email);
    console.log("pass: ", password);





    // Firebase Signup email 

    const signupUser = async () => {



        const auth = getAuth(app);
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // localStorage.setItem('Auth Token', userCredential._tokenResponse.refreshToken);
                navigate("/login");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
            alert("submit");

    }




    function updateField(key, value) {
        setUserInput({ ...userData, [key]: value })
    }



    function submit() {
        // localStorage.setItem("userData", JSON.stringify(userData));

        localStorage.setItem("user", JSON.stringify(userData));


        alert("submit");

        navigate("/login");
    }

    return (
        <div className="form-container">

            <label htmlFor="signupEmail">Email: </label>
            <input type="email" id="signupEmail" onChange={(e) => { updateField("email", e.target.value) }} />
            <label htmlFor="signupPassword">Password: </label>
            <input type="password" id="signupPassword" onChange={(e) => { updateField("password", e.target.value) }} />
            <span>Already Registered? <Link to="/login">Login now</Link></span>

            <button id="signupBtn" onClick={signupUser}>Signup</button>

        </div>
    )
}

export default Signup;