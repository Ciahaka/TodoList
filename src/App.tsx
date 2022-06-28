import React from 'react';
import './App.css';
import {TasksTodolist, Todolist} from "./Todolist";

function App() {

  const title_1: string = 'Чо учить??'
  const title_2: string = 'Чо купить??'
  const title_3: string = 'Где тусить??'

  const tasks_1: Array<TasksTodolist> = [
    {id: 1, isDone: true, title: 'React'},
    {id: 2, isDone: true, title: 'CSS'},
    {id: 3, isDone: false, title: 'ES6'},

  ]
  const tasks_2: Array<TasksTodolist> = [
    {id: 1, isDone: false, title: 'Bread'},
    {id: 2, isDone: true, title: 'Butter'},
    {id: 3, isDone: true, title: 'Milk'},

  ]

  const tasks_3: Array<TasksTodolist> = [
    {id: 1, isDone: false, title: 'Club'},
    {id: 2, isDone: false, title: 'Museum'},
    {id: 3, isDone: true, title: 'Street'},

  ]

  return (

    <div className="App">
      <Todolist title={title_1} tasks={tasks_1}/>
      <Todolist title={title_2} tasks={tasks_2}/>
      <Todolist title={title_3} tasks={tasks_3}/>

    </div>
  );
}

export default App;
