import {FilterValuesType, TasksStateType} from '../App';
import {v1} from 'uuid';

export type First_ActionType = {
    type: '',
}
export type Second_ActionType = {
    type: '',
}


type ActionsType = First_ActionType | Second_ActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case '':
            return state
        case '':
            return state
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodolistAC = (todolistId: string): First_ActionType => {
    return { type: ''}
}
export const AddTodolistAC = (title: string): Second_ActionType => {
    return { type: ''}
}
