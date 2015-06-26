import React, { PropTypes } from 'react';
import * as HtmlActions from './../actions/HtmlHeaderActions';
import {connect} from 'redux/react';

@connect(state => ({
    title: state.HtmlHeaderStore.title
}))
export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        if (this.props.dispatch){

            // Hell breaks loose. document is not defined? WTF?
            this.props.dispatch(HtmlActions.updateTitle('Home'));
        }
    }

    render() {
        return (
            <div>
                <h2>Home</h2>
            </div>
        );
    }
}