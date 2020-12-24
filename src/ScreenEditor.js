import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SelectBox, TabPanel, Tabs } from "devextreme-react";
import { Form, GroupItem, SimpleItem } from "devextreme-react/form";
import { setScreen } from "./config/screenSlice";

import { ColumnEditor, SubModelConfig, Result } from "./components";

const defaultScreenName = "PaymentType";

const ScreenEditor = () => {
  let dispatch = useDispatch();
  const { Names, Screens } = useSelector((s) => s.config);
  const Screen = useSelector((s) => s.screen);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [state, setState] = React.useState({
    name: defaultScreenName
  });

  console.log("ScreenEditor", selectedIndex);

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

  React.useEffect(() => {
    const sc = Screens[defaultScreenName];
    if (sc) dispatch(setScreen({ screen: sc, name: defaultScreenName }));
    console.log("X useEffect", defaultScreenName, sc);
  }, [Screens, dispatch]);

  return (
    <React.Fragment>
      <div className="options">
        {/* <Form
          formData={Screen}
          onContentReady={(x) => console.log("onContentReady", x)}
        >

        </Form> */}

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
          <GroupItem colCount={2}>
            <GroupItem></GroupItem>
          </GroupItem>
        </Form>

        <div className="option"></div>
      </div>
      <Tabs
        //height={260}
        dataSource={["Columns", "Sub Models", "Result"]}
        selectedIndex={selectedIndex}
        onOptionChanged={(args) => {
          if (args.name === "selectedIndex") {
            console.log("onOptionChanged", args.name, args.value);
            setSelectedIndex(args.value);
          }
        }}
        //loop={loop}
        //itemTitleRender={this.itemTitleRender}
        // itemComponent={(x) => {
        //   if (x.index === 0) return;
        //   // if (x.index === 2) return <Result />;
        //   //else
        //   return <span>undefined</span>;
        // }}
        //animationEnabled={false}
        //swipeEnabled={false}
      />

      {selectedIndex === 0 && <ColumnEditor />}
      {selectedIndex === 1 && <SubModelConfig />}
      {selectedIndex === 2 && <Result />}
    </React.Fragment>
  );
};

export default ScreenEditor;
