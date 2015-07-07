import { INITIAL_EVENTS, ADD_EVENT, UPDATE_EVENT, DELETE_EVENT } from '../constants/ActionConstants'

const initialState = []

const actionsMap = {
    [ INITIAL_EVENTS ]: (state, action) => [...action.data],
    [ ADD_EVENT ]: (state, action) => [action.data, ...state],
    [ UPDATE_EVENT ]: (state, action) => state.map(event => event.id === action.data.id ? { ...event, ...action.data } : event),
    [ DELETE_EVENT ]: (state, action) => state.filter(event => event.id !== action.data.id)
}

export default function EventsStore(state = initialState, action) {
    const reduceFn = actionsMap[ action.type ]
    if (!reduceFn) {
        return state
    }

    var state_to_extend = state; 
    
    if (action.type == DELETE_EVENT) {
        state_to_extend = [];
    }

    const newState = Object.assign([], state_to_extend, reduceFn(state, action))

    return newState
}
