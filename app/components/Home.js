import React from 'react'
import * as HtmlActions from './../actions/HtmlHeaderActions'
import { connect } from 'redux/react'
import reactMixin from 'react-mixin'

var SubscriptionMixin = {
  componentWillMount: function() {
    console.log('WILL MOUNT')
  },
  subscribe: function(room, cb_obj) {
    var self = this;
    console.log(`subscribing to ${room}`)
    socket.emit('subscribe', room, function(success) {
        if (success) {
            socket.on('message', function(msg) {
                if (msg.room && msg.room == room) {
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
    console.log('WILL UNMOUNT')
  }
};


@connect(state => ({
    title: state.HtmlHeaderStore.title,
    events: []
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
        this.setState({events: events});
    }

    eventAdded(event) {
        var events = this.state.events;

        events.push(event);

        this.setState({events: events});
    }

    eventUpdated(event) {
        var events = this.state.events,
            updated_event = _.findWhere(events, {id: event.id});

        if (updated_event) {
            _.assign(updated_event, event);
        }

        this.setState({events: events})
    }

    eventDeleted(event) {
        var events = this.state.events;

        _.remove(events, {id: event.id})

        this.setState({events: events});
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

    render() {
        var self = this;
        console.log(self.state);
        return (
            <div>
                <h2>Home</h2>
                <ul>
                {self.state && self.state.events.map(function(event) {
                    return <li>{event.name}</li>
                })}
                </ul>
            </div>
        )
    }
}

export default Home
