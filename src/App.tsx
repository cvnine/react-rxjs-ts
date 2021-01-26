import React, { Suspense, lazy } from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { GlobalStyle } from './style'

function App() {
	return (
		<>
			<GlobalStyle />
			<Router>
				<Suspense fallback={<div className="loadingMask"></div>}>
					<Switch>
						<Route exact path="/" render={() => <Redirect to="/layout/home" push />} />
						<Route path="/layout" component={lazy(() => import('@/layout'))} />
						<Route component={lazy(() => import('@/pages/NotFound'))} />
					</Switch>
				</Suspense>
			</Router>
		</>
	)
}

export default App
