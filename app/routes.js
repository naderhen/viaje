// disable `no-unused-vars` rule
/* eslint no-unused-vars: 0 */
import React from 'react'
import { Router, Route, Redirect } from 'react-router'
import { Application, Home, Page1, Page2 } from './components'

export default (
    <Route component={ Application }>
        <Route path='/' component={ Home } />
        <Route path='page1' component={ Page1 } />
        <Route path='page2' component={ Page2 } />
    </Route>
)