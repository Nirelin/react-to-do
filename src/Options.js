import React from 'react'
import './Options.css'

const options = (props) => {
    return (
        <div className='options'>
            <button 
                className={props.activeFilter==='all' ? 'active-filter' : null} 
                onClick={()=>props.changeFilter('all')}>All
            </button>
            <button 
                className={props.activeFilter==='unfinished' ? 'active-filter' : null} 
                onClick={()=>props.changeFilter('unfinished')}>Unfinished
            </button>
            <button 
                className={props.activeFilter==='completed' ? 'active-filter' : null} 
                onClick={()=>props.changeFilter('completed')}>Completed
            </button>
            <h6 className="hint">Double-Click on task to edit</h6>
        </div>
    )
}
export default options;