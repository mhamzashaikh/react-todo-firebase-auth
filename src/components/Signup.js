import "./Form.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Signup() {

    const navigate = useNavigate();
    const [userData, setUserInput] = useState({});
    const [errors, setErrors] =  useState();
    const {email, password} = userData; // destructuring
    const notifySuccess = () => toast.success("Succesfully signup ", { position: toast.POSITION.TOP_CENTER });
    const notifyFail = () => toast.warning("Something went wrong", { position: toast.POSITION.TOP_CENTER });

    // Firebase Signup email 

    const signupUser = () => {

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;
                notifySuccess();
                navigate("/login");
                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;
                setErrors(errorMessage);
                notifyFail();
                // ..
            });
       

    }



    function updateField(key, value) {
        setUserInput({ ...userData, [key]: value })
    }




    return (
        <div className="form-container">

            <label htmlFor="signupEmail">Email: </label>
            <input type="email" id="signupEmail" onChange={(e) => { updateField("email", e.target.value) }} />
            <label htmlFor="signupPassword">Password: </label>
            <input type="password" id="signupPassword"  onChange={(e) => { updateField("password", e.target.value) }} />
            <span>Already Registered? <Link to="/login">Login now</Link></span>
            {errors}

            <button id="signupBtn" onClick={signupUser}>Signup</button>
            <ToastContainer />

        </div>
    )
}

export default Signup;