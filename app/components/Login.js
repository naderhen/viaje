import React, { PropTypes } from 'react'
import { connect } from 'redux/react'

if (process.env.BROWSER) {
    require('./../styles/Login.scss')
}
export default class Login extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired
    };

    constructor(props, state){
        super(props, state)
    }

    login(e) {
        e.preventDefault()
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h3>Dummy Login</h3>
                </div>
                <div className="row">
                    <form role="form">
                        <div className="form-group">
                            <input type="text" valueLink={this.linkState('user')} className="form-control" id="username" placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <input type="password" valueLink={this.linkState('password')} className="form-control" id="password" ref="password" placeholder="Password" />
                        </div>
                        <button type="submit" onClick={this.login.bind(this)}>Login</button>
                    </form>
                </div>
            </div>
        )
    }
}