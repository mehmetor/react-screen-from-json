import { createSlice, current } from "@reduxjs/toolkit";

const configSlice = createSlice({
	name: "config",
	initialState: {
		Lists: {
			DateFormats: []
		},
		Screens: {}
	},
	reducers: {

	}
});

export const { loadConfig, updateConfigScreen } = configSlice.actions;

export default configSlice.reducer;
