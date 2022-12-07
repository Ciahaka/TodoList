import React, {useState} from 'react';
import './App.css';
import {TodoList, TaskType} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';


export type TodoListsType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TaskStateType = {
  [todoListsId: string]: Array<TaskType>
}

function App() {

  // let [tasksOb, setTasks] = useState([
  //     {id: v1(), title: "HTML&CSS", isDone: true},
  //     {id: v1(), title: "JS", isDone: true},
  //     {id: v1(), title: "ReactJS", isDone: false},
  //     {id: v1(), title: "Rest API", isDone: false},
  //     {id: v1(), title: "GraphQL", isDone: false},
  // ]);
  // let [filter, setFilter] = useState<FilterValuesType>("all");

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodolists] = useState<Array<TodoListsType>>([
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ])

  let [tasksOb, setTasks] = useState<TaskStateType>({
    [todolistID1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
      {id: v1(), title: 'Rest API', isDone: false},
      {id: v1(), title: 'GraphQL', isDone: false},
    ],
    [todolistID2]: [
      {id: v1(), title: 'HTML&CSS2', isDone: true},
      {id: v1(), title: 'JS2', isDone: true},
      {id: v1(), title: 'ReactJS2', isDone: false},
      {id: v1(), title: 'Rest API2', isDone: false},
      {id: v1(), title: 'GraphQL2', isDone: false},
    ]
  });


  function removeTask(id: string, todolistID: string) {
    const tasks = tasksOb[todolistID]
    tasksOb[todolistID]= tasks.filter(t => t.id !== id);
    setTasks({...tasksOb})
  }

  function addTask(title: string, todolistID: string) {
   const newTask = {id: v1(), title: title, isDone: false};
    const tasks = tasksOb[todolistID]
    tasksOb[todolistID]= [newTask, ...tasks]
    setTasks({...tasksOb})
  }

  function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
    const tasks = tasksOb[todolistID]
   const changeTask= tasks.find(t => t.id === taskId);
    if (changeTask) {
      changeTask.isDone = isDone;
      setTasks({...tasksOb})
    }
  }


  function changeFilter(value: FilterValuesType, todolistID: string) {
    const todolist = todolists.find((tl) => tl.id === todolistID)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
    ;
  }


  return (

    <div className="App">
      {todolists.map((tl) => {

        let tasksForTodolist = tasksOb[tl.id];

        if (tl.filter === 'active') {
          tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
        }
        if (tl.filter === 'completed') {
          tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
        }
        return <TodoList
          key={tl.id}
          todolistID={tl.id}
          title={tl.title}
          tasks={tasksForTodolist}
          removeTask={removeTask}
          changeFilter={changeFilter}
          addTask={addTask}
          changeTaskStatus={changeStatus}
          filter={tl.filter}

        />
      })}

    </div>
  );
}

export default App;
