import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./Form.css";
import app from "../firebaseConfig";
import AuthContext from "../AuthContext";


function Login() {
    const [loginUserData, setUserData] = useState({});
    const { email, password } = loginUserData; // destructuring

    const authcontext = useContext(AuthContext);

    const navigate = useNavigate();

    const notifySuccess = () => toast.success("Succesfully login", { position: toast.POSITION.TOP_CENTER });
    const notifyFail = () => toast.warning("User not found", { position: toast.POSITION.TOP_CENTER });


    // ==================== Firebase login =======================================

    const signinUser = async () => {
        const auth = getAuth(app);
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // console.log("userCredential: ",userCredential);
                // console.log("user: ",user);

                // --------- context auth -------- 

                authcontext.signin(
                    {
                        email: email,
                        password: password,
                    },
                    () => {
                        localStorage.setItem("loginUserToken", userCredential._tokenResponse.refreshToken);
                        notifySuccess();
                        navigate('/');

                    }
                );

                alert("Login details correct");

                // -----------------------------------------



            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                notifyFail();
            });




    }

    // |=================================================|


    return (
        <div className="form-container">

            <label htmlFor="loginEmail">Email</label>
            <input type="text" id="loginEmail" onChange={(e) => setUserData({ ...loginUserData, "email": e.target.value })} />
            <label htmlFor="loginPassword">Password</label>
            <input type="text" id="loginPassword" onChange={(e) => setUserData({ ...loginUserData, "password": e.target.value })} />
            <span>Don't have an account? <Link to="/signup">Create account now</Link></span>

            <button id="loginBtn" onClick={signinUser}>Login</button>
            <ToastContainer />

        </div>


    )
}

export default Login;