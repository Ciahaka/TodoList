import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List, Paper} from "@material-ui/core";
import {DeleteForever, DeleteForeverSharp, DeleteOutlineTwoTone} from "@material-ui/icons";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}


type TodoListPropsType = {
  id: string
  title: string
  tasks: TaskType[]
  filter: FilterValuesType
  addTask: (title: string, todolistID: string) => void
  removeTask: (taskID: string, todolistID: string) => void
  changeTodoListFilter: (filter: FilterValuesType, todolistID: string) => void
  changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
  changeTaskTitle: (taskID: string, title: string, todolistID: string) => void
  changeTodoListTitle: (title: string, todolistID: string) => void
  removeTodolist: (todolistID: string) => void
}

const TodoList = (props: TodoListPropsType) => {
  const tasksJSX = props.tasks.length
    ? props.tasks.map(t => {
      const removeTask = () => props.removeTask(t.id, props.id)
      const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
      const changeTaskTitle = (taskTitle: string) => {
        props.changeTaskTitle(t.id, taskTitle, props.id)
      }
      // @ts-ignore
      return (

        <li key={t.id}
                  className={t.isDone ? "task isDone" : "task"}
        >
          <Checkbox
            size={'small'} color={'primary'} onChange={changeTaskStatus} checked={t.isDone}
          />
          {/*<input*/}
          {/*  onChange={changeTaskStatus}*/}
          {/*  type="checkbox"*/}
          {/*  checked={t.isDone}*/}
          {/*/>*/}
          <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
          <IconButton onClick={removeTask} size={'small'} color={'secondary'}>
            <DeleteForever/>
          </IconButton>
          {/*<button onClick={removeTask}>х</button>*/}
        </li>

      )
    })
    : <span>Your taskslist is empty</span>

  const createOnClickHandler = (filter: FilterValuesType): () => void => {
    const onClickHandler = () => props.changeTodoListFilter(filter, props.id)
    return onClickHandler
  }
  const addTask = (title: string) => props.addTask(title, props.id)
  const removeTodolist = () => props.removeTodolist(props.id)
  const changeTodoListTitle = (todoListTitle: string) => props.changeTodoListTitle(todoListTitle, props.id)

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
        <IconButton onClick={removeTodolist} size={'small'} color={'secondary'}>
          <DeleteOutlineTwoTone/>
        </IconButton>
        {/*<Button onClick={removeTodolist}>Del</Button>*/}
      </h3>
      <AddItemForm addItem={addTask}/>
      <List>
        {tasksJSX}
      </List>
      <div>
        <Button
          size={'medium'}
          variant={'contained'}
          color={props.filter === "all" ? "secondary" : 'primary'}
          onClick={createOnClickHandler("all")}
        >All
        </Button>
        <Button
          size={'medium'}
          variant={'contained'}
          color={props.filter === "active" ? "secondary" : 'primary'}
          onClick={createOnClickHandler("active")}
        >Active
        </Button>
        <Button
          size={'medium'}
          variant={'contained'}
          color={props.filter === "completed" ? "secondary" : 'primary'}
          onClick={createOnClickHandler("completed")}
        >Completed
        </Button>
      </div>
    </div>
  );
};

export default TodoList;