import React, { PropTypes } from 'react';
import * as HtmlActions from './../actions/HtmlHeaderActions';

export default class Home extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.props.dispatch(HtmlActions.updateTitle('Home'));
    }

    render() {
        return (
            <h2>Home</h2>
        );
    }
}