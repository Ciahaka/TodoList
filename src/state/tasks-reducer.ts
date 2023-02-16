import {FilterValuesType, TasksStateType} from '../App';
import {v1} from 'uuid';

// export type RemoveActionType = {
//     type: 'REMOVE-TASK',
//     taskID:string,
//     todolistId:string
// }
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)
      }
    case 'ADD-TASK':
      // const stateCopy = {...state}
      // const tasks = stateCopy[action.todolistID]
      // const newTask = {id: v1(), title: action.title, isDone: false}
      // const newTasks = [newTask, ...tasks]
      // stateCopy[action.todolistID] = newTasks
      return {
        ...state,
        [action.todolistID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistID]]
      }
    case 'CHANGE-STATUS-TASK':
      // const stateCopy = {...state}
      // const tasks = stateCopy[action.todolistID]
      // const task = tasks.find((el) => el.id === action.taskID)
      // if (task) {
      //   task.isDone = action.isDone
      //   stateCopy[action.todolistID] = tasks
      // }
      return {
        ...state,
        [action.todolistID]: state[action.todolistID]
          .map((t) => t.id === action.taskID
            ? {...t, isDone: action.isDone}
            : t)
      }

    default:
      throw new Error('I dont understand this type')
  }
}

export const removeTaskAC = (taskID: string, todolistID: string) => {
  return {type: 'REMOVE-TASK', taskID, todolistID} as const
}
export const addTaskAC = (title: string, todolistID: string) => {
  return {type: 'ADD-TASK', title, todolistID} as const
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string) => {
  return {type: 'CHANGE-STATUS-TASK', taskID, isDone, todolistID} as const
}