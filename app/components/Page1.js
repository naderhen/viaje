import React, { PropTypes } from 'react';
import * as HtmlActions from './../actions/HtmlHeaderActions';

export default class Page1 extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.props.dispatch(HtmlActions.updateTitle('Page 1'));
    }

    render() {
        return (
            <h5>Page One</h5>
        );
    }
}