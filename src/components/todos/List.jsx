import { useState, useEffect, useContext } from 'react';
import './List.css';
import './TodoList.css';
import AuthContext from "../../AuthContext";
import { ref, update, onValue, query, orderByKey, remove } from "firebase/database";
import database from "../../firebaseConfig";


function List() {


    const [todolist, setTodoList] = useState([]);
    const [editTodoIndex, setEditTodoIndex] = useState(null); // storing index value
    
    const auth = useContext(AuthContext);
    // Firebase 
    const checkRef = ref(database, 'todos/' + auth.user.uid);
    const myQuery = query(checkRef, orderByKey());
    
    
    useEffect(() => {
        onValue(myQuery, (snapshot) => {
            let myarr = [];
            myarr = snapshot.val();
            console.log("inside arr", myarr);
            if (myarr !== null){
                console.log("Object entries", Object.entries(myarr));
                let myArrayData = Object.entries(myarr);
                setTodoList(myArrayData);
            
            }
                else{
                    setTodoList([]);
                }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);



    // For Edit list Button

    const onEdit = (indexNumber) => {

        // Storing indexNumber
        setEditTodoIndex(indexNumber);

    }

    // for Update button

    const onUpdate = (index, changeValue) => {

        let todoKey = todolist[index][0];
        const updates = {};
        console.log("update: and key", index ,changeValue );
        updates[`/todos/${auth.user.uid}/${todoKey}`] = changeValue;
        return update(ref(database), updates);

        

    }


    // For delete 

    const deleteItems = (indexid) => {

        console.log(indexid);
        let todoKey = todolist[indexid][0];
        const checkRef = ref(database, `/todos/${auth.user.uid}/${todoKey}`);
        remove(checkRef);

    }




    return (
        <>
            {/* List component having edit and delete button */}


            <div className="container">
                <div className="subContainer">
                    <div className="childContainer">


                        <div className="myList" >
                            {todolist.map((element, index) => {

                                return (
      
                                    
                                    <li key={index}>
                                        {
                                            editTodoIndex === index ?
                                                (<input className='input-enable'
                                                    value={element[1]}
                                                    onChange={(e) => {
                                                        onUpdate(index, e.target.value);
                                                    }}
                                                />
                                                )
                                                : (
                                                    <input className='input-disable' value={element[1]} readOnly />
                                                )
                                        }

                                        <div className="myIcons">

                                            {/* Updating icon  */}
                                            <button className="myButtons updateIcon" onClick={() => {
                                                if (editTodoIndex === index) {
                                                    setEditTodoIndex(null);
                                                }
                                                else {
                                                    onEdit(index);

                                                }

                                            }}>
                                                {editTodoIndex === index ? "Update" : "Edit"}
                                            </button>

                                            {/* Deleting ion */}
                                            <button className="myButtons deleteIcon" onClick={() => { deleteItems(index) }}>
                                                delete
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </div>


                    </div>
                </div>
            </div>



        </>






    );
}

export default List;