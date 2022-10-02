import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../AuthContext";
import './todos/Input.css';
import './todos/TodoList.css';
import { AiOutlineCaretRight } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import app from '../firebaseConfig';
import { getDatabase, ref, set, push, child, update } from "firebase/database";


// console.log("DB ",db);


// var newRef = push(child(ref(db), 'users')).key;

// // const newPostKey = push(child(ref(db), 'posts')).key;

// function writeUserData() {

//   set(ref(db, 'users/'), {
//     id: newRef,
//     username: "hamza",
//     email: "rsas@gmail.com",
//     profile_picture : "https://google.com"
//   });
// }

// writeUserData();











function Home() {
    const [userTodo, setUserTodo] = useState([]);
    const [text, setText] = useState("")

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    // Update LocalStorage if any change made in userTodo;
    useEffect(() => {
        localStorage.setItem("TodoList", JSON.stringify(userTodo));
        console.log("inside effect")
        writeNewPost(text);
    }, [userTodo]);

    const notify = () => toast.success(text + " is added to TodoList.", { position: toast.POSITION.BOTTOM_CENTER });




   



    // =============== FIREBASE WRITE DATA =================


    function writeNewPost(data) {
        const db = getDatabase(app);

        // A post entry.
        const userTodo = {
            todo: data,
        };

        // Get a key for a new Post.
        const newPostKey = push(child(ref(db), 'posts')).key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['/UserTodo/' + newPostKey] = userTodo;
        // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

        return update(ref(db), updates);
    }

    // |===============================================================|







    // // For Storing input Text in setText
    // let names, value;
    // const storingText = (e) => {

    //     names = e.target.name;
    //     value = e.target.value;
    //     setText({ ...text, [names]: value })

    // }

    // For Add Button
    const updateList = (e) => {
        e.preventDefault();

        setUserTodo([...userTodo, text]);

        notify();

        setText("");
    }



    // For Delete All Button
    const deleteAll = () => {
        setUserTodo([]);
    }





    return (
        <div className="container">
            <div className="subContainer">
                <div className="childContainer">



                    <h1>Home</h1>

                    <form method="POST">

                        <div className='inputContainer'>
                            <input type="text" placeholder="Enter here....." value={text} onChange={(e)=> setText(e.target.value)} />

                            <div className="myButtonContainer">
                                <button className='myButtons' onClick={updateList}>Add Item</button>
                                <button className='myButtons' onClick={deleteAll}>Delete All</button>
                            </div>
                        </div>

                    </form>



                    <button className="myButtons" onClick={() =>
                        auth.signout(() => {
                            navigate("/login");
                            localStorage.removeItem("loginUserToken");
                        })}>Signout</button>

                    <Link to="/todolist"> <button className="myButtons">Todo List <AiOutlineCaretRight /> </button> </Link>
                    <ToastContainer />

                </div>
            </div>
        </div>






    )
}

export default Home;