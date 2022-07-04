import React, {useState} from 'react';
import {FilterValueTye} from "./App";

export type TaskTodolist = {
  id: string
  title: string
  isDone: boolean
}

type TodolistType = {
  title: string
  tasks: TaskTodolist[]
  deleteTask: (taskID: string) => void
  changeFilter: (filter: FilterValueTye) => void
  addTask: (title: string) => void
}

export const Todolist = (props: TodolistType) => {
  const [title, setTitle] = useState('')
  const tasksListItem = props.tasks.length
    ? props.tasks.map(task => {
      const deleteTask = () => props.deleteTask(task.id)
      return (
        <li>
          <input type="checkbox" checked={task.isDone}/>
          <span>{task.title}</span>
          <button onClick={deleteTask}>x</button>
        </li>
      )
    })
    : <span>'Task List is empty! Add a task! '</span>

  const onClickAddTask = () => {props.addTask(title)
    setTitle('')
  }
  const onKeyDownTask = (e: React.KeyboardEvent<HTMLInputElement>) => {if (e.key === 'Enter' && e.ctrlKey) {onClickAddTask()}}
  const onChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}

return (
  <div>
    <h3>{props.title}</h3>
    <div>
      <input
        value={title}
        onChange={onChangeTask}
        onKeyDown={onKeyDownTask}
      />
      <button onClick={onClickAddTask}>+</button>
    </div>
    <ul>
      {tasksListItem}
    </ul>
    <div>
      <button onClick={() => props.changeFilter('All')}>All</button>
      <button onClick={() => props.changeFilter('Active')}>Active</button>
      <button onClick={() => props.changeFilter('Completed')}>Completed</button>
    </div>
  </div>
)
}