import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadConfig } from "./config/screenSlice";
import ScreenEditor from "./ScreenEditor";

const App = () => {
	let dispatch = useDispatch();
	const { Names } = useSelector((s) => s.slice.config);

	React.useEffect(() => {
		dispatch(loadConfig());
	}, [dispatch]);

	return <React.Fragment>
		{Names
			? <ScreenEditor />
			: <span>Loading...</span>
		}
	</React.Fragment>
};

export default App;
