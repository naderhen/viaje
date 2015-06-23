import React, {PropTypes} from 'react';
import Router, {Route, DefaultRoute} from 'react-router';
import { createDispatcher, createRedux, composeStores, bindActionCreators } from 'redux';
import { Provider, Connector } from 'redux/react';
import { thunkMiddleware, loggerMiddleware } from './middleware';
import * as stores from './stores';
import HtmlActions from './actions/HtmlHeaderActions';
import routes from './routes';

const dispatcher = createDispatcher(
    composeStores(stores),
    getState => [ thunkMiddleware(getState), loggerMiddleware ]
);

const redux = createRedux(dispatcher);

export default class App extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired
    };

    render() {
        const { history } = this.props;
        return (
            <div>
                <Provider redux={redux}>
                    {routes.bind(null, history)}
                </Provider>
            </div>
        );
    }
}