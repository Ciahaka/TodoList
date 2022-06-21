import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

// CRUD
// create +
// read ++
// update +
// delete +

type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TaskStateType = {
  [todolistID: string]: Array<TaskType>
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
  //BLL:
  const todolistID_1 = v1()
  const todolistID_2 = v1()
  const [todolists, setTodolists] = useState<Array<TodoListType>>([
    {id: todolistID_1, title: "What to learn", filter: "all"},
    {id: todolistID_2, title: "What to buy", filter: "all"},
  ])
  const [tasks, setTasks] = useState<TaskStateType>({
    [todolistID_1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS/TS", isDone: true},
      {id: v1(), title: "React", isDone: false},
    ],
    [todolistID_2]: [
      {id: v1(), title: "Milk", isDone: false},
      {id: v1(), title: "Bread", isDone: false},
      {id: v1(), title: "Meat", isDone: true},
    ],
  })

  const removeTask = (taskID: string) => {
    const filteredTasks = tasks.filter(t => t.id !== taskID)
    setState(tasks)
    setTasks(filteredTasks)
  }
  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false
    }
    setState(tasks)
    setTasks([newTask, ...tasks])
  }
  const changeTaskStatus = (taskID: string, isDone: boolean) => {
    setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t))
  }


  const changeTodoListFilter = (filter: FilterValuesType) => {
    setFilter(filter)
  }

  let tasksForRender;
  switch (filter) {
    case "active":
      tasksForRender = tasks.filter(t => !t.isDone)
      break
    case "completed":
      tasksForRender = tasks.filter(t => t.isDone)
      break
    default:
      tasksForRender = tasks
  }

  //UI:
  return (
    <div className="App">
      <TodoList
        title={todoListTitle}
        tasks={tasksForRender}
        addTask={addTask}
        filter={filter}
        removeTask={removeTask}
        changeTodoListFilter={changeTodoListFilter}
        changeTaskStatus={changeTaskStatus}
        setLastState={setLastState}
      />
    </div>
  );
}

export default App;
