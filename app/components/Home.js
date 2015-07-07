import React from 'react'
import * as HtmlActions from './../actions/HtmlHeaderActions'
import * as EventsActions from './../actions/EventsActions'
import { connect } from 'redux/react'
import reactMixin from 'react-mixin'
import moment from 'moment'

var SubscriptionMixin = {
  componentWillMount: function() {
    console.log('WILL MOUNT')
  },
  subscribe: function(room_name, cb_obj) {
    var self = this;
    console.log(`subscribing to ${room_name}`)

    socket.emit('subscribe', room_name, function(success) {
        if (success) {
            var subscriptions = self.subscriptions || [];
            subscriptions.push(room_name);

            self.subscriptions = subscriptions;

            socket.on('message', function(msg) {
                if (msg.room_name && msg.room_name == room_name) {
                    if (msg.initial) {
                        if (cb_obj.initial) {
                            cb_obj.initial.call(self, msg.data);
                        }
                    } else {
                        if (!msg.data.old && msg.data.new) {
                            if (cb_obj.added) {
                                cb_obj.added.call(self, msg.data.new)
                            } else {
                                console.warn('no added callback added')
                            }
                        }

                        if (msg.data.old && msg.data.new) {
                            if (cb_obj.updated) {
                                cb_obj.updated.call(self, msg.data.new)
                            } else {
                                console.warn('no updated callback added')
                            }
                        }

                        if (msg.data.old && !msg.data.new) {
                            if (cb_obj.deleted) {
                                cb_obj.deleted.call(self, msg.data.old)
                            } else {
                                console.warn('no deleted callback added')
                            }
                        }
                    }
                }
            })
        }
    })
  },
  componentWillUnmount: function() {
    _.each(this.subscriptions, function(room_name) {
        console.log(`unsubscribing from ${room_name}`)
        socket.emit('unsubscribe', room_name);
    })
  }
};


@connect(state => ({
    title: state.HtmlHeaderStore.title,
    events: state.EventsStore
}))
@reactMixin.decorate(SubscriptionMixin)
class Home extends React.Component {
    constructor(props, context) {
        super(props, context)
        if (this.props.dispatch) {

            // Hell breaks loose. document is not defined? WTF?
            this.props.dispatch(HtmlActions.updateTitle('Home'))
        }
    }

    initEvents(events) {
        this.props.dispatch(EventsActions.initialEvents(events));
    }

    eventAdded(event) {
        this.props.dispatch(EventsActions.addEvent(event));
    }

    eventUpdated(event) {
        this.props.dispatch(EventsActions.updateEvent(event));
    }

    eventDeleted(event) {
        this.props.dispatch(EventsActions.deleteEvent(event));
    }

    componentDidMount() {
        var self = this;

        self.subscribe('events', {
            initial: self.initEvents,
            added: self.eventAdded,
            updated: self.eventUpdated,
            deleted: self.eventDeleted
        });
    }

    deleteEvent(event) {
        socket.emit('delete_event', event.id);
    }

    renderEvent(event) {
        var self = this;

        function convertDate(date) {
            var date_obj, month, day;

            if (date) {
                date_obj = moment(date);
                month = date_obj.format("MMM");
                day = date_obj.format("DD")
            } else {
                day = "N/A";
                month = ""
            }

            return {day: day, month: month}
        }
        
        var start_date = convertDate(event.start_date),
            end_date = convertDate(event.end_date);

        return (
            <div className="ui internally celled grid stacked segment">
                <div className="row">
                    <div className="center aligned two wide column">
                        <div className="ui tiny statistic">
                          <div className="label">
                            {start_date.month}
                          </div>
                          <div className="value">
                            {start_date.day}
                          </div>
                        </div>
                        <div className="ui horizontal divider">
                            To
                        </div>
                        <div className="ui tiny statistic">
                          <div className="label">
                            {end_date.month}
                          </div>
                          <div className="value">
                            {end_date.day}
                          </div>
                        </div>
                    </div>
                    <div className="twelve wide column">
                      <h3>{event.name}</h3>
                        <p>{event.description}</p>
                        <p>Booking Reference #: {event.reference_number}</p>
                    </div>
                    <div className="two wide column">
                      <a onClick={self.deleteEvent.bind(self, event)}>Delete</a>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        var self = this;

        return (
            <div>
                <h2>Events</h2>
                {self.props.events.map(self.renderEvent.bind(self))}
            </div>
        )
    }
}

export default Home
