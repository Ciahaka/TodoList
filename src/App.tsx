import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

// CRUD
// create ++
// read ++
// update +
// delete ++

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

  const removeTask = (taskID: string, todolistID: string) => {
    setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskID)})
  }
  const addTask = (title: string, todolistID: string) => {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false
    }
    setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
  }
  const changeTaskStatus = (taskID: string, isDone: boolean, todolistID: string) => {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
    })
  }
  const changeTaskTitle = (taskID: string, title: string, todolistID: string) => {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, title: title} : t)
    })
  }

  const changeTodoListFilter = (filter: FilterValuesType, todolistID: string) => {
    setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter: filter} : tl))
  }
  const changeTodoListTitle = (title: string, todolistID: string) => {
    setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title: title} : tl))
  }
  const removeTodolist = (todolistID: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistID))
    delete tasks[todolistID]
  }
  const addTodoList = (title: string) => {
    const newTodoListID = v1()
    setTodolists([{id: newTodoListID, title, filter: "all"}, ...todolists])
    setTasks({...tasks, [newTodoListID]: []})
  }
  // UI:
  const todolistsComponents = todolists.map(tl => {
    let tasksForRender;
    switch (tl.filter) {
      case "active":
        tasksForRender = tasks[tl.id].filter(t => !t.isDone)
        break
      case "completed":
        tasksForRender = tasks[tl.id].filter(t => t.isDone)
        break
      default:
        tasksForRender = tasks[tl.id]
    }
    return (
      <Grid item key={tl.id}>
        <Paper variant={'outlined'} style={{padding: '20px'}}>
          <TodoList
            id={tl.id}
            title={tl.title}
            filter={tl.filter}
            tasks={tasksForRender}
            addTask={addTask}
            removeTask={removeTask}
            changeTaskTitle={changeTaskTitle}
            changeTaskStatus={changeTaskStatus}
            removeTodolist={removeTodolist}
            changeTodoListTitle={changeTodoListTitle}
            changeTodoListFilter={changeTodoListFilter}
          />
        </Paper>
      </Grid>
    )
  })
  return (
    <div className="App">

      <AppBar position="static">
        <Toolbar style={{justifyContent: "space-between"}}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            Todolists
          </Typography>
          <Button color="inherit" variant={"outlined"}>Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '20px 0'}}>

          <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={4}>
          {todolistsComponents}
        </Grid>


      </Container>
    </div>
  );
}

export default App;
