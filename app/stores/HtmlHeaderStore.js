import {UPDATE_TITLE} from '../constants/ActionConstants';

const base = 'Experiment';
const delimiter = '|';

const initialState = [{
    title: `${base}`
}];

const actionsMap = {
    [UPDATE_TITLE]: (state, action) => ({title: `${base} ${delimiter} ${action.title}`})
};

export default function HtmlHeaderStore(state = initialState, action){
    const reduceFn = actionsMap[action.type];
    if (!reduceFn){
        return state;
    }
    return Object.assign({}, state, reduceFn(state, action));
}