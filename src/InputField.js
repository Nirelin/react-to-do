import React from 'react'
import './InputField.css'

const inputField = (props) => {
    return(
        <div className='new-task-block'>
            <input 
                type='text' 
                placeholder="Add new task" 
                className='new-task-input' 
                value={props.newTaskValue} 
                onChange={props.onChangeHandler} 
                onKeyPress={props.createNewTask}>
            </input>
        </div>
    )
}

export default inputField;