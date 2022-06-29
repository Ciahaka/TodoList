import React, {useState} from 'react';
import './App.css';
import {TasksTodolist, Todolist} from "./Todolist";

function App() {
  const title_1: string = 'Чо учить??'
  const title_2: string = 'Чо купить??'
  const title: string = 'Где тусить??'

  // const tasks_1: Array<TasksTodolist> = [
  //     {id: 1, isDone: true, title: 'React'},
  //     {id: 2, isDone: true, title: 'CSS'},
  //     // {id: 3, isDone: false, title: 'ES6'},

  // ]
  // const tasks_2: Array<TasksTodolist> = [
  //     {id: 1, isDone: false, title: 'Bread'},
  //     {id: 2, isDone: true, title: 'Butter'},
  //     {id: 3, isDone: true, title: 'Milk'},
  //
  // ]

  const [tasks,setTasks] =useState(
    [
      {id: 1, isDone: false, title: 'Club'},
      {id: 2, isDone: true, title: 'Museum'},
      {id: 3, isDone: false, title: 'Street'},
      {id: 4, isDone: true, title: 'Gym'},
    ]
  )

  // let tasks: Array<TasksTodolist> = [
  //   {id: 1, isDone: false, title: 'Club'},
  //   {id: 2, isDone: true, title: 'Museum'},
  //   {id: 3, isDone: false, title: 'Street'},
  //   {id: 4, isDone: true, title: 'Gym'},
  // ]

  const deleteTask = (taskID:number) => {
    // alert('Upsss')
   // const updateTasks = tasks.filter(task=>task.id!==taskID)
   //  setTasks(taskID)
    setTasks(tasks.filter(task=>task.id!==taskID))
  }

  return (

    <div className="App">
      {/*<Todolist title={title_1} tasks={tasks_1}/>*/}
      {/*<Todolist title={title_2} tasks={tasks_2}/>*/}
      <Todolist
        title={title}
        tasks={tasks}
        deleteTask={deleteTask}
      />

    </div>
  );
}

export default App;
