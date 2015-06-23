import React, { PropTypes } from 'react';
import { connect } from 'redux/react';

export default class Header extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired
    };

    constructor(props, state){
        super(props, state);
    }

    render() {
        document.title = this.props.title;
        return (
            <h5>HEADER</h5>
        );
    }
}