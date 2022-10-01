import './Input.css';
function Input(props) {

    return (
        <div className='inputContainer'>
            <input type="text" placeholder="Enter here....." value={props.myText} onChange={props.mySettingText} />

            <div className="myButtonContainer">
                <button className='myButtons' onClick={props.myOnClick}>Add Item</button>
                <button className='myButtons' onClick={props.deleteAll}>Delete All</button>
            </div>

        </div>



    );
}

export default Input;