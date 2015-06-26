import React from 'react'
import * as HtmlActions from './../actions/HtmlHeaderActions'

export default class Page2 extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.props.dispatch(HtmlActions.updateTitle('Page 2'))
    }

    render() {
        return (
            <h5>Page Two</h5>
        )
    }
}