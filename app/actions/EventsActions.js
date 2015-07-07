import { INITIAL_EVENTS, ADD_EVENT, UPDATE_EVENT, DELETE_EVENT } from './../constants/ActionConstants'

export function initialEvents(data) {
    return dispatch => dispatch({
        type: INITIAL_EVENTS,
        data: data
    })
}

export function addEvent(data) {
    return dispatch => dispatch({
        type: ADD_EVENT,
        data: data
    })
}

export function updateEvent(data) {
    return dispatch => dispatch({
        type: UPDATE_EVENT,
        data: data
    })
}

export function deleteEvent(data) {
    return dispatch => dispatch({
        type: DELETE_EVENT,
        data: data
    })
}
