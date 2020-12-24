import React from "react";
import { useSelector, useDispatch } from "react-redux";

const SubModelConfig = () => {
	const Screen = useSelector((s) => s.slice.screen);

	return <pre>{JSON.stringify(Screen.subModels, null, 2)}</pre>;
};

export default SubModelConfig;
