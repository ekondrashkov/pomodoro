import { ActionCreator, AnyAction, Reducer } from "redux";

export interface ITimer {
  number: number;
  name: string;
  id: string;
  paused: boolean;
  pauseTime: number;
  timer: string;
  poms: number;
  currentPom: number;
  done: boolean;
}

export type RootState = {
  timers: Array<ITimer>
}

const initialState: RootState = {
  timers: []
};

const LOAD_TASKS = 'LOAD_TASKS';
export const loadTimers: ActionCreator<AnyAction> = (task: ITimer) => ({
  type: LOAD_TASKS,
  task,
});

const NEW_TASK = 'NEW_TASK';
export const newTimers: ActionCreator<AnyAction> = (task: ITimer) => ({
  type: NEW_TASK,
  task,
});

const UPDATE_TASKS = 'UPDATE_TASKS';
export const updateTimers: ActionCreator<AnyAction> = (task: ITimer) => ({
  type: UPDATE_TASKS,
  task,
});

export const rootReducer: Reducer<RootState> = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TASKS:
      return {
        ...state,
        timers: action.task,
      }
    case NEW_TASK:
      return {
        ...state,
        timers: [...state.timers, action.task],
      }
    case UPDATE_TASKS:
      return {
        ...state,
        timers: action.task,
      }
    default:
      return state;
  }
}



