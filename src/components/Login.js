import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import "./Form.css";
function Login() {
    const [loginUserData, setUserData] = useState({});


    const auth = useContext(AuthContext);

    const navigate = useNavigate();


    return (
        <div className="form-container">

            <label htmlFor="loginEmail">Email</label>
            <input type="text" id="loginEmail" onChange={(e) => setUserData({ ...loginUserData, "email": e.target.value })} />
            <label htmlFor="loginPassword">Password</label>
            <input type="text" id="loginPassword" onChange={(e) => setUserData({ ...loginUserData, "password": e.target.value })} />
            <span>Don't have an account? <Link to="/signup">Create account now</Link></span>

            <button id="loginBtn" onClick={() => {
                let usersExist = JSON.parse(localStorage.getItem("user"));
                console.log("exist user: ", usersExist.email);
                if (usersExist.email === loginUserData.email && usersExist.password === loginUserData.password) {
                    auth.signin(
                        {
                            email: loginUserData.email,
                            password: loginUserData.password,
                        },
                        () => {
                            localStorage.setItem("loginUser", JSON.stringify(loginUserData));
                            navigate("/");
                        }
                    );

                    alert("Login details correct");
                }
                else {
                    alert("Wrong Details");

                }


            }}>Login</button>

        </div >


    )
}

export default Login;