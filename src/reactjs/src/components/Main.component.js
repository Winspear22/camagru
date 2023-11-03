import React from "react";
import Header from './header and footer/Header.component';
import Footer from './header and footer/Footer.component';
import Auth from './auth/Auth.Component';
import Home from './Home.Component';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

function Main()
{
	return (
		<React.Fragment>
			<Header />
				<Switch>
					<Route path='/auth' component={Auth}/>
					<Route path='/home' component={Home}/>
					<Redirect to='/home'/>

				</Switch>
			<Footer />
		</React.Fragment>
	);
}

export default withRouter(Main);