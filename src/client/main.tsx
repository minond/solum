/// <reference path="../declarations.d.ts"/>

import * as React from 'react'
import * as DOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { AppComponent } from './app'

const Main = () => (
  <Router>
    <div>
      <Route path='/' exact={true} render={() => <AppComponent />} />
    </div>
  </Router>
)

DOM.render(<Main />, document.querySelector('#app'))
