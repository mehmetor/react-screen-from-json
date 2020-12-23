import React from "react";

import DataGrid, {
  Column,
  RowDragging,
  Scrolling,
  Lookup,
  Sorting,
  Editing,
  FilterRow
} from "devextreme-react/data-grid";
import { types } from "./data.js";
import { ScreenConfig } from "./appsettings.plugin.screens.json";
import Query from "devextreme/data/query";
import { CheckBox, Button, TextArea, SelectBox } from "devextreme-react";
import { locale, formatDate } from "devextreme/localization";

const defaultScreen = "PaymentType";

const App = (props) => {
  const textBoxRef = React.createRef();
  const [state, setState] = React.useState({
    columns: [],
    showDragIcons: true,
    displayColumns: [],
    copySuccess: "",
    screen: "",
    config: ScreenConfig
  });

  let now = new Date();

  ScreenConfig.Lists.DateFormats.map((item) => {
    item.caption = item.format
      ? formatDate(now, item.format[locale] || item.format.tr)
      : "no caption";
    return item;
  });

  function onRowRemoving(e) {
    //e.cancel = true;
    const newColumns = state.columns.filter((r) => r.name !== e.data.name);

    setState({ ...state, columns: newColumns });
    return;
  }

  function onRowUpdating(e) {
    //row.cancel = true;

    const newColumns = state.columns.map((r) => {
      return r.name !== e.newData.name ? r : { ...r, ...e.newData };
    });

    ScreenConfig.Screens[state.screen].columns = newColumns;

    setState({
      ...state,
      columns: newColumns,
      config: ScreenConfig
    });
    return;
  }

  function onReorder(e) {
    const visibleRows = e.component.getVisibleRows();
    const newColumns = [...state.columns];
    const toIndex = newColumns.indexOf(visibleRows[e.toIndex].data);
    const fromIndex = newColumns.indexOf(e.itemData);

    newColumns.splice(fromIndex, 1);
    newColumns.splice(toIndex, 0, e.itemData);

    newColumns.map((t, i) => {
      t.index = i;
      return t;
    });

    ScreenConfig.Screens[state.screen].columns = newColumns;

    setState({
      ...state,
      columns: newColumns,
      config: ScreenConfig
    });
  }

  function textBox() {
    return textBoxRef.current.instance;
  }

  const onScreenChanged = React.useCallback((args) => {
    setState((s) => {
      return {
        ...s,
        screen: args.value,
        columns: Query(ScreenConfig.Screens[args.value].columns)
          .sortBy("index")
          .toArray()
      };
    });
  }, []);

  function onCopy(args) {
    console.log(locale());

    setTimeout(() => {
      textBox._input()[0].select();
      document.execCommand("copy");
      setState({ ...state, copySuccess: "Copied!" });
    }, 10);
    setTimeout(() => {
      setState({ ...state, copySuccess: null });
    }, 2000);
  }

  function onSaved(data) {
    setState({
      ...state,
      columns: state.columns
    });
  }

  React.useEffect(() => {
    setState((s) => {
      onScreenChanged({ value: defaultScreen });
      return { ...s, screen: defaultScreen };
    });
  }, [onScreenChanged]);

  return (
    <React.Fragment>
      <div className="options">
        <div className="option">
          <SelectBox
            dataSource={ScreenConfig.Names}
            value={state.screen}
            onValueChanged={onScreenChanged}
          />
        </div>
        <div className="option">
          <Button
            width={120}
            text={state.copySuccess ? state.copySuccess : "Copy"}
            type="default"
            stylingMode="contained"
            onClick={onCopy}
          />
        </div>
      </div>

      <DataGrid
        //height={400}
        //width={"100%"}
        dataSource={state.columns}
        showBorders={false}
        keyExpr={"name"}
        onRowUpdating={onRowUpdating}
        onRowRemoving={onRowRemoving}
        onSaved={onSaved}
        hoverStateEnabled={true}
        allowColumnResizing={true}
        allowColumnReordering={true}
        //columnHidingEnabled={true}
        rowAlternationEnabled={true}
        columnResizingMode="widget"
        columnMinWidth={40}
      >
        <FilterRow visible={true} />
        <Editing
          mode="row"
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={false}
          useIcons={true}
        />

        <RowDragging
          allowReordering={true}
          onReorder={onReorder}
          showDragIcons={state.showDragIcons}
        />
        <Scrolling mode="virtual" />
        <Sorting mode="none" />

        <Column dataField="index" width={80} allowEditing={false} />
        <Column dataField="hidden" width={80} dataType="boolean" />
        <Column dataField="name" width={250} allowEditing={false} />

        <Column dataField="type" width={100}>
          <Lookup dataSource={types} valueExpr="name" displayExpr="name" />
        </Column>
        <Column dataField="format">
          <Lookup
            dataSource={ScreenConfig.Lists.DateFormats}
            valueExpr="localized"
            displayExpr={(item) => {
              return (
                item.localized + " '" + item.format.tr + "' " + item.caption
              );
            }}
          />
        </Column>
        <Column dataField="width" width={80} />
        <Column dataField="autoComplete" />
      </DataGrid>

      <div className="options">
        <div>
          <TextArea
            ref={textBoxRef}
            height={500}
            value={JSON.stringify({ ScreenConfig: state.config }, null, 2)}
            style={{
              fontFamily:
                "'MonoLisa', 'Menlo', 'Monaco', 'Courier New', 'monospace'"
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
