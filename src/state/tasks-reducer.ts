import {FilterValuesType, TasksStateType} from '../App';
import {v1} from 'uuid';

// export type RemoveActionType = {
//     type: 'REMOVE-TASK',
//     taskID:string,
//     todolistId:string
// }
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>


type ActionsType = RemoveTaskActionType | AddTaskActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)
      }
    case 'ADD-TASK':
      const stateCopy = {...state}
      const tasks = stateCopy[action.todolistID]
      const newTask = {id: v1(), title: action.title, isDone: false}
      const newTasks = [newTask, ...tasks]
      stateCopy[action.todolistID] = newTasks
      return stateCopy

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
