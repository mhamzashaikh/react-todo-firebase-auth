import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../AuthContext";
import './todos/Input.css';
import './todos/TodoList.css';
import { AiOutlineCaretRight } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function Home() {
    const [userTodo, setUserTodo] = useState([]);
    const [text, setText] = useState({
        todoText: ""
        
    });
    console.log('====================================');
    console.log("text:", text);
    console.log('====================================');
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    // Update LocalStorage if any change made in userTodo;
    useEffect(() => {
        localStorage.setItem("TodoList", JSON.stringify(userTodo))
    }, [userTodo]);

    const notify = () => toast.success(text.todoText + " is added to TodoList.",{ position: toast.POSITION.BOTTOM_CENTER });



    // For Storing input Text in setText
    let names, value;
    const storingText = (e) => {

        names = e.target.name;
        value = e.target.value;
        setText({...text, [names]: value})

    }

    // For Add Button
    const updateList = async (e) => {
        e.preventDefault();

        const res = await fetch("https://react-todo-ef47a-default-rtdb.firebaseio.com/todoreact.json",{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                todoText: text.todoText
            })
           
        });



        // setUserTodo([...userTodo, text]);

        notify();

        // setText("");
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
                        <input type="text" placeholder="Enter here....." name="todoText" value={text.todoText} onChange={storingText} />

                        <div className="myButtonContainer">
                            <button className='myButtons' onClick={updateList}>Add Item</button>
                            <button className='myButtons' onClick={deleteAll}>Delete All</button>
                        </div>
                    </div>

                    </form>



                    <button className="myButtons" onClick={() =>
                        auth.signout(() => {
                            navigate("/login");
                            localStorage.removeItem("loginUser");
                        })}>Signout</button>

                    <Link to="/todolist"> <button className="myButtons">Todo List <AiOutlineCaretRight /> </button> </Link>
                    <ToastContainer />

                </div>
            </div>
        </div>






    )
}

export default Home;