import React from 'react'

if (process.env.BROWSER) {
    require('./../styles/Header.scss')
}
export default class Header extends React.Component {
    constructor(props, state) {
        super(props, state)
    }

    render() {
        return (
            <div className='header'>
                <h5>Experimental React+Redux Implementation</h5>
            </div>
        )
    }
}