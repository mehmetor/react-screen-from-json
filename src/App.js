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
import { types } from "./data.js";
import { CheckBox, Button, TextArea, SelectBox } from "devextreme-react";
import { locale } from "devextreme/localization";
import { Form, GroupItem, SimpleItem } from "devextreme-react/form";
import { updateScreen } from "./config/configSlice";
import {
  setScreen,
  reorderColumns,
  columnRemoving,
  columnUptading
} from "./config/screenSlice";

const defaultScreenName = "PaymentType";

const App = (props) => {
  let dispatch = useDispatch();
  const { Names, Screens, Lists } = useSelector((s) => s.config);
  const ScreenConfig = useSelector((s) => s.config);
  const Screen = useSelector((s) => s.screen);
  const [textBoxRef, setTextBoxRef] = React.useState(null);
  const [state, setState] = React.useState({
    name: defaultScreenName
  });

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

  // function textBox() {
  //   return textBoxRef.current.instance;
  // }

  const onScreenChanged = React.useCallback(
    (args) => {
      const sc = Screens[args.value];
      setState({ name: args.value });
      if (sc) {
        console.log("setScreen", sc);
        dispatch(setScreen({ screen: sc, name: args.value }));
      }
    },
    [Screens, dispatch]
  );

  function onCopy(args) {
    dispatch(updateScreen({ screen: Screen, name: state.name }));
    
    let textBox = textBoxRef;
    setTimeout(() => {
      //textBox._input()[0].select();
      textBox._instance._input()[0].select()
      document.execCommand("copy");
      setState({ ...state, copySuccess: "Copied!" });
    }, 100);
    setTimeout(() => {
      setState({ ...state, copySuccess: null });
    }, 2000);
  }

  function onColumnsSaved() {}

  React.useEffect(() => {
    const sc = Screens[defaultScreenName];
    if (sc) dispatch(setScreen({ screen: sc, name: defaultScreenName }));
    console.log("X useEffect", defaultScreenName, sc);
  }, [Screens, dispatch]);

  return (
    <React.Fragment>
      {/* <div className="options">
        <pre>{JSON.stringify(Screens[state.name])}</pre>
      </div> */}
      <div className="options">
        <Form formData={Screen}>
          <GroupItem colCount={2}>
            <GroupItem>
              <SelectBox
                dataSource={Names}
                value={state.name}
                onValueChanged={onScreenChanged}
              />
            </GroupItem>
            <GroupItem>
              <SimpleItem dataField="title" />
            </GroupItem>
          </GroupItem>
        </Form>

        <div className="option"></div>
      </div>

      <DataGrid
        //height={400}
        //width={"100%"}
        dataSource={Screen.columns}
        showBorders={false}
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
        <div className="option">
          <Button
            width={120}
            text={state.copySuccess ? state.copySuccess : "Copy Json"}
            type="default"
            stylingMode="contained"
            onClick={onCopy}
          />
        </div>
      </div>
      <div className="options">
        <TextArea
          ref={(ref) => {console.log("textBox", ref); setTextBoxRef(ref)}}
          height={500}
          value={JSON.stringify({ ScreenConfig: ScreenConfig }, null, 2)}
          style={{
            fontFamily:
              "'MonoLisa', 'Menlo', 'Monaco', 'Courier New', 'monospace'"
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default App;
