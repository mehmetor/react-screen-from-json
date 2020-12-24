import React from "react";
import { useSelector, useDispatch } from "react-redux";
import DataGrid, {
  Column,
  RowDragging,
  Scrolling,
  Lookup,
  Sorting,
  Editing,
  FilterRow
} from "devextreme-react/data-grid";
import { types } from "../data.js";
import { CheckBox, Button, TextArea, SelectBox } from "devextreme-react";
import { locale } from "devextreme/localization";
import { Form, GroupItem, SimpleItem } from "devextreme-react/form";
import { updateScreen } from "../config/configSlice";
import {
  setScreen,
  reorderColumns,
  columnRemoving,
  columnUptading
} from "../config/screenSlice";

const ColumnEditor = (props) => {
  let dispatch = useDispatch();
  const { Names, Screens, Lists } = useSelector((s) => s.config);
  const ScreenConfig = useSelector((s) => s.config);
  const Screen = useSelector((s) => s.screen);

  function onColumnsReorder(e) {
    const visibleRows = e.component.getVisibleRows();
    const to = visibleRows[e.toIndex].data;
    const itemData = e.itemData;
    const newColumns = [...Screen.columns];
    dispatch(reorderColumns({ to, itemData, newColumns }));
    //onColumnsSaved()
  }

  function onColumnsRowRemoving(e) {
    let key = e.data.name;
    const newColumns = [...Screen.columns];
    dispatch(columnRemoving({ key, newColumns }));
    return;
  }

  function onColumnsRowUpdating(e) {
    console.log("columnUptading", e);
    const newColumns = [...Screen.columns];
    const newData = e.newData;
    const key = e.key;
    dispatch(columnUptading({ key, newData, newColumns }));
    return;
  }

  function onColumnsSaved() {}

  return (
    <DataGrid
      //height={400}
      //width={"100%"}
      dataSource={Screen.columns}
      showBorders={true}
      keyExpr={"name"}
      onRowUpdating={onColumnsRowUpdating}
      onRowRemoving={onColumnsRowRemoving}
      onSaved={onColumnsSaved}
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

      <RowDragging allowReordering={true} onReorder={onColumnsReorder} />
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
          dataSource={Lists.DateFormats}
          valueExpr="localized"
          displayExpr={(item) => {
            return item.localized + " '" + item.format.tr + "' " + item.caption;
          }}
        />
      </Column>
      <Column dataField="width" width={80} />
      <Column dataField="autoComplete" />
    </DataGrid>
  );
};

export default ColumnEditor;
