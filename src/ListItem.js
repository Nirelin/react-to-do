import React, {Component} from 'react'
import './ListItem.css'

class ListItem extends Component {

    state = {
        taskValue: this.props.item.value
    };

    textInput = React.createRef();

    onChangeHandler = (event) => {
        this.setState({taskValue: event.target.value})
    }

    taskKeyHandler = (event) => {
        if (event.key === 'Escape') {
            this.props.deselectTask();
            this.setState({taskValue: this.props.item.value})
          }
        if (event.key === 'Enter') {
            this.props.submitChanges(this.props.item.id, this.state.taskValue)
        }
      }

    componentDidUpdate() {
        this.textInput.current.focus();
    }

    render () {
        return(
            <div className={[this.props.isActive ? 'editing ' : null, this.props.item.checked ? 'completed': null].join(' ')}>
                <div className='task'>
                    <input type='checkbox' id={this.props.item.id}
                        checked={this.props.item.checked} 
                        onChange={()=>this.props.toggleChecked(this.props.item.id)}
                    />
                    <label htmlFor={this.props.item.id} className='status-check'></label>
                    <label className='task-display'
                        onDoubleClick={()=>this.props.setActiveTask(this.props.item.id)} 
                    >
                        {this.state.taskValue}
                    </label>
                    <div className='delete-button' 
                        onClick={()=>this.props.deleteTask(this.props.item.id)}
                    >
                    </div>
                </div>
                <input className='task-edit' type='text' 
                    value={this.state.taskValue} 
                    onChange={this.onChangeHandler}
                    onKeyDown={this.taskKeyHandler}
                    onBlur={()=>this.props.submitChanges(this.props.item.id, this.state.taskValue)}
                    ref={this.textInput}
                >
                </input>
            </div>
        )
    }
}
export default ListItem;