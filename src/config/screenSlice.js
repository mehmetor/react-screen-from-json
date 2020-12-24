import { createSlice, current } from "@reduxjs/toolkit";
import Query from "devextreme/data/query";

let initialState = {};

const screenSlice = createSlice({
  name: "screen",
  initialState: {},
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
      console.log("setScreen", screen, name )
      if (screen) {
        const cols = Query(screen.columns).sortBy("index").toArray();
        Object.keys(screen).map((p) => (state[p] = screen[p]));
        state.columns = cols;
        state.name = name;
      }
    },
    reorderColumns(state, action) {
      let { to, itemData, newColumns } = action.payload;

      //const newColumns = [...state.columns];
      const toIndex = newColumns.indexOf(to);
      const fromIndex = newColumns.indexOf(itemData);
      newColumns.splice(fromIndex, 1);
      newColumns.splice(toIndex, 0, itemData);
      state.columns = newColumns;
    },
    columnRemoving(state, action) {
      let { key, newColumns } = action.payload;
      state.columns = newColumns.filter((r) => r.name !== key);
    },
    columnUptading(state, action) {
      let { newData, newColumns, key } = action.payload;
      const cols = newColumns.map((r) => {
        if (r.name !== key) {
          return r;
        } else return { ...r, ...newData };
      });
      state.columns = cols;
    },
    saveColumns(state, action) {
      console.log("screenSlice.saveColumns", current(state));
    }
  }
});

export const {
  setScreen,
  reorderColumns,
  columnRemoving,
  columnUptading,
  saveColumns
} = screenSlice.actions;

export default screenSlice.reducer;
