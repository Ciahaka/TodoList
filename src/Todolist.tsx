import React from 'react';

export type TasksTodolist = {
  id: number
  title: string
  isDone: boolean
}

type TodolistType = {
  title: string
  tasks: TasksTodolist[]
  deleteTask: (taskID:number) => void

}

export const Todolist = (props: TodolistType) => {
  const tasksListItem = props.tasks.map(task => {
    const deleteTask =()=> props.deleteTask(task.id)
    return (
      <li>
        <input type="checkbox" checked={task.isDone}/>
        <span>{task.title}</span>
        <button onClick= {deleteTask}>x</button>
      </li>

    )
  })
  return <div>
    <h3>{props.title}</h3>
    <div>
      <input/>
      <button>+</button>
    </div>
    <ul>
      {tasksListItem}
    </ul>
    <div>
      <button>All</button>
      <button>Active</button>
      <button>Completed</button>
    </div>
  </div>
}
