import React, { Component } from 'react';
import './App.css';
import ListItem from './ListItem'
import InputField from './InputField';
import Options from './Options';

class App extends Component {
  state = {
    newTask: '',
    listArray: [],
    idCounter: 0,
    nowEditing: null,
    filter: 'default'
  };

  onChangeHandler = (event) =>{
    this.setState({newTask: event.target.value})
  }

  createNewTask = (event) =>{
    if (event.key === 'Enter' && event.target.value !=='') {
    const listArray = [...this.state.listArray];
    listArray.push({id: this.state.idCounter, value: event.target.value, checked: false});
    this.setState({newTask:'', listArray: listArray, idCounter: this.state.idCounter + 1})
    }
  }

  setIdOfActiveTask = (taskId)=>{
    this.setState({nowEditing: taskId})
  }
  
  deselectTaskHandler = ()=>{
    this.setState({nowEditing: null})
  }
  
  toggleCheckedHandler = (elementId) =>{
    const listArray = this.state.listArray.map(item=> {
      if(item.id===elementId){
        item.checked = !item.checked;
      }
      return item;
    });
    this.setState({listArray: listArray});
  }

  deleteTaskHandler = (elementId) =>{
    const listArray = this.state.listArray.filter(item => item.id !== elementId);
    this.setState({listArray: listArray});
  }

  submitTaskChanges = (updatedTaskId, updatedTaskValue) => {
    if (updatedTaskValue === '') {
      const listArray = this.state.listArray.filter(item=> item.id!==updatedTaskId);
      this.setState({nowEditing: null, listArray: listArray})
    } 
    else {
      const listArray = this.state.listArray.map(item=> {
       if (item.id === updatedTaskId) {item.value = updatedTaskValue; return item}
       return item;
      })
      this.setState({nowEditing: null, listArray: listArray})
    }
  }

  changeFilterHandler = (filter)=> {
    this.setState({filter: filter})
  }

  render() {
    let listItems = null;
    if (this.state.filter==='all'||this.state.filter==='default') {listItems = this.state.listArray} else
    if (this.state.filter==='unfinished') {listItems = this.state.listArray.filter(item=>item.checked===false)} else 
    if (this.state.filter==='completed') {listItems = this.state.listArray.filter(item=>item.checked===true)};
    listItems = listItems.map(item => {
      return (
        <ListItem 
          key={item.id}
          item={item}
          toggleChecked={this.toggleCheckedHandler}
          setActiveTask={this.setIdOfActiveTask}
          deselectTask={this.deselectTaskHandler}
          isActive={this.state.nowEditing === item.id}
          deleteTask={this.deleteTaskHandler} 
          submitChanges={this.submitTaskChanges} 
        />
      )
    })
    
    return (
      <div>
        <h1 className="title">To Do List</h1>
        <div className='main'>
          <InputField 
            newTaskValue={this.state.newTask} 
            onChangeHandler={this.onChangeHandler} 
            createNewTask={this.createNewTask} 
          />
          {listItems}
          {this.state.listArray.length > 0 && <Options
              changeFilter={this.changeFilterHandler} 
              activeFilter={this.state.filter} 
            />
          }
        </div>
      </div>
    )
  }
}

export default App;