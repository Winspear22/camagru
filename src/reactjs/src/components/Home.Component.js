import React from "react";
//import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from 'react-router-dom'
function Home()
{
    return (
		<React.Fragment>
        	<div>Home</div>
			<Link to='/auth'>Cliquez ici pour auth</Link>
		</React.Fragment>
    );
}

export default Home;