/// <reference path="../declarations.d.ts"/>

import * as React from 'react'
import * as DOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { HiComponent } from './hi'

const Main = () => (
  <Router>
    <div>
      <Route path='/' exact={true} render={() => <HiComponent />} />
    </div>
  </Router>
)

DOM.render(<Main />, document.querySelector('#app'))
