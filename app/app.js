import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Route, browserHistory } from 'react-router';
import ReactStormpath, { Router, HomeRoute, LoginRoute, AuthenticatedRoute } from 'react-stormpath';
import { ChangePasswordPage, LoginPage, RegisterPage, ResetPasswordPage, VerifyEmailPage, ProfilePage } from './pages';

// Reference the high-level components
var Main = require('./components/Main');
var News = require('./components/children/News'); 
var Saved = require('./components/children/News/SavedArticles');

//initialize the Stormpath SDK
ReactStormpath.init();

// Renders the contents according to the route page. 
ReactDOM.render(
	<Router history={browserHistory}>
		<Route path='/' component={Main}>
			<Route path='news' component={News} />
		    <HomeRoute path='saved' component={Saved}>
		      	<LoginRoute path='/login' component={LoginPage} />
		      	<Route path='/verify' component={VerifyEmailPage} />
		      	<Route path='/register' component={RegisterPage} />
		      	<Route path='/change' component={ChangePasswordPage} />
		      	<Route path='/forgot' component={ResetPasswordPage} />
				<AuthenticatedRoute>
				  <HomeRoute path='/profile' component={ProfilePage} />
				</AuthenticatedRoute>
		    </HomeRoute>
		</Route>

	</Router>,
	document.getElementById('app')
)



