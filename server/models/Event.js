import thinky from 'thinky';

var Event = thinky().createModel("Event", {
    id: String,
    name: String,
    description: String
})

export default Event;
