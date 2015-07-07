import thinky from 'thinky';
var type = thinky().type;

var Event = thinky().createModel("Event", {
    id: type.string(),
    name: type.string(),
    description: type.string(),
    start_date: type.date(),
    end_date: type.date(),
    reference_number: type.string(),
    location: type.object()
})

export default Event;
