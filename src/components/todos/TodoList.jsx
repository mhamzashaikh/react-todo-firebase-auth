import { useEffect, useState } from "react";
import './TodoList.css';
import List from './List';
import Input from './Input';


function TodoList() {
    const checkLocalStorageData = JSON.parse(localStorage.getItem('myTodoData'));

    const [value, setValue] = useState(checkLocalStorageData!==null? checkLocalStorageData: []);
    const [text, setText] = useState("");
    const [editTodoIndex, setEditTodoIndex] = useState(null); // storing index value

    
    useEffect(()=>{
        const myNewList = [...value];
        localStorage.setItem('myTodoData',JSON.stringify(myNewList))

    },[value]);


    // For Storing input Text in setText
    const storingText = (e) => {
        setText(e.target.value)
    }


    // For Add Button
    const updateList = () => {

        setValue([...value, text]);
    
        setText("");
    }


    // For Delete All Button

    const deleteAll = () => {
        setValue([]);
    }

    // For Delete Button
    const deleteItem = (id) => {

        // deleting only that value which was clicked, Condition : add only that values in setValue state whose indexNum not equal to id & those(indexNum and id) is matched will be deleted or remove from our TodoList.

        setValue((oldArrItems) => {
            return oldArrItems.filter((arrElement, indexNum) => {
                return indexNum !== id;
            })

        })

    }

    // For Edit list Button

    const onEdit = (indexNumber) => {

        // Storing indexNumber
        setEditTodoIndex(indexNumber);

    }

    // for Update button

    const onUpdate = (index, changeValue) => {
        const newList = [...value];
        newList[index] = changeValue;

        setValue(newList);

    }

    return (

        <div className="container">
            <div className="subContainer">
                <div className="childContainer">
                    <h1>Todo List</h1>
                    {/* Input component with add button  */}
                    <Input myText={text} myOnClick={updateList} mySettingText={storingText} deleteAll={deleteAll} />

                    {/* List component having edit and delete button */}
                    {value.map((arr, index) => {
                        return (
                            <List
                                key={index}
                                data={arr}
                                onDelete={deleteItem}
                                myId={index}
                                myValue={value}
                                onEdit={onEdit}
                                editTodoIndex={editTodoIndex}
                                setEditTodoIndex={setEditTodoIndex}
                                onUpdate={onUpdate}

                            />
                        );
                    })}
                </div>

            </div>
        </div>
    );
}

export default TodoList;