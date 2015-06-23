import React, { PropTypes } from 'react';
import { connect } from 'redux/react';
import { bindActionCreators } from 'redux';
import Header from './Header';
import Navigation from './Navigation';
import * as HtmlActions from './../actions/HtmlHeaderActions';

@connect(state => ({
    title: state.HtmlHeaderStore.title
}))
export default class Application extends React.Component {

    static propTypes = {
        children: PropTypes.any,
        dispatch: PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { title, dispatch } = this.props;
        return (
            <div>
                <Header title={title} />
                <Navigation />
                {/* this will render the child routes */}
                { this.props.children &&
                    React.cloneElement(this.props.children, {dispatch})
                }
            </div>
        );
    }
}