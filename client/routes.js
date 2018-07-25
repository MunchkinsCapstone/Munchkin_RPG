import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'; // withRouter
import { Lobby, GameBoard, HomePage } from './components'; // HomePage

class Routes extends Component {
	render() {
		return (
			<Switch>
				<Route exact path='/lobby' component={Lobby} />
				<Route exact path='/home' component={HomePage} />
				<Route exact path='/game' component={GameBoard} />
				<Route component={GameBoard} />
			</Switch>
		);
	}
}

export default Routes;
