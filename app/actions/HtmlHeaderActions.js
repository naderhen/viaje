import { UPDATE_TITLE } from './../constants/ActionConstants'

export function updateTitle(title) {
    return dispatch => dispatch({
        type: UPDATE_TITLE,
        title: title
    })
}