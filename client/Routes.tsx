import { Meteor } from 'meteor/meteor';
import React, {FC, ReactNode} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import App from '/imports/ui/App';
import LoginPage from '/imports/ui/LoginPage';

// Top-level routing component
const Routes: FC<RouteProps> = ({loggedIn, userId}) => {
	return <Router>
		<Switch>
			<Route 
				exact 
				path="/" 
				render={
					(): ReactNode => redirectIfLoggedOut(<App path="/" userId={userId}/>)
				}
			/>
			<Route 
				exact 
				path="/login" 
				render={
					(): ReactNode => redirectIfLoggedIn(<LoginPage/>)
				}
			/>
			<Route 
				exact 
				path="/:path" 
				render={
					({match}): ReactNode => redirectIfLoggedOut(<App path={"/" + match.params.path} userId={userId}/>)
				}
			/>
		</Switch>
	</Router>

	// Called before rendering logged in component to check if user is currently logged in
	function redirectIfLoggedOut (component: FC): ReactNode {
		if(loggedIn) {
			return component;
		}
		else {
			return <Redirect to="/login"/>
		}
	}

	// Called before rendering login page to check if user is currently logged in
	function redirectIfLoggedIn (component: FC): ReactNode {
		if(loggedIn) {
			return <Redirect to="/"/>;
		}
		else {
			return component
		}
	}

}

// Defines the props interface for the Routes component
export interface RouteProps {
	loggedIn: boolean;
	userId?: string;
}

// Uses Meteor's reactive data system to monitor login status
export default withTracker((): RouteProps => {
	const loggedIn = !!Meteor.userId()
	return {loggedIn: loggedIn, userId: Meteor.userId()};
})(Routes);
