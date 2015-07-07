import React, { PropTypes } from 'react'
import Header from './Header'
import Navigation from './Navigation'
import { connect } from 'redux/react'

@connect(state => ({
    title: state.HtmlHeaderStore.title
}))
class Application extends React.Component {
    static propTypes = {
        children: PropTypes.any,
        dispatch: PropTypes.func.isRequired
    }

    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { dispatch } = this.props
        return (
            <div className="ui container">
                <Header />
                <Navigation />
                {/* dispatch makes it to the component, but fails server-side with 'document is not defined'  */}
                {/*<Home {...dispatch} /> */}
                {/* dispatch doesn't make it down server-side (undefined) */}
                {/* this will render the child routes */}
                <div className="ui grid">
                    <div className="column">
                        { this.props.children &&
                            React.cloneElement(this.props.children, { dispatch }) }
                    </div>
                </div>
            </div>
        )
    }
}

export default Application
