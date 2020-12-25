import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import Query from "devextreme/data/query";
import { ScreenConfig } from "../appsettings.plugin.screens.json";
import { locale, formatDate } from "devextreme/localization";

const now = new Date();

ScreenConfig.Lists.DateFormats.map((item) => {
  item.caption = item.format
    ? formatDate(now, item.format[locale] || item.format.tr)
    : "no caption";
  return item;
});

let initialState = {
  config: {},
  screen: {},
  name: "PaymentType"
};

export const updateScreen = createAsyncThunk(
  "screen/updateScreen",
  (args, { dispatch, getState }) => {
    return args;
  }
);

export const reorderColumns = createAsyncThunk(
  "screen/reorderColumns",
  (args, { dispatch, getState }) => {
    return args;
  }
);

export const columnRemoving = createAsyncThunk(
  "screen/columnRemoving",
  (args, { dispatch, getState }) => {
    return args;
  }
);

export const columnUptading = createAsyncThunk(
  "screen/columnRemoving",
  async (args, { dispatch, getState }) => {
    return args;
  }
);

const screenSlice = createSlice({
  name: "screen",
  initialState: { ...initialState },
  reducers: {
    // setScreen: {
    //   reducer(state, action) {

    //     state = action.payload;
    //   },
    //   prepare(screen) {
    //     //return { payload: { text, id: nextTodoId++ } };
    //     return screen;
    //   }
    // }
    setScreen(state, action) {
      let { screen, name } = action.payload;
      state.name = name;
      if (screen) {
        var s = { ...screen };
        var newColumns = Query(s.columns)
          .sortBy("index")
          .toArray()
          .map((c, i) => {
            var newColumn = { ...c, index: i };
            return newColumn;
          });
        s.columns = newColumns;
        state.screen = { ...s };
      } else {
        state.screen = {};
      }
      //state.data = s
    },
    // columnRemoving(state, action) {
    // 	let { key, newColumns } = action.payload;
    // 	state.data.columns = newColumns.filter((r) => r.name !== key);
    // },
    saveColumns(state, action) {},
    resetStorage(state, { payload }) {
      localStorage.removeItem("config");
      console.log("screenSlice.saveColumns", current(state.config));
      state.config = ScreenConfig;
    },
    loadConfig(state, { payload }) {
      var c = JSON.parse(localStorage.getItem("config")) || ScreenConfig;
      state.config = c;
      localStorage.setItem("config", JSON.stringify(c));
    },
    updateConfigScreen(state, { payload }) {
      state.config.Screens[state.name] = state.screen;
      localStorage.setItem("config", JSON.stringify(current(state.config)));
    }
  },
  extraReducers: {
    [reorderColumns.fulfilled]: (state, { payload }) => {
      const { to, itemData, newColumns } = payload;

      const toIndex = newColumns.indexOf(to);
      const fromIndex = newColumns.indexOf(itemData);
      newColumns.splice(fromIndex, 1);
      newColumns.splice(toIndex, 0, itemData);
      let columns = newColumns.map((c, i) => {
        return { ...c, index: i };
      });
      console.log("reorderColumns", columns);
      state.screen.columns = columns;
    },
    [columnRemoving.fulfilled]: (state, { payload }) => {
      let { key } = payload;
      let newColumns = state.screen.columns.filter((r) => r.name !== key);
      state.screen.columns = newColumns;
    },
    [columnUptading.fulfilled]: (state, { payload }) => {
      let { newData, key } = payload;
      let newColumns = [];
      state.screen.columns.map((r) => {
        if (r.name !== key) {
          newColumns.push({ ...r });
        } else newColumns.push({ ...r, ...newData });
        return r;
      });
      state.screen.columns = newColumns;
    },
    [updateScreen.fulfilled]: (state, { payload }) => {
      state.screen[payload.dataField] = payload.value;
    }
  }
});

export const {
  loadConfig,
  resetStorage,
  updateConfigScreen,
  setScreen,
  saveColumns
} = screenSlice.actions;

export default screenSlice.reducer;
