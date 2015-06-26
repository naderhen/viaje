import React, {PropTypes} from 'react';
import {Router, Route} from 'react-router';
import { Provider } from 'redux/react';

export default class App extends React.Component {
    static propTypes = {
        redux: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        routes: PropTypes.object.isRequired
    };

    render() {
        const { redux, history, routes } = this.props;
        return (
            <div>
                <Provider redux={redux}>
                    {() => <Router history={history} children={routes} />}
                </Provider>
            </div>
        );
    }
}