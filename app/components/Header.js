import React, { PropTypes } from 'react';
import { connect } from 'redux/react';

if (process.env.BROWSER) {
    require('./../styles/Header.scss');
}
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
            <div className='header'>
                <h5>Experimental React+Redux Implementation</h5>
            </div>
        );
    }
}