import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextArea } from "devextreme-react";

const SubModelConfig = () => {
	const Screen = useSelector((s) => s.slice.screen);

	const [value, setValue] = React.useState(null)

	React.useEffect(() => {
		setValue(v => {
			if (Screen.subModels)
				return JSON.stringify(Screen.subModels, null, 2)
			else return null
		})
	}, [Screen.subModels])

	return <TextArea
		// ref={(ref) => {
		//   console.log("textBox", ref);
		//   setTextBoxRef(ref);
		// }}
		height={500}
		value={value}
		style={{
			fontFamily: "'MonoLisa', 'Courier New'"
		}}
	/>
	return <pre>{JSON.stringify(Screen.subModels, null, 2)}</pre>;
};

export default SubModelConfig;
