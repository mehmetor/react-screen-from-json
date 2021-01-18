import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	Switch,
	Route,
	Link
} from "react-router-dom";

const App = () => {

	const { Names } = useSelector((s) => s.slice.config);


	return <React.Fragment>

		<ul>
			{Names ? Names.map((n, i) => {
				return <li key={i}>
					<Link to={'/' + n}>{n}</Link>
				</li>
			})
				: <span>Loading...</span>
			}
		</ul>
	</React.Fragment>
};

export default App;
