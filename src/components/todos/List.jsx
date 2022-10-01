import { useState, useEffect } from 'react';
import './List.css';
import './TodoList.css';


function List() {
    const localStorageTodo = JSON.parse(localStorage.getItem("TodoList"));

    const [todolist, setTodoList] = useState(localStorageTodo !== null ? localStorageTodo : []);
    const [editTodoIndex, setEditTodoIndex] = useState(null); // storing index value




    useEffect(() => {
        const myNewList = [...todolist];
        localStorage.setItem('TodoList', JSON.stringify(myNewList))

    }, [todolist]);





    // For Edit list Button

    const onEdit = (indexNumber) => {

        // Storing indexNumber
        setEditTodoIndex(indexNumber);

    }

    // for Update button

    const onUpdate = (index, changeValue) => {
        const newList = [...todolist];
        newList[index] = changeValue;

        setTodoList(newList);

    }

    // For Delete Button
    const deleteItem = (id) => {

        // deleting only that value which was clicked, Condition : add only that values in setValue state whose indexNum not equal to id & those(indexNum and id) is matched will be deleted or remove from our TodoList.

        setTodoList((oldArrItems) => {
            return oldArrItems.filter((arrElement, indexNum) => {
                return indexNum !== id;
            })

        })

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
                                                    value={element}
                                                    onChange={(e) => {
                                                        onUpdate(index, e.target.value);
                                                    }}
                                                />
                                                )
                                                : (
                                                    <input className='input-disable' value={element} readOnly />
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
                                            <button className="myButtons deleteIcon" onClick={() => { deleteItem(index) }}>
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