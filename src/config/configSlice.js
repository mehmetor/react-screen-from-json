import { createSlice } from "@reduxjs/toolkit";
import { ScreenConfig } from "../appsettings.plugin.screens.json";
import { locale, formatDate } from "devextreme/localization";

const now = new Date();

ScreenConfig.Lists.DateFormats.map((item) => {
  item.caption = item.format
    ? formatDate(now, item.format[locale] || item.format.tr)
    : "no caption";
  return item;
});

const configSlice = createSlice({
  name: "config",
  initialState: { ...ScreenConfig },
  reducers: {
    updateScreen(state, { payload }) {
      let { screen, name } = payload;
      if(screen && name)
      state.Screens[name] = screen;
    }
  }
});

export const { updateScreen } = configSlice.actions;

export default configSlice.reducer;
