import React, {useState} from 'react';
import './App.css';
import {TaskTodolist, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueTye = 'All' | 'Active' | 'Completed'

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

  const [tasks, setTasks] = useState(
    [
      {id: v1(), isDone: false, title: 'Club'},
      {id: v1(), isDone: true, title: 'Museum'},
      {id: v1(), isDone: false, title: 'Street'},
      {id: v1(), isDone: true, title: 'Gym'},
    ]
  )
  // let tasks: Array<TasksTodolist> = [
  //   {id: 1, isDone: false, title: 'Club'},
  //   {id: 2, isDone: true, title: 'Museum'},
  //   {id: 3, isDone: false, title: 'Street'},
  //   {id: 4, isDone: true, title: 'Gym'},
  // ]
  const deleteTask = (taskID: string) => {
    // alert('Upsss')
    // const updateTasks = tasks.filter(task=>task.id!==taskID)
    //  setTasks(taskID)
    setTasks(tasks.filter(task => task.id !== taskID))
  }

  const addTask = (title:string) => {
    const newTask: TaskTodolist = {id: v1(), title, isDone: false}
    setTasks([newTask, ...tasks])
      }


  const [filter, setFilter] = useState<FilterValueTye>('All')
  let tasksForRender
  switch (filter) {
    case 'Completed':
      tasksForRender = tasks.filter(t => t.isDone)
      break
    case "Active":
      tasksForRender = tasks.filter(t => !t.isDone)
      break
    default:
      tasksForRender = tasks

  }

  const changeFilter = (filter: FilterValueTye) => {
    setFilter(filter)
  }

  // @ts-ignore
  // @ts-ignore
  return (

    <div className="App">
      {/*<Todolist title={title_1} tasks={tasks_1}/>*/}
      {/*<Todolist title={title_2} tasks={tasks_2}/>*/}
      <Todolist
        title={title}
        tasks={tasksForRender}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />

    </div>
  );
}

export default App;
