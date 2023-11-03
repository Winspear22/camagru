import React from "react";
import { Link } from 'react-router-dom'

function Auth()
{
    return (
		<React.Fragment>
        	<div>Auth</div>
			<Link to='/home'>Cliquez ici pour home</Link>
		</React.Fragment>
    );
}

export default Auth;