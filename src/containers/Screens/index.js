import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Link } from "react-router-dom";
import { loadConfig } from "./config/screenSlice";
import ScreenEditor from "./ScreenEditor";

const App = () => {
	let dispatch = useDispatch();
	const { Screens } = useSelector((s) => s.slice.config);

	return <React.Fragment>

	</React.Fragment>
};

export default App;
