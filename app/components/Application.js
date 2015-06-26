import React, { PropTypes } from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Home from './Home';
import { connect } from 'redux/react';

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
        const { dispatch } = this.props;
        return (
            <div>
                <Header />
                <Navigation />
                {/* dispatch makes it to the component, but fails server-side with 'document is not defined'  */}
                {/*<Home {...dispatch} /> */}
                {/* dispatch doesn't make it down server-side (undefined) */}
                {/* this will render the child routes */}
                {this.props.children &&
                    React.cloneElement(this.props.children, {dispatch})}

            </div>
        );
    }
}