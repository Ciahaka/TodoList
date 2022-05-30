import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
export type filterValueType = 'all'|'active'|'completed'

function App() {
    let [tasks1, setTasks1] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: false},
        {id: 3, title: "ReactJS", isDone: true},
        {id: 4, title: "ReactJS", isDone: false}
    ])
    const removeTask = (taskId: number) => {
        tasks1 = tasks1.filter((el) => el.id !== taskId)
        setTasks1(tasks1)
    }
    const [filterValue,setFilterValue]=useState('all')
    const changeFilter =(value:filterValueType)=> {
        console.log(value)
    }

    let filteredTasks = tasks1
    if (filterValue==='active') {
        filteredTasks = tasks1.filter(el => el.isDone === false)
    }
    if ('completed') {
        filteredTasks = tasks1.filter(el => el.isDone === true)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
