import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	Switch,
	Route,
	Link
} from "react-router-dom";
import { loadConfig } from "./config/screenSlice";

import ScreenEditor from "./ScreenEditor";
import Home from "./Home";

const App = () => {
	let dispatch = useDispatch();

	const { Names } = useSelector((s) => s.slice.config);

	React.useEffect(() => {
		dispatch(loadConfig());
	}, [dispatch]);


	return <React.Fragment>
		<Switch>
			{Names &&
				<Route path="/:Name" exact component={ScreenEditor} />}
			<Route path="/" exact component={Home} />
		</Switch>
	</React.Fragment>
};

export default App;
