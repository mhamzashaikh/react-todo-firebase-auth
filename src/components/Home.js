import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../AuthContext";
import './todos/Input.css';
import './todos/TodoList.css';
import { AiOutlineCaretRight } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, set, push, remove } from "firebase/database";
import database from "../firebaseConfig";
import { getAuth, signOut } from "firebase/auth";


function Home() {
    // const [userTodo, setUserTodo] = useState([]);
    const [text, setText] = useState("")

    const auth = useContext(AuthContext);
    const notify = () => toast.success(text + " is added to TodoList.", { position: toast.POSITION.BOTTOM_CENTER });


    // =============== FIREBASE WRITE DATA =================


    const writePost = (data) => {
        const todoListRef = ref(database, "todos/" + auth.user.uid);
        const newTodoRef = push(todoListRef); // 
        set(newTodoRef, data);
    }

    // |===============================================================|


    // =============== FIREBASE SIGNOUT USER =================

    const signout = () => {
        const _auth = getAuth();
        signOut(_auth).then(() => {
            // Sign-out successful.
            auth.signout()
            console.log(" Sign-out successful.");
        }).catch((error) => {
            // An error happened.
            auth.signout()
        });
    }

    // |===============================================================|


    //  For Storing input Text in setText


    // For Add Button
    const updateList = (e) => {
        e.preventDefault(); // we are using e.preventDefault() because of form method = "POST"
        writePost(text);
        notify();
        setText("");
    }



    // For Delete All Button
    const deleteAll = (e) => {

        e.preventDefault();
        const checkRef = ref(database, `/todos/${auth.user.uid}`);
        remove(checkRef);
    }





    return (
        <div className="container">
            <div className="subContainer">
                <div className="childContainer">

                    <h1>Home</h1>

                    <form method="POST">

                        <div className='inputContainer'>
                            <input type="text" placeholder="Enter here....." value={text} onChange={(e) => setText(e.target.value)} />

                            <div className="myButtonContainer">
                                <button className='myButtons' onClick={updateList}>Add Item</button>
                                <button className='myButtons' onClick={deleteAll}>Delete All</button>
                            </div>
                        </div>

                    </form>


                    <button className="myButtons" onClick={signout}>Signout</button>

                    <Link to="/todolist"> <button className="myButtons">Todo List <AiOutlineCaretRight /> </button> </Link>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default Home;