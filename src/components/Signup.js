import "./Form.css";
import {Link, useNavigate} from 'react-router-dom';
import { useState } from "react";

function Signup(){
    
  
    const navigate = useNavigate();
    
    const [userData, setUserInput] = useState({});
    console.log(userData);
    console.log("email is: ",userData.email);



    function updateField(key, value){
        setUserInput({...userData, [key]: value})
    }



    function submit(){
        // localStorage.setItem("userData", JSON.stringify(userData));

        localStorage.setItem("user", JSON.stringify(userData));


        alert("submit");

        navigate("/login");
    }

    return(
        <div className="form-container">

        <label htmlFor="signupEmail">Email: </label>
        <input type="email" id="signupEmail" onChange={(e)=>{ updateField("email", e.target.value) }} />
        <label htmlFor="signupPassword">Password: </label>
        <input type="password" id="signupPassword" onChange={(e)=>{ updateField("password", e.target.value)}}/>
        <span>Already Registered? <Link to="/login">Login now</Link></span>

        <button id="signupBtn" onClick={submit}>Signup</button>
  
        </div>
    )
}

export default Signup;