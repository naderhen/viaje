import { UPDATE_TITLE } from './../constants/ActionConstants';

export function updateTitle(title) {
    console.log('action update title', title);

    return dispatch => dispatch({
        type: UPDATE_TITLE,
        title: title
    });
}