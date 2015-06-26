import React from 'react'
import { Link } from 'react-router'

if (process.env.BROWSER) {
    require('./../styles/Navigation.scss')
}
export default class Navigation extends React.Component {
    constructor(props, state) {
        super(props, state)
    }

    render() {
        return (
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/page1'>Page 1</Link></li>
                    <li><Link to='/page2'>Page 2</Link></li>
                </ul>
            </nav>
        )
    }
}